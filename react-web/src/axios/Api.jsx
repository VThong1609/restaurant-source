import axios from "axios";
import queryString from "query-string";

const API_URL = "http://localhost:8080/api";
// Đăng kí
const registerUser = async (userData, avatar) => {
  const formData = new FormData();
  formData.append("user", JSON.stringify(userData));
  formData.append("avatar", avatar);
  try {
    const response = await axios.post(`${API_URL}/auth`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Đăng nhập
const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/authenticate`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Đăng xuất
const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Xem thông tin người dùng
const getUserInfo = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/user?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get user info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addUserInfo = async (userInfo, avatar) => {
  const formData = new FormData();
  formData.append("user", JSON.stringify(userInfo));
  formData.append("avatar", avatar);
  try {
    const response = await axios.post(`${API_URL}/user`, formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user info:", error);
    throw error;
  }
};

// Sửa thông tin người dùng
const updateUserInfo = async (userId, updatedInfo, avatar) => {
  const formData = new FormData();
  formData.append("user", JSON.stringify(updatedInfo));
  formData.append("avatar", avatar);
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

// Khóa tài khoản ngường dùng
const changeStatusUser = async (userId) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/change_status/${userId}`,
      null,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user info:", error);
    throw error;
  }
};
// Xem thông tin người dùng
const getStaffInfo = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/staff?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get staff info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addStaffInfo = async (staffInfo) => {
  try {
    const response = await axios.post(`${API_URL}/staff`, staffInfo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding staff info:", error);
    throw error;
  }
};

// Sửa thông tin người dùng
const updateStaffInfo = async (staffId, updatedInfo) => {
  try {
    const response = await axios.put(
      `${API_URL}/staff/${staffId}`,
      updatedInfo,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating staff info:", error);
    throw error;
  }
};

// Khóa tài khoản ngường dùng
const changeStatusStaff = async (staffId) => {
  try {
    const response = await axios.put(
      `${API_URL}/staff/change_status/${staffId}`,
      null,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting staff info:", error);
    throw error;
  }
};
// Xem thông tin người dùng
const getBrand = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/brand?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get brand info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addBrandInfo = async (brandInfo) => {
  try {
    const response = await axios.post(`${API_URL}/brand`, brandInfo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding brand info:", error);
    throw error;
  }
};

// Sửa thông tin người dùng
const updateBrandInfo = async (updatedInfo) => {
  try {
    const response = await axios.put(`${API_URL}/brand`, updatedInfo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating brand info:", error);
    throw error;
  }
};

// Khóa tài khoản ngường dùng
const changeStatusBrand = async (brandId) => {
  try {
    const response = await axios.put(
      `${API_URL}/brand/change_status/${brandId}`,
      null,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting brand info:", error);
    throw error;
  }
};
// Xem thông tin người dùng
const getFeedback = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/feedback?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get feedback info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addFeedbackInfo = async (feedback) => {
  try {
    const response = await axios.post(`${API_URL}/feedback`, feedback, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding feedback info:", error);
    throw error;
  }
};
// Xem thông tin người dùng
const getAssignment = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/assignment?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Assignment info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addAssignmentInfos = async (weddingPartyId, assignments) => {
  try {
    const response = await axios.post(
      `${API_URL}/assignment/${weddingPartyId}`,
      assignments,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding Assignment info:", error);
    throw error;
  }
};
// Xem thông tin người dùng
const getWeddingHall = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/wedding_hall?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Wedding Hall info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addWeddingHallInfo = async (weddingHall) => {
  try {
    const response = await axios.post(`${API_URL}/wedding_hall`, weddingHall, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding Wedding Hall info:", error);
    throw error;
  }
};

// Sửa thông tin người dùng
const updateWeddingHallInfo = async (updatedInfo) => {
  try {
    const response = await axios.put(`${API_URL}/wedding_hall`, updatedInfo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating Wedding Hall info:", error);
    throw error;
  }
};

// Khóa tài khoản ngường dùng
const changeStatusWeddingHall = async (brandId) => {
  try {
    const response = await axios.put(
      `${API_URL}/wedding_hall/change_status/${brandId}`,
      null,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Wedding Hall info:", error);
    throw error;
  }
};
// Xem thông tin người dùng
const getWeddingService = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/wedding_service?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Wedding Service info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addWeddingServiceInfo = async (weddingService) => {
  try {
    const response = await axios.post(
      `${API_URL}/wedding_service`,
      weddingService,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding Wedding service info:", error);
    throw error;
  }
};

// Sửa thông tin người dùng
const updateWeddingServiceInfo = async (updatedInfo) => {
  try {
    const response = await axios.put(
      `${API_URL}/wedding_service`,
      updatedInfo,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Wedding Service info:", error);
    throw error;
  }
};

// Khóa tài khoản ngường dùng
const changeStatusWeddingService = async (brandId) => {
  try {
    const response = await axios.put(
      `${API_URL}/wedding_service/change_status/${brandId}`,
      null,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Wedding Service info:", error);
    throw error;
  }
};
// Xem thông tin người dùng
const getWeddingPartyInformation = async (params) => {
  try {
    const response = await axios.get(
      `${API_URL}/wedding_party_information?${queryString.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Wedding Party Infomation info:", error);
    throw error;
  }
}; // Xem thông tin người dùng
const getServicesWeddingPartyInformation = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/wedding_party_information/${id}/get_services`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Wedding Party Infomation info:", error);
    throw error;
  }
};
// Thêm thông tin người dùng
const addWeddingPartyInformationInfo = async (
  weddingHallId,
  weddingServiceIds,
  partyDate,
  weddingHallType
) => {
  const formData = new FormData();
  formData.append("weddingHallId", weddingHallId);
  formData.append("weddingServiceIds", weddingServiceIds);
  formData.append("partyDate", partyDate);
  formData.append("weddingHallType", weddingHallType);
  try {
    const response = await axios.post(
      `${API_URL}/wedding_party_information`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding Wedding Party Information info:", error);
    throw error;
  }
};
export {
  registerUser,
  loginUser,
  logoutUser,
  addUserInfo,
  updateUserInfo,
  changeStatusUser,
  getUserInfo,
  addStaffInfo,
  updateStaffInfo,
  changeStatusStaff,
  getStaffInfo,
  addBrandInfo,
  updateBrandInfo,
  changeStatusBrand,
  getBrand,
  addFeedbackInfo,
  getFeedback,
  addAssignmentInfos,
  getAssignment,
  addWeddingHallInfo,
  updateWeddingHallInfo,
  changeStatusWeddingHall,
  getWeddingHall,
  addWeddingServiceInfo,
  updateWeddingServiceInfo,
  changeStatusWeddingService,
  getWeddingService,
  getWeddingPartyInformation,
  addWeddingPartyInformationInfo,
  getServicesWeddingPartyInformation,
};
