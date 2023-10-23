import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";
import { loginUser } from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ username: email, password: password }).then((data) => {
      if (data.status === "ok") {
        window.localStorage.setItem("token", data.data[0]);
        window.localStorage.setItem("role", data.data[1]);
        window.localStorage.setItem("username", email);
        navigate("/");
      } else setMessage("Dang nhap khong thanh cong");
    });
  };

  return (
    <>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />
      <div className="login-container" style={{ marginTop: "250px" }}>
        <form onSubmit={handleSubmit}>
          <div className="div-login">
            <h1>Đăng Nhập</h1>
          </div>
          <div className="form-group">
            <label htmlFor="email">Tên đăng nhập</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={(event) => handleSubmit(event)}>Đăng nhập</button>
        </form>
        <p>
          Chưa có tài khoản? <Link to={"/Register"}>Đăng ký</Link>
        </p>
        <p>
          <Link to={"/"}>Quay lại trang chủ</Link>
        </p>
      </div>
    </>
  );
}
export default Login;
