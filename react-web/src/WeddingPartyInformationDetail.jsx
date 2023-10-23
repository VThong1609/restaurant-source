import React, { useEffect, useState } from "react";
import "./css/UserManagement.css";
import HeaderPage from "./components/HeaderPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getServicesWeddingPartyInformation,
  getWeddingPartyInformation,
} from "./axios/Api";
import PaginationComponent from "./components/PaginationComponent";

import Notification from "./components/Notification";
function WeddingPartyInformationDetail() {
  const id = useParams().id;
  const [blank, setBlank] = useState("");
  const [message, setMessage] = useState("");

  const [weddingPartyInformations, setWeddingPartyInformations] = useState([]);
  const [weddingServices, setWeddingServices] = useState([]);
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
    params[`_id`] = id;
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
    getServicesWeddingPartyInformation(id).then((res) =>
      setWeddingServices(res.data)
    );
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
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{ display: "block", margin: "0 auto", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center" }}>Thông tin người đặt</h1>
        </div>
        <table style={{ margin: "30px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh đại diện</th>
              <th>Tên người dùng</th>
              <th>Địa chỉ email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            <tr key={weddingPartyInformations[0]?.user.id}>
              <td style={{ textAlign: "center" }}>
                {weddingPartyInformations[0]?.user.id}
              </td>
              <td style={{ textAlign: "center" }}>
                <img
                  style={{ maxWidth: "80px" }}
                  src={`http://localhost:8080/api/image/${weddingPartyInformations[0]?.user.avatar}`}
                ></img>
              </td>
              <td>
                {weddingPartyInformations[0]?.user.firstName +
                  " " +
                  weddingPartyInformations[0]?.user.lastName}
              </td>
              <td>{weddingPartyInformations[0]?.user.email}</td>
              <td>{weddingPartyInformations[0]?.user.address}</td>
              <td>{weddingPartyInformations[0]?.user.phoneNumber}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{ display: "block", margin: "0 auto", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center" }}>Thông tin Sảnh cưới</h1>
        </div>
        <table style={{ margin: "30px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sảnh</th>
              <th>Vị trí sảnh</th>
              <th>Giá sáng</th> <th>Giá trưa</th>
              <th>Giá tối</th>
              <th>Giá cuối tuần</th>
            </tr>
          </thead>
          <tbody>
            <tr key={weddingPartyInformations[0]?.weddingHall.id}>
              <td style={{ textAlign: "center" }}>
                {weddingPartyInformations[0]?.weddingHall.id}
              </td>
              <td style={{ textAlign: "center" }}>
                {weddingPartyInformations[0]?.weddingHall.weddingHallName}
              </td>
              <td style={{ textAlign: "center" }}>
                {weddingPartyInformations[0]?.weddingHall.weddingHallLocation}
              </td>
              <td>{weddingPartyInformations[0]?.weddingHall.morningPrice}</td>
              <td>{weddingPartyInformations[0]?.weddingHall.noonPrice}</td>
              <td>{weddingPartyInformations[0]?.weddingHall.eveningPrice}</td>
              <td>{weddingPartyInformations[0]?.weddingHall.weekendPrice}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{ display: "block", margin: "0 auto", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center" }}>Thông tin Dịch vụ cưới</h1>
        </div>
        <table style={{ margin: "30px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên dịch vụ</th>
              <th>Giá</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3 style={{ textAlign: "center" }}>{blank}</h3>
        </div>
      </div>
    </div>
  );
}

export default WeddingPartyInformationDetail;
