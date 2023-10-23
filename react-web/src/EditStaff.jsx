import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/EditUser.css";
import { addStaffInfo, getStaffInfo, updateStaffInfo } from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";
function EditStaff() {
  const [message, setMessage] = useState("");

  const id = useParams().id;
  const typePage = !id ? "ADD" : "UPDATE";
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    role: "STAFF",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const set = (prop, value) => {
    setStaff({ ...staff, [prop]: value });
  };
  useEffect(() => {
    if (typePage === "UPDATE")
      getStaffInfo({ _id: id }).then((data) => {
        setStaff(data.data.content[0]);
      });
  }, [typePage, id]);
  const handleuploadStaffInfo = (event) => {
    event.preventDefault();
    if (typePage === "ADD")
      if (staff.password === confirmPassword)
        addStaffInfo(staff).then((data) => {
          if (data.status === "ok") navigate("/Staff");
          else setMessage("Thêm thất bại");
        });
      else setMessage("Mật khẩu không khớp với mật khẩu nhập lại.");
    else if (staff.password === confirmPassword)
      updateStaffInfo(id, staff).then((data) => {
        if (data.status === "ok") navigate("/Staff");
        else setMessage("Cập nhật thất bại");
      });
    else setMessage("Mật khẩu không khớp với mật khẩu nhập lại.");
  };
  return (
    <>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />

      <div className="edituser" style={{ marginTop: "200px" }}>
        <form>
          <div className="div-h1">
            <h1>{typePage === "ADD" ? "Tạo" : "Chỉnh sửa"} tài khoản</h1>
          </div>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              value={staff.firstName}
              onChange={(event) => set("firstName", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              value={staff.lastName}
              onChange={(event) => set("lastName", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Địa chỉ email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={staff.email}
              onChange={(event) => set("email", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              minLength="8"
              required
              value={staff.password}
              onChange={(event) => set("password", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              minLength="8"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              name="address"
              id="address"
              value={staff.address}
              onChange={(event) => set("address", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={staff.phoneNumber}
              onChange={(event) => set("phoneNumber", event.target.value)}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <label htmlFor="role">Vai trò</label>
            <select
              name="role"
              id="role"
              value={staff.role}
              onChange={(event) => set("role", event.target.value)}
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button onClick={(event) => handleuploadStaffInfo(event)}>
            {typePage}
          </button>{" "}
          <div className="home-link">
            <Link to={"/Staff"}>Quay lại</Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditStaff;
