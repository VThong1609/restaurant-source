import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/EditUser.css";
import { addBrandInfo, getBrand, updateBrandInfo } from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";
function EditBrand() {
  const [message, setMessage] = useState("");

  const id = useParams().id;
  const typePage = !id ? "ADD" : "UPDATE";
  const navigate = useNavigate();
  const [brand, setBrand] = useState({
    brandName: "",
    brandAddress: "",
  });
  const set = (prop, value) => {
    setBrand({ ...brand, [prop]: value });
  };
  useEffect(() => {
    if (typePage === "UPDATE")
      getBrand({ _id: id }).then((data) => {
        setBrand(data.data.content[0]);
      });
  }, [typePage, id]);
  const handleUploadBrandInfo = (event) => {
    event.preventDefault();
    if (typePage === "ADD")
      addBrandInfo(brand).then((data) => {
        if (data.status === "ok") navigate("/Brand");
        else setMessage("Thêm thất bại");
      });
    else
      updateBrandInfo(brand).then((data) => {
        if (data.status === "ok") navigate("/Brand");
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
            <h1>{typePage === "ADD" ? "Tạo" : "Chỉnh sửa"} Chi nhánh</h1>
          </div>
          <div>
            <label htmlFor="firstName">Tên chi nhánh</label>
            <input
              type="text"
              name="Tên chi nhánh"
              id="name"
              required
              value={brand.brandName}
              onChange={(event) => set("brandName", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Địa chỉ chi nhánh</label>
            <input
              type="text"
              min={0}
              name="Địa chỉ chi nhánh"
              id="address"
              required
              value={brand.brandAddress}
              onChange={(event) => set("brandAddress", event.target.value)}
            />
          </div>
          <button onClick={(event) => handleUploadBrandInfo(event)}>
            {typePage}
          </button>{" "}
          <div className="home-link">
            <Link to={"/Brand"}>Quay lại</Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditBrand;
