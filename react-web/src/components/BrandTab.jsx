import React, { useEffect, useState } from "react";
import "../css/UserManagement.css";
import HeaderPage from "../components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { changeStatusBrand, getBrand } from "../axios/Api";
import PaginationComponent from "../components/PaginationComponent";
import convertPathSearchUrl from "../services/ConvertPathSearchUrl";
import CustomButton from "../components/CustomButton";
import { RiUserSettingsLine } from "react-icons/ri";
import Notification from "../components/Notification";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
function BrandTab({ brand, setBrand }) {
  const [blank, setBlank] = useState("");
  const [message, setMessage] = useState("");

  const [brands, setBrands] = useState([]);
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
    ["page", "limit"].forEach((prop) => {
      const value = searchParamsInUrl.get(prop);
      if (value !== null)
        if (!(prop === "id" && value < 1))
          searchParams[prop] = prop === "page" ? parseInt(value) - 1 : value;
      params[`_${prop}`] = searchParams[prop];
    });
    getBrand({
      ...params,
      [`_${searchParams.search}`]: searchParams.keyWord,
    }).then((data) => {
      if (data.status !== "error") {
        setBrands(data.data.content);
        setParams("totalPages", data.data.totalPages);
        setBlank("");
        if (data.status === "failed") {
          setBlank("Không có Dịch vụ nào.");
        }
      } else
        setMessage("Hệ thống đã xảy ra lỗi. Vui lòng hãy thử load lại trang.");
    });
  }, [window.location.href]);

  const changeStatus = (brandId) => {
    const brand = brands.find((brand) => brand.id === brandId);
    changeStatusBrand(brandId).then((data) => {
      if (data.status === "ok") {
        brand.status = brand.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        navigate(convertPathSearchUrl());
      }
    });
  };
  const handleSearch = () => {
    const search = [];
    ["search", "keyWord"].forEach((field) => {
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
    ["search", "keyWord"].forEach((field) => {
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
          <h1 style={{ textAlign: "center" }}>Quản lý Chi nhánh</h1>
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
            <option value="name">Tên chi nhánh</option>
            <option value="address">Địa chỉ chi nhánh</option>
          </select>
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
        <table style={{ margin: "30px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chi nhánh</th>
              <th>Địa chỉ chi nhánh</th>
              {brand === "" && <th>Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {brands.map((brandMap) => (
              <tr key={brandMap.id}>
                <td style={{ textAlign: "center" }}>{brandMap.id}</td>
                <td style={{ textAlign: "center" }}>{brandMap.brandName}</td>
                <td>{brandMap.brandAddress}</td>

                {brand === "" && (
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "green",
                        borderRadius: 5,
                      }}
                      onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                      onClick={(e) => setBrand(brandMap)}
                    >
                      Chọn
                    </div>
                  </td>
                )}
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

export default BrandTab;
