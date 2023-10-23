import React, { useEffect, useState } from "react";
import "./css/UserManagement.css";
import HeaderPage from "./components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { changeStatusStaff, getStaffInfo } from "./axios/Api";
import PaginationComponent from "./components/PaginationComponent";
import convertPathSearchUrl from "./services/ConvertPathSearchUrl";
import CustomButton from "./components/CustomButton";
import {
  RiUserFollowLine,
  RiUserSettingsLine,
  RiUserUnfollowLine,
} from "react-icons/ri";
import Notification from "./components/Notification";
function StaffManagement() {
  const [blank, setBlank] = useState("");
  const [message, setMessage] = useState("");

  const [staffs, setStaffs] = useState([]);
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
    getStaffInfo({
      ...params,
      [`_${searchParams.search}`]: searchParams.keyWord,
    }).then((data) => {
      if (data.status !== "error") {
        setStaffs(data.data.content);
        setParams("totalPages", data.data.totalPages);
        setBlank("");
        if (data.status === "failed") {
          setBlank("Không có Tài khoản.");
        }
      } else
        setMessage("Hệ thống đã xảy ra lỗi. Vui lòng hãy thử load lại trang.");
    });
  }, [window.location.href]);

  const changeStatus = (staffId) => {
    const staff = staffs.find((staff) => staff.id === staffId);
    changeStatusStaff(staffId).then((data) => {
      if (data.status === "ok") {
        staff.status = staff.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
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
          <h1 style={{ textAlign: "center" }}>Quản lý tài khoản Nhân viên</h1>
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
          <Link to={"/Addstaff"}>
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
              <th>Tên người dùng</th>
              <th>Địa chỉ email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id}>
                <td style={{ textAlign: "center" }}>{staff.id}</td>
                <td>{staff.firstName + " " + staff.lastName}</td>
                <td>{staff.email}</td>
                <td>{staff.address}</td>
                <td>{staff.phoneNumber}</td>
                <td style={{ textAlign: "center" }}>{staff.role}</td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {staff.id == 1 ? (
                    <h4 style={{ textAlign: "center", padding: 0, margin: 0 }}>
                      Không thể chỉnh sửa
                    </h4>
                  ) : (
                    <>
                      {staff.status !== "ACTIVE" ? (
                        <CustomButton
                          field={staff.id}
                          IconButton={RiUserUnfollowLine}
                          size={30}
                          color="black"
                          func={changeStatus}
                          title={"Disable Staff"}
                          id={`td-status-disable-${staff.id}`}
                          disable={staff.id === 1}
                          style={{ marginRight: 15 }}
                        />
                      ) : (
                        <CustomButton
                          field={staff.id}
                          IconButton={RiUserFollowLine}
                          size={30}
                          color="black"
                          func={changeStatus}
                          title={"Enable Staff"}
                          id={`td-status-enable-${staff.id}`}
                          disable={staff.id === 1}
                          style={{ marginRight: 15 }}
                        />
                      )}
                      <CustomButton
                        field={staff.id}
                        IconButton={RiUserSettingsLine}
                        size={30}
                        color="black"
                        func={() => navigate(`/EditStaff/${staff.id}`)}
                        title={"Edit staff"}
                        id={`edit-${staff.id}`}
                        disable={staff.id === 1}
                        style={{ marginLeft: 15 }}
                      />
                    </>
                  )}
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

export default StaffManagement;
