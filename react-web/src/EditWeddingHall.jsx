import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/EditUser.css";
import {
  addWeddingHallInfo,
  getWeddingHall,
  updateWeddingHallInfo,
} from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";
function EditWeddingHall() {
  const [message, setMessage] = useState("");

  const id = useParams().id;
  const typePage = !id ? "ADD" : "UPDATE";
  const navigate = useNavigate();
  const [weddingHall, setWeddingHall] = useState({
    weddingHallName: "",
    weddingHallLocation: "",
    morningPrice: "",
    noonPrice: "",
    eveningPrice: "",
    weekendPrice: "",
  });
  const set = (prop, value) => {
    setWeddingHall({ ...weddingHall, [prop]: value });
  };
  useEffect(() => {
    if (typePage === "UPDATE")
      getWeddingHall({ _id: id }).then((data) => {
        setWeddingHall(data.data.content[0]);
      });
  }, [typePage, id]);
  const handleUploadWeddingHallInfo = (event) => {
    event.preventDefault();
    if (typePage === "ADD")
      addWeddingHallInfo(weddingHall).then((data) => {
        if (data.status === "ok") navigate("/WeddingHall");
        else setMessage("Thêm thất bại");
      });
    else
      updateWeddingHallInfo(weddingHall).then((data) => {
        if (data.status === "ok") navigate("/WeddingHall");
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
            <h1>{typePage === "ADD" ? "Tạo" : "Chỉnh sửa"} Sảnh cưới</h1>
          </div>
          <div>
            <label htmlFor="firstName">Tên sảnh</label>
            <input
              type="text"
              name="Tên sảnh"
              id="name"
              required
              value={weddingHall.weddingHallName}
              onChange={(event) => set("weddingHallName", event.target.value)}
            />
          </div>{" "}
          <div>
            <label htmlFor="location">Vị trí sảnh</label>
            <input
              type="text"
              name="Vị trí sảnh"
              id="location"
              required
              value={weddingHall.weddingHallLocation}
              onChange={(event) =>
                set("weddingHallLocation", event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="morning">Giá sáng</label>
            <input
              type="number"
              min={0}
              name="Giá sáng"
              id="morning"
              required
              value={weddingHall.morningPrice}
              onChange={(event) => set("morningPrice", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="noon">Giá trưa</label>
            <input
              type="number"
              min={0}
              name="Giá trưa"
              id="noon"
              required
              value={weddingHall.noonPrice}
              onChange={(event) => set("noonPrice", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="evening">Giá tối</label>
            <input
              type="number"
              min={0}
              name="Giá tối"
              id="evening"
              required
              value={weddingHall.eveningPrice}
              onChange={(event) => set("eveningPrice", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="weekend">Giá cuối tuần</label>
            <input
              type="number"
              min={0}
              name="Giá cuối tuần"
              id="weekend"
              required
              value={weddingHall.weekendPrice}
              onChange={(event) => set("weekendPrice", event.target.value)}
            />
          </div>
          <button onClick={(event) => handleUploadWeddingHallInfo(event)}>
            {typePage}
          </button>{" "}
          <div className="home-link">
            <Link to={"/WeddingHall"}>Quay lại</Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditWeddingHall;
