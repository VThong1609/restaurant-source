import React, { useEffect, useState } from "react";
import "./css/UserManagement.css";
import HeaderPage from "./components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { getFeedback } from "./axios/Api";
import PaginationComponent from "./components/PaginationComponent";
import convertPathSearchUrl from "./services/ConvertPathSearchUrl";
import CustomButton from "./components/CustomButton";
import {
  RiUserFollowLine,
  RiUserSettingsLine,
  RiUserUnfollowLine,
} from "react-icons/ri";
import Notification from "./components/Notification";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { max } from "moment";
function FeedbackManagement() {
  const [blank, setBlank] = useState("");
  const [message, setMessage] = useState("");

  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
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
    ["page", "limit"].forEach((prop) => {
      const value = searchParamsInUrl.get(prop);
      if (value !== null)
        if (!(prop === "id" && value < 1))
          searchParams[prop] = prop === "page" ? parseInt(value) - 1 : value;
      params[`_${prop}`] = searchParams[prop];
    });
    getFeedback({
      ...params,
      [`_${searchParams.search}`]: searchParams.keyWord,
    }).then((data) => {
      if (data.status !== "error") {
        setFeedbacks(data.data.content);
        setParams("totalPages", data.data.totalPages);
        setBlank("");
        if (data.status === "failed") {
          setBlank("Không có Phản hồi nào.");
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
          <h1 style={{ textAlign: "center" }}>Quản lý Phản hồi</h1>
        </div>
        <table style={{ margin: "30px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên dịch vụ</th>
              <th>Thời gian phản hồi</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td style={{ textAlign: "center" }}>{feedback.id}</td>
                <td style={{ textAlign: "center" }}>{feedback.description}</td>
                <td style={{ textAlign: "center" }}>{feedback.createdTime}</td>
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

export default FeedbackManagement;
