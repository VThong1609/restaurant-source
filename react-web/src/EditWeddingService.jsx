import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/EditUser.css";
import {
  addWeddingServiceInfo,
  getWeddingService,
  updateWeddingServiceInfo,
} from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";
function EditWeddingService() {
  const [message, setMessage] = useState("");

  const id = useParams().id;
  const typePage = !id ? "ADD" : "UPDATE";
  const navigate = useNavigate();
  const [weddingService, setWeddingService] = useState({
    weddingServiceName: "",
    weddingServicePrice: "",
  });
  const set = (prop, value) => {
    setWeddingService({ ...weddingService, [prop]: value });
  };
  useEffect(() => {
    if (typePage === "UPDATE")
      getWeddingService({ _id: id }).then((data) => {
        setWeddingService(data.data.content[0]);
      });
  }, [typePage, id]);
  const handleUploadWeddingServiceInfo = (event) => {
    event.preventDefault();
    if (typePage === "ADD")
      addWeddingServiceInfo(weddingService).then((data) => {
        if (data.status === "ok") navigate("/WeddingService");
        else setMessage("Thêm thất bại");
      });
    else
      updateWeddingServiceInfo(weddingService).then((data) => {
        if (data.status === "ok") navigate("/WeddingService");
        else setMessage("Cập nhật thất bại");
      });
  };
  return (
    <>
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />

      <div className="edituser" style={{ marginTop: "200px" }}>
        <form>
          <div className="div-h1">
            <h1>{typePage === "ADD" ? "Tạo" : "Chỉnh sửa"} Dịch vụ cưới</h1>
          </div>
          <div>
            <label htmlFor="firstName">Tên dịch vụ</label>
            <input
              type="text"
              name="Tên dịch vụ"
              id="name"
              required
              value={weddingService.weddingServiceName}
              onChange={(event) =>
                set("weddingServiceName", event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="price">Giá dịch vụ</label>
            <input
              type="number"
              min={0}
              name="Giá dịch vụ"
              id="price"
              required
              value={weddingService.weddingServicePrice}
              onChange={(event) =>
                set("weddingServicePrice", event.target.value)
              }
            />
          </div>
          <button onClick={(event) => handleUploadWeddingServiceInfo(event)}>
            {typePage}
          </button>{" "}
          <div className="home-link">
            <Link to={"/WeddingService"}>Quay lại</Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditWeddingService;
