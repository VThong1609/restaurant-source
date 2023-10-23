import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import reportWebVitals from "./reportWebVitals";
import Register from "./Register";
import Login from "./Login";
import UserManagement from "./UserManagement";
import EditUser from "./EditUser";

import UserInfo from "./UserInfo";
import "./css/index.css";
import Notification from "./components/Notification";
import StaffManagement from "./StaffManagement";
import EditStaff from "./EditStaff";
import StaffInfo from "./StaffInfo";
import WeddingServiceManagement from "./WeddingServiceManagement";
import EditWeddingService from "./EditWeddingService";
import EditWeddingHall from "./EditWeddingHall";
import WeddingHallManagement from "./WeddingHallManagement";
import BrandManagement from "./BrandManagement";
import EditBrand from "./EditBrand";
import Feedback from "react-bootstrap/esm/Feedback";
import FeedbackManagement from "./FeedbackManagement";
import UserFeedback from "./Feedback";
import UserWeddingPartyInformation from "./UserWeddingPartyInformation";
import Search from "./Search";
import WeddingPartyInformation from "./WeddingPartyInformation";
import WeddingPartyInformationDetail from "./WeddingPartyInformationDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/AddUser" element={<EditUser />} />{" "}
        <Route exact path="/User" element={<UserManagement />} />{" "}
        <Route exact path="/EditUser/:id" element={<EditUser />} />
        <Route exact path="/UserInfo/:id" element={<UserInfo />} />
        <Route exact path="/Staff" element={<StaffManagement />} />{" "}
        <Route exact path="/AddStaff" element={<EditStaff />} />{" "}
        <Route exact path="/EditStaff/:id" element={<EditStaff />} />
        <Route exact path="/StaffInfo/:id" element={<StaffInfo />} />
        <Route
          exact
          path="/WeddingService"
          element={<WeddingServiceManagement />}
        />{" "}
        <Route
          exact
          path="/AddWeddingService"
          element={<EditWeddingService />}
        />{" "}
        <Route
          exact
          path="/EditWeddingService/:id"
          element={<EditWeddingService />}
        />
        <Route exact path="/WeddingHall" element={<WeddingHallManagement />} />{" "}
        <Route exact path="/AddWeddingHall" element={<EditWeddingHall />} />{" "}
        <Route
          exact
          path="/EditWeddingHall/:id"
          element={<EditWeddingHall />}
        />
        <Route exact path="/Brand" element={<BrandManagement />} />{" "}
        <Route exact path="/AddBrand" element={<EditBrand />} />{" "}
        <Route exact path="/EditBrand/:id" element={<EditBrand />} />
        <Route exact path="/Feedback" element={<FeedbackManagement />} />
        <Route
          exact
          path="/WeddingPartyInformation"
          element={<WeddingPartyInformation />}
        />
        <Route
          exact
          path="/WeddingPartyInformation/:id"
          element={<WeddingPartyInformationDetail />}
        />
        <Route exact path="/Test" element={<Notification />} />
        <Route exact path="/User-Feedback" element={<UserFeedback />} />
        <Route
          exact
          path="/User-WeddingPartyInformation"
          element={<UserWeddingPartyInformation />}
        />
        <Route exact path="/Search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
