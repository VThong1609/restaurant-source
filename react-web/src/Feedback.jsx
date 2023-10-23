import React, { useState } from "react";
import "./css/UserManagement.css";
import HeaderPage from "./components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { addFeedbackInfo } from "./axios/Api";

import Notification from "./components/Notification";
function UserFeedback() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    description: "",
  });
  const set = (prop, value) => {
    setFeedback({ ...feedback, [prop]: value });
  };

  const handleUploadBrandInfo = (event) => {
    addFeedbackInfo(feedback).then((data) => {
      if (data.status === "ok") setMessage("Gửi phản hồi thành công");
      else setMessage("Thêm thất bại");
    });
  };
  return (
    <>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />

      <div className="edituser" style={{ marginTop: "200px" }}>
        <form>
          <div className="div-h1">
            <h1>Phản hồi khách hàng</h1>
          </div>
          <div>
            <label htmlFor="description">Nội dung phản hồi</label>
            <textarea
              style={{ width: 500, minHeight: 150 }}
              name="nội dung"
              id="description"
              required
              value={feedback.description}
              onChange={(event) => set("description", event.target.value)}
            />
          </div>
          <button onClick={(event) => handleUploadBrandInfo(event)}>
            Gửi phản hồi
          </button>{" "}
        </form>
      </div>
    </>
  );
}

export default UserFeedback;
