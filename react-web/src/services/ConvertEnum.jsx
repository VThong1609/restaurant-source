const convertEnum = (stringEnum) => {
  switch (stringEnum) {
    case "CHODUYET":
      return "Chờ duyệt";
    case "CHUAMO":
      return "Chưa mở";
    case "DANGMO":
      return "Đang mở";
    case "DAKETTHUC":
      return "Đã kết thúc";
    case "BITUCHOI":
      return "Bị từ chối";
    case "HANGHOA":
      return "Hàng hóa";
    case "XAYLAP":
      return "Xây lắp";
    case "TUVAN":
      return "Tư vấn";
    case "PHITUVAN":
      return "Phi tư vấn";
    case "HONHOP":
      return "Hỗn hợp";
    default:
      return "";
  }
};
export default convertEnum;
