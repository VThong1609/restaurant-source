import React, { useEffect, useState } from "react";
import "./css/UserManagement.css";
import HeaderPage from "./components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { changeStatusUser, getUserInfo } from "./axios/Api";
import PaginationComponent from "./components/PaginationComponent";
import convertPathSearchUrl from "./services/ConvertPathSearchUrl";
import CustomButton from "./components/CustomButton";
import {
  RiUserFollowLine,
  RiUserSettingsLine,
  RiUserUnfollowLine,
} from "react-icons/ri";
import Notification from "./components/Notification";
function UserManagement() {
  const [blank, setBlank] = useState("");
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    search: "name",
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
    getUserInfo({
      ...params,
      [`_${searchParams.search}`]: searchParams.keyWord,
    }).then((data) => {
      if (data.status !== "error") {
        setUsers(data.data.content);
        setParams("totalPages", data.data.totalPages);
        setBlank("");
        if (data.status === "failed") {
          setBlank("Không có Tài khoản.");
        }
      } else
        setMessage("Hệ thống đã xảy ra lỗi. Vui lòng hãy thử load lại trang.");
    });
  }, [window.location.href]);

  const changeStatus = (userId) => {
    const user = users.find((user) => user.id === userId);
    changeStatusUser(userId).then((data) => {
      if (data.status === "ok") {
        user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
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
      tax_code: "",
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
    <div style={{ marginTop: "200px" }}>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />

      <div className="user-management-container">
        <div
          style={{ display: "block", margin: "0 auto", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center" }}>Quản lý tài khoản người dùng</h1>
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
            <option value="name">Tên người dùng</option>
            <option value="email">Email</option>
            <option value="phone_number">Số điện thoại</option>
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
          <Link to={"/AddUser"}>
            <button
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
              Thêm tài khoản
            </button>
          </Link>
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
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{user.id}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    style={{ maxWidth: "80px" }}
                    src={`http://localhost:8080/api/image/${user.avatar}`}
                  ></img>
                </td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  <>
                    {user.status !== "ACTIVE" ? (
                      <CustomButton
                        field={user.id}
                        IconButton={RiUserUnfollowLine}
                        size={30}
                        color="black"
                        func={changeStatus}
                        title={"Disable User"}
                        id={`td-status-disable-${user.id}`}
                        style={{ marginRight: 15 }}
                      />
                    ) : (
                      <CustomButton
                        field={user.id}
                        IconButton={RiUserFollowLine}
                        size={30}
                        color="black"
                        func={changeStatus}
                        title={"Enable User"}
                        id={`td-status-enable-${user.id}`}
                        style={{ marginRight: 15 }}
                      />
                    )}
                    <CustomButton
                      field={user.id}
                      IconButton={RiUserSettingsLine}
                      size={30}
                      color="black"
                      func={() => navigate(`/EditUser/${user.id}`)}
                      title={"Edit User"}
                      id={`edit-${user.id}`}
                      style={{ marginLeft: 15 }}
                    />
                  </>
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

export default UserManagement;
