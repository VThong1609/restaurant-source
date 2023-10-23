import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.jpg";
import "../css/HeaderPage.css";
import { logoutUser } from "../axios/Api";
import Notification from "./Notification";
function HeaderPage() {
  const navigate = useNavigate();
  const [showBiddingSubMenu, setShowBiddingSubMenu] = useState(false);
  const [showAdminSubMenu, setShowAdminSubMenu] = useState(false);
  const [message, setMessage] = useState("");

  const logout = (event) => {
    event.preventDefault();
    logoutUser().then((data) => {
      if (data.status === "ok") {
        window.localStorage.clear();
        if (window.location.pathname === "/") window.location.reload();
        else navigate("/");
      } else setMessage("Đăng xuất có vấn đề, vui lòng thử lại sau.");
    });
  };
  const styleEnter = (id) => {
    document.getElementById(id).style.backgroundColor = "rgba(255,255,255,0.5)";
  };
  const styleLeave = (id) => {
    document.getElementById(id).style.backgroundColor = "rgba(255,255,255,0)";
  };
  const handleMouseEnter = (menu, id) => {
    if (menu === "bidding") {
      setShowBiddingSubMenu(true);
    } else if (menu === "admin") {
      setShowAdminSubMenu(true);
    }
    styleEnter(id);
  };

  const handleMouseLeave = (menu, id) => {
    if (menu === "bidding") {
      setShowBiddingSubMenu(false);
    } else if (menu === "admin") {
      setShowAdminSubMenu(false);
    }
    styleLeave(id);
  };

  const handleSubMenuMouseEnter = (menu) => {
    // Do nothing, keep the sub-menu visible
    if (menu === "bidding") {
      setShowBiddingSubMenu(true);
    } else if (menu === "admin") {
      setShowAdminSubMenu(true);
    }
  };

  const handleSubMenuMouseLeave = (menu) => {
    if (menu === "bidding") {
      setShowBiddingSubMenu(false);
    } else if (menu === "admin") {
      setShowAdminSubMenu(false);
    }
  };
  const handleCreateBidProfile = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) setMessage("Vui long dang nhap");
    else navigate("/CreateBidProfile");
  };
  const handleCreatedBidProfiles = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) setMessage("Vui long dang nhap");
    else navigate("/CreatedBidProfiles");
  };
  const handleListbids = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) setMessage("Vui long dang nhap");
    else navigate("/Listbids");
  };
  const handleContractStorage = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) setMessage("Vui long dang nhap");
    else navigate("/ContractStorage");
  };

  return (
    <div
      className="header-container"
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <Notification message={message} setMessage={setMessage} />

      <div className="upper-header">
        <div className="header-logo">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 165, height: "auto", paddingRight: "140px" }}
            />
          </Link>
        </div>
        <div>
          <h1>Hệ Thống Quản Lý Nhà Hàng Tiệc Cưới</h1>
        </div>

        <div className="header-buttons">
          {!localStorage.getItem("token") && (
            <>
              <div className="login" style={{ marginLeft: "120px" }}>
                <Link to={"/Login"}>
                  <button>Đăng nhập</button>
                </Link>
              </div>
              <div className="register">
                <Link to={"/Register"}>
                  <button>Đăng ký</button>
                </Link>
              </div>
            </>
          )}
          {localStorage.getItem("token") && (
            <>
              <div>
                <h3>Account: {localStorage.getItem("username")}</h3>
              </div>
              <div className="logout">
                <button onClick={(event) => logout(event)}>Đăng xuất</button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="header">
        <div className="header-content">
          <nav>
            <ul className="menu">
              {localStorage.getItem("role") === "USER" && (
                <>
                  <li>
                    <div className="div-hover">
                      <Link to={"/Search"}>Tìm kiếm tiệc cưới</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link to={"/User-Feedback"}>Phản hồi</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link to={"/User-WeddingPartyInformation"}>
                        Dịch vụ đã thuê
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link
                        to={"/UserInfo/" + localStorage.getItem("username")}
                      >
                        Thông tin cá nhân
                      </Link>
                    </div>
                  </li>
                </>
              )}
              {localStorage.getItem("role") === "STAFF" && (
                <>
                  <li>
                    <div className="div-hover">
                      <Link to={"/Assignment"}>Công việc được chia</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link
                        to={"/StaffInfo/" + localStorage.getItem("username")}
                      >
                        Thông tin cá nhân
                      </Link>
                    </div>
                  </li>
                </>
              )}
              {localStorage.getItem("role") === "ADMIN" && (
                <>
                  <li>
                    <div className="div-hover">
                      <Link to={"/WeddingPartyInformation"}>
                        Thông tin tiệc cưới
                      </Link>
                    </div>
                  </li>
                  <li>
                    {/* <Link to="/CreateBidProfile">Tạo hợp đồng đấu thầu</Link> */}
                    <div className="div-hover">
                      <Link to={"/Feedback"}>Phản hồi</Link>
                    </div>
                  </li>
                  <li>
                    {/* <Link to="/CreateBidProfile">Tạo hợp đồng đấu thầu</Link> */}
                    <div className="div-hover">
                      <Link to={"/Brand"}>Chi nhánh</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link to={"/WeddingHall"}>Sảnh cưới</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link to={"/WeddingService"}>Dịch vụ cưới</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link to={"/Staff"}>Nhân viên</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link to={"/User"}>Người dùng</Link>
                    </div>
                  </li>
                  <li>
                    <div className="div-hover">
                      <Link
                        to={"/StaffInfo/" + localStorage.getItem("username")}
                      >
                        Thông tin cá nhân
                      </Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default HeaderPage;
