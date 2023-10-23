import React from "react";
import { Link } from "react-router-dom";
import "../css/FooterPage.css";
function FooterPage() {
  return (
    <div className="footer">
      <footer>
        <div className="contact-info">
          <Link to={""}>Liên hệ</Link>
        </div>
        <div className="about-us">
          <Link to={""}>Thông tin về chúng tôi</Link>
        </div>
        <div className="terms-of-use">
          <Link to={""}>Điều khoản sử dụng</Link>
        </div>
      </footer>
    </div>
  );
}
export default FooterPage;
