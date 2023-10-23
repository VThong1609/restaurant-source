import React, { useEffect, useState } from "react";
import "./css/WinnerInformation.css";
import HeaderPage from "./components/HeaderPage";
import { useParams } from "react-router-dom";
import { getUserInfo } from "./axios/Api";
function UserInfo() {
  const email = useParams().email;
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserInfo({ _email: email }).then((data) =>
      setUser(data.data.content[0])
    );
  }, [email]);
  return (
    <div>
      <HeaderPage />
      <div className="winner-information" style={{ marginTop: "200px" }}>
        <h1 style={{ textAlign: "center" }}>Thông tin</h1>

        <img
          style={{ maxWidth: "500px", borderRadius: "50%" }}
          src={`http://localhost:8080/api/image/${user.avatar}`}
        ></img>

        <div className="winner-details">
          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="name">Họ và tên:</label>
            <span id="name">{user.lastName + " " + user.lastName}</span>
          </div>
          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="address">Địa chỉ:</label>
            <span id="address">{user.address}</span>
          </div>

          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="email">Email:</label>
            <span id="email">{user.email}</span>
          </div>
          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="phoneNumber">Số điện thoại:</label>
            <span id="phoneNumber">{user.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
