import React, { useEffect, useState } from "react";
import "./css/WinnerInformation.css";
import HeaderPage from "./components/HeaderPage";
import { useParams } from "react-router-dom";
import { getStaffInfo } from "./axios/Api";
function StaffInfo() {
  const email = useParams().email;
  const [staff, setStaff] = useState({});
  useEffect(() => {
    getStaffInfo({ _id: email }).then((data) => setStaff(data.data.content[0]));
  }, [email]);
  return (
    <div>
      <HeaderPage />
      <div className="winner-information" style={{ marginTop: "200px" }}>
        <h1 style={{ textAlign: "center" }}>Thông tin</h1>
        <div className="winner-details">
          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="name">Họ và tên:</label>
            <span id="name">{staff.lastName + " " + staff.lastName}</span>
          </div>
          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="address">Địa chỉ:</label>
            <span id="address">{staff.address}</span>
          </div>

          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="email">Email:</label>
            <span id="email">{staff.email}</span>
          </div>
          <div style={{ marginTop: "40px" }} className="detail">
            <label htmlFor="phoneNumber">Số điện thoại:</label>
            <span id="phoneNumber">{staff.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffInfo;
