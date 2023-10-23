import { useEffect, useState } from "react";
import {
  addWeddingPartyInformationInfo,
  getBrand,
  getUserInfo,
  getWeddingHall,
} from "./axios/Api";
import HeaderPage from "./components/HeaderPage";
import Notification from "./components/Notification";
import BrandTab from "./components/BrandTab";
import WeddingHallTab from "./components/WeddingHallTab";
import WeddingServiceTab from "./components/WeddingServiceTab";
import "./css/UserManagement.css";
import PDFFile from "./services/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
function Search() {
  const [message, setMessage] = useState("");
  const [brand, setBrand] = useState("");
  const [weddingHall, setWeddingHall] = useState("");
  const [partyDate, setPartyDate] = useState("");
  const [weddingHallType, setWeddingHallType] = useState("MORNING");
  const [weddingServices, setWeddingServices] = useState([]);
  const [tab, setTab] = useState("brand");
  const [user, setUser] = useState({});
  const handleAddWeddingParty = () => {
    if(brand==="")
    setMessage("Vui lòng chọn chi nhánh!");
  else if(weddingHall==="")
    setMessage("Vui lòng chọn sảnh cưới!");
  else if(weddingServices.length===0)
   setMessage("Vui lòng chọn dịch vụ cưới!");
  else if(partyDate==="")
    setMessage("Vui lòng chọn thời gian tổ chức tiệc cưới!");
  else
      addWeddingPartyInformationInfo(
        weddingHall.id,
        weddingServices.map((ws) => ws.id),
        partyDate,
        weddingHallType
      ).then((response) => {
        if (response.status === "ok") setMessage("Đặt tiệc thành công");
        else setMessage("Đặt tiệc không thành công");
      });
  };
  useEffect(() => {
    getUserInfo({ _email: localStorage.getItem("username") }).then(
      (response) => {
        setUser(response.data.content[0]);
      }
    );
  }, [window.location.href]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginTop: "180px",
      }}
    >
      <HeaderPage />
      <Notification message={message} setMessage={setMessage} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          boxSizing: " border-box",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            border: "1px solid black",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-evenly",
              margin: "10px auto",
            }}
          >
            <div
              style={{
                backgroundColor: "#9a9a9ad9",
                padding: "5px 10px",
                borderRadius: 5,
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
              onClick={(e) => setTab("brand")}
            >
              Chi Nhánh
            </div>
            <div
              style={{
                backgroundColor: "#9a9a9ad9",
                padding: "5px 10px",
                borderRadius: 5,
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
              onClick={(e) => setTab("weddingHall")}
            >
              Sảnh cưới
            </div>
            <div
              style={{
                backgroundColor: "#9a9a9ad9",
                padding: "5px 10px",
                borderRadius: 5,
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
              onClick={(e) => setTab("weddingService")}
            >
              Dịch vụ cưới
            </div>
          </div>
          <div>
            {tab === "brand" && (
              <BrandTab brand={brand} setBrand={setBrand}></BrandTab>
            )}
            {tab === "weddingHall" && (
              <WeddingHallTab
                weddingHall={weddingHall}
                setWeddingHall={setWeddingHall}
              ></WeddingHallTab>
            )}
            {tab === "weddingService" && (
              <WeddingServiceTab
                weddingServicess={weddingServices}
                setWeddingServicess={setWeddingServices}
              ></WeddingServiceTab>
            )}
          </div>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            border: "1px solid black",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: " space-around ",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>Loại sảnh:</div>
              <div>
                <select
                  id="search"
                  style={{
                    width: "150px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "15px",
                    marginLeft: "10px",
                  }}
                  value={weddingHallType}
                  onChange={(event) => setWeddingHallType(event.target.value)}
                >
                  <option value="MORNING">Buổi sáng</option>
                  <option value="NOON">Buổi trưa</option>
                  <option value="EVENING">Buổi tối</option>
                  <option value="WEEKEND">Cuối tuần</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>Thời gian tổ chức tiệc:</div>
              <div>
                <input
                  style={{
                    width: "200px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "15px",
                    marginLeft: "10px",
                  }}
                  type="datetime-local"
                  value={partyDate}
                  onChange={(e) => setPartyDate(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              {/* <button
                style={{
                  width: "100px",
                  height: "30px",
                  borderRadius: "5px",
                  marginRight: "15px",
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={(e) => handleAddWeddingParty()}
              >
                Đặt tiệc
              </button> */}
              <PDFDownloadLink
                style={{ display: "hidden" }}
                id="billPDF"
                disabled={
                  // !(
                  //   user.id &&
                  //   brand.id &&
                  //   partyDate &&
                  //   weddingHall.id &&
                  //   weddingServices.length > 0
                  // )
                  true
                }
                onClick={(e) => {
                  if (
                    !(
                      user.id &&
                      brand.id &&
                      partyDate &&
                      weddingHall.id &&
                      weddingServices.length > 0
                    )
                  )
                    e.preventDefault();
                }}
                document={
                  <PDFFile
                    user={user}
                    brand={brand}
                    partyDate={partyDate}
                    weddingHall={weddingHall}
                    weddingHallType={weddingHallType}
                    weddingServices={weddingServices}
                  />
                }
                filename="FORM"
              >
                {" "}
                <button
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "15px",
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={(e) => handleAddWeddingParty()}
                >
                  Đặt tiệc
                </button>{" "}
              </PDFDownloadLink>
            </div>
          </div>
          <div>
            {brand !== "" && (
              <div>
                <h3>Chi Nhánh</h3>
                <table style={{ margin: "30px auto" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên chi nhánh</th>
                      <th>Địa chỉ chi nhánh</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={brand.id}>
                      <td style={{ textAlign: "center" }}>{brand.id}</td>
                      <td style={{ textAlign: "center" }}>{brand.brandName}</td>
                      <td>{brand.brandAddress}</td>

                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "green",
                            borderRadius: 5,
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.cursor = "pointer")
                          }
                          onClick={(e) => setBrand("")}
                        >
                          Bỏ chọn
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {weddingHall !== "" && (
              <div>
                <h3>Sảnh cưới</h3>
                <table style={{ margin: "30px auto" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên sảnh</th>
                      <th>Vị trí sảnh</th>
                      <th>Giá sáng</th> <th>Giá trưa</th>
                      <th>Giá tối</th>
                      <th>Giá cuối tuần</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={weddingHall.id}>
                      <td style={{ textAlign: "center" }}>{weddingHall.id}</td>
                      <td style={{ textAlign: "center" }}>
                        {weddingHall.weddingHallName}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {weddingHall.weddingHallLocation}
                      </td>
                      <td>{weddingHall.morningPrice}</td>
                      <td>{weddingHall.noonPrice}</td>
                      <td>{weddingHall.eveningPrice}</td>
                      <td>{weddingHall.weekendPrice}</td>

                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "green",
                            borderRadius: 5,
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.cursor = "pointer")
                          }
                          onClick={(e) => setWeddingHall("")}
                        >
                          Bỏ Chọn
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {weddingServices.length !== 0 && (
              <div>
                <h3>Dịch vụ cưới</h3>
                <table style={{ margin: "30px auto" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên dịch vụ</th>
                      <th>Giá</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weddingServices.map((weddingService) => (
                      <tr key={weddingService.id}>
                        <td style={{ textAlign: "center" }}>
                          {weddingService.id}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {weddingService.weddingServiceName}
                        </td>
                        <td>{weddingService.weddingServicePrice}</td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "green",
                              borderRadius: 5,
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.cursor = "pointer")
                            }
                            onClick={(e) =>
                              setWeddingServices(
                                weddingServices.filter(
                                  (ws) => ws.id !== weddingService.id
                                )
                              )
                            }
                          >
                            Bỏ Chọn
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Search;
