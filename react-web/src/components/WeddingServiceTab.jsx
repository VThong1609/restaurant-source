import React, { useEffect, useState } from "react";
import "../css/UserManagement.css";
import HeaderPage from "../components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { changeStatusWeddingService, getWeddingService } from "../axios/Api";
import PaginationComponent from "../components/PaginationComponent";
import convertPathSearchUrl from "../services/ConvertPathSearchUrl";
import CustomButton from "../components/CustomButton";
import {
  RiUserFollowLine,
  RiUserSettingsLine,
  RiUserUnfollowLine,
} from "react-icons/ri";
import Notification from "../components/Notification";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
function WeddingServiceTab({ weddingServicess = [], setWeddingServicess }) {
  const [blank, setBlank] = useState("");
  const [message, setMessage] = useState("");

  const [weddingServices, setWeddingServices] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    search: "name",
    min_price: "",
    max_price: "",
    keyWord: "",
    page: 0,
    limit: 20,
    totalPages: 1,
  });
  const setParams = (prop, value) => {
    setSearchParams({ ...searchParams, [prop]: value });
  };
  useEffect(() => {
    const searchParamsInUrl = new URLSearchParams(window.location.search);
    const params = {};
    ["min_price", "max_price", "page", "limit"].forEach((prop) => {
      const value = searchParamsInUrl.get(prop);
      if (value !== null)
        if (!(prop === "id" && value < 1))
          searchParams[prop] = prop === "page" ? parseInt(value) - 1 : value;
      params[`_${prop}`] = searchParams[prop];
    });
    getWeddingService({
      ...params,
      [`_${searchParams.search}`]: searchParams.keyWord,
    }).then((data) => {
      if (data.status !== "error") {
        setWeddingServices(data.data.content);
        setParams("totalPages", data.data.totalPages);
        setBlank("");
        if (data.status === "failed") {
          setBlank("Không có Dịch vụ nào.");
        }
      } else
        setMessage("Hệ thống đã xảy ra lỗi. Vui lòng hãy thử load lại trang.");
    });
  }, [window.location.href]);

  const changeStatus = (weddingServiceId) => {
    const weddingService = weddingServices.find(
      (weddingService) => weddingService.id === weddingServiceId
    );
    changeStatusWeddingService(weddingServiceId).then((data) => {
      if (data.status === "ok") {
        weddingService.status =
          weddingService.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        navigate(convertPathSearchUrl());
      }
    });
  };
  const handleSearch = () => {
    const search = [];
    ["search", "keyWord", "min_price", "max_price"].forEach((field) => {
      search.push({
        property: field,
        value: searchParams[field],
      });
    });
    navigate(convertPathSearchUrl(search));
  };
  const handleCancelSearch = (event) => {
    event.preventDefault();
    setSearchParams({
      search: "name",
      keyWord: "",
      min_price: "",
      max_price: "",
      totalPages: 1,
    });
    const search = [];
    ["search", "keyWord", "min_price", "max_price"].forEach((field) => {
      search.push({
        property: field,
        value: "",
      });
    });
    navigate(convertPathSearchUrl(search));
  };
  return (
    <div>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />

      <div className="user-management-container">
        <div
          style={{ display: "block", margin: "0 auto", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center" }}>Quản lý Dịch vụ cưới</h1>
          <label for="keyword">Từ khóa:</label>
          <input
            type="text"
            id="keyword"
            style={{
              width: "200px",
              height: "20px",
              borderRadius: "5px",
              marginRight: "15px",
              marginLeft: "10px",
            }}
            value={searchParams.keyWord}
            onChange={(event) => setParams("keyWord", event.target.value)}
          />
          <label for="search">Tìm kiếm theo:</label>
          <select
            id="search"
            style={{
              width: "150px",
              height: "30px",
              borderRadius: "5px",
              marginRight: "15px",
              marginLeft: "10px",
            }}
            value={searchParams.search}
            onChange={(event) => setParams("search", event.target.value)}
          >
            <option value="name">Tên dịch vụ</option>
          </select>
          <div style={{ marginTop: 10 }}>
            <label for="min_price">Giá thấp nhất:</label>
            <input
              type="number"
              min={0}
              id="min_price"
              style={{
                width: "100px",
                height: "20px",
                borderRadius: "5px",
                marginRight: "15px",
                marginLeft: "10px",
              }}
              value={searchParams.min_price}
              onChange={(event) => setParams("min_price", event.target.value)}
            />
            <label for="max_price">Giá cao nhất:</label>
            <input
              type="number"
              min={0}
              id="max_price"
              style={{
                width: "100px",
                height: "20px",
                borderRadius: "5px",
                marginRight: "15px",
                marginLeft: "10px",
              }}
              value={searchParams.max_price}
              onChange={(event) => setParams("max_price", event.target.value)}
            />
            <button
              style={{
                width: "100px",
                height: "30px",
                backgroundColor: "#4caf50",
                borderRadius: 5,
                marginRight: "15px",
                marginLeft: "10px",
                color: "white",
              }}
              onClick={(event) => handleSearch(event)}
            >
              Tìm kiếm
            </button>
            <button
              onClick={(event) => handleCancelSearch(event)}
              style={{
                width: "150px",
                height: "30px",
                backgroundColor: "#4caf50",
                borderRadius: 5,
                marginRight: "15px",
                marginLeft: "10px",
                color: "white",
              }}
            >
              Thoát tìm kiếm
            </button>{" "}
          </div>
        </div>
        <table style={{ margin: "30px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên dịch vụ</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {weddingServices.map((weddingService) => (
              <tr key={weddingService.id}>
                <td style={{ textAlign: "center" }}>{weddingService.id}</td>
                <td style={{ textAlign: "center" }}>
                  {weddingService.weddingServiceName}
                </td>
                <td>{weddingService.weddingServicePrice}</td>

                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {weddingServicess?.find(
                    (ws) => ws.id === weddingService.id
                  ) ? (
                    <div
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "green",
                        borderRadius: 5,
                      }}
                      onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                      onClick={(e) =>
                        setWeddingServicess(
                          weddingServicess.filter(
                            (ws) => ws.id !== weddingService.id
                          )
                        )
                      }
                    >
                      Bỏ Chọn
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "green",
                        borderRadius: 5,
                      }}
                      onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                      onClick={(e) =>
                        setWeddingServicess([
                          ...weddingServicess,
                          weddingService,
                        ])
                      }
                    >
                      Chọn
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3 style={{ textAlign: "center" }}>{blank}</h3>
        </div>
      </div>
      <PaginationComponent
        currentPage={searchParams.page}
        totalPages={searchParams.totalPages}
        objectsPerPage={searchParams.limit}
      />
    </div>
  );
}

export default WeddingServiceTab;
