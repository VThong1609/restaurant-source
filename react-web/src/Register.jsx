import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Register.css";
import { registerUser } from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";
function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const [avatar, setAvatar] = useState();
  const fileRef = useRef(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = (event) => {
    event.preventDefault();
    if (user.password === confirmPassword)
      registerUser(user, avatar).then((data) => {
        if (data.status === "ok") navigate("/Login");
        else setMessage("Đăng kí không thành công");
      });
    else setMessage("Mật khẩu không khớp với mật khẩu nhập lại.");
  };
  const set = (prop, value) => {
    setUser({ ...user, [prop]: value });
  };
  return (
    <>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />

      <div className="registers" style={{ marginTop: "200px" }}>
        <form>
          <div className="div-h1">
            <h1>Đăng Ký</h1>
          </div>
          <div>
            <label htmlFor="companyName">Avatar</label>
            <input
              type="file"
              ref={fileRef}
              name="avatar"
              id="avatar"
              onChange={(event) => setAvatar(fileRef.current.files[0])}
            />
          </div>
          <div>
            <div>
              <label htmlFor="firstname">First name</label>
            </div>
            <div>
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                value={user.firstName}
                onChange={(event) => set("firstName", event.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required
              value={user.lastName}
              onChange={(event) => set("lastName", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={user.email}
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
              value={user.password}
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
              value={user.address}
              onChange={(event) => set("address", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={user.phoneNumber}
              onChange={(event) => set("phoneNumber", event.target.value)}
            />
          </div>

          <button onClick={(event) => handleRegister(event)}>Đăng ký</button>
          <div className="login-link">
            <p>
              Đã có tài khoản? <Link to={"/Login"}>Đăng nhập</Link>
            </p>
          </div>
          <div className="home-link">
            <Link to={"/"}>Quay lại trang chủ</Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default Register;
