import React, { useEffect, useState } from "react";
import "./css/UserManagement.css";
import HeaderPage from "./components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { getWeddingPartyInformation } from "./axios/Api";
import PaginationComponent from "./components/PaginationComponent";

import Notification from "./components/Notification";
function UserWeddingPartyInformation() {
  const [blank, setBlank] = useState("");
  const [message, setMessage] = useState("");

  const [weddingPartyInformations, setWeddingPartyInformations] = useState([]);
  const [searchParams, setSearchParams] = useState({
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
    ["page", "limit", "min_price", "max_price"].forEach((prop) => {
      const value = searchParamsInUrl.get(prop);
      if (value !== null)
        if (!(prop === "id" && value < 1))
          searchParams[prop] = prop === "page" ? parseInt(value) - 1 : value;
      params[`_${prop}`] = searchParams[prop];
    });
    params[`_user_email`] = localStorage.getItem("username");
    getWeddingPartyInformation({
      ...params,
      [`_${searchParams.search}`]: searchParams.keyWord,
    }).then((data) => {
      if (data.status !== "error") {
        setWeddingPartyInformations(data.data.content);
        setParams("totalPages", data.data.totalPages);
        setBlank("");
        if (data.status === "failed") {
          setBlank("Không có Tài khoản.");
        }
      } else
        setMessage("Hệ thống đã xảy ra lỗi. Vui lòng hãy thử load lại trang.");
    });
  }, [window.location.href]);

  return (
    <div style={{ marginTop: "200px" }}>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />

      <div className="user-management-container">
        <div
          style={{ display: "block", margin: "0 auto", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center" }}>
            Quản lý Những tiệc cưới đã đặt
          </h1>
        </div>
        <table style={{ margin: "30px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên người đặt</th>
              <th>Thời gian đặt</th>
              <th>Thời gian tổ chức tiệc</th>
              <th>Sảnh cưới</th>
              <th>Loại tiệc</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {weddingPartyInformations.map((weddingPartyInformation) => (
              <tr key={weddingPartyInformation.id}>
                <td style={{ textAlign: "center" }}>
                  {weddingPartyInformation.id}
                </td>
                <td style={{ textAlign: "center" }}>
                  {weddingPartyInformation.user?.firstName +
                    " " +
                    weddingPartyInformation.user?.lastName}
                </td>
                <td>{weddingPartyInformation.partyBookingDate}</td>
                <td>{weddingPartyInformation.partyDate}</td>
                <td>{weddingPartyInformation.weddingHall.weddingHallName}</td>
                <td>{weddingPartyInformation.weddingHallType}</td>
                <td>{weddingPartyInformation.totalPrice}</td>
                <th>
                  <Link
                    to={
                      "/WeddingPartyInformation/" + weddingPartyInformation.id
                    }
                  >
                    <button>Xem chi tiết</button>
                  </Link>
                </th>
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

export default UserWeddingPartyInformation;
