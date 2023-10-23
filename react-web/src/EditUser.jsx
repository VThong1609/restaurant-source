import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/EditUser.css";
import { addUserInfo, getUserInfo, updateUserInfo } from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";
function EditUser() {
  const [message, setMessage] = useState("");

  const id = useParams().id;
  const typePage = !id ? "ADD" : "UPDATE";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    role: "USER",
  });
  const [avatar, setAvatar] = useState();
  const fileRef = useRef(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const set = (prop, value) => {
    setUser({ ...user, [prop]: value });
  };
  useEffect(() => {
    if (typePage === "UPDATE")
      getUserInfo({ _id: id }).then((data) => {
        setUser(data.data.content[0]);
      });
  }, [typePage, id]);
  const handleuploadUserInfo = (event) => {
    event.preventDefault();
    if (typePage === "ADD")
      if (user.password === confirmPassword )
      if(avatar!==null)
        addUserInfo(user,avatar).then((data) => {
          if (data.status === "ok") navigate("/User");
          else setMessage("Thêm thất bại.");
        });
        else setMessage("Vui lòng nhập avatar cho người dùng.");
      else setMessage("Mật khẩu không khớp với mật khẩu nhập lại.");
    else if (user.password === confirmPassword)
      updateUserInfo(id, user,avatar).then((data) => {
        if (data.status === "ok") navigate("/User");
        else setMessage("Cập nhật thất bại. ");
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
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              value={user.firstName}
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
              value={user.lastName}
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
          <button onClick={(event) => handleuploadUserInfo(event)}>
            {typePage}
          </button>{" "}
          <div className="home-link">
            <Link to={"/User"}>Quay lại</Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditUser;
