import "../css/Notification.css";
import CustomButton from "./CustomButton";
import { RiCloseFill } from "react-icons/ri";
const Notification = ({ message, setMessage }) => {
  const handleClose = () => {
    setMessage("");
  };
  return (
    <>
      {message !== "" && (
        <div
          className="background-container"
          onContextMenu={(event) => event.preventDefault()}
        >
          <div className="div-notifi">
            <div className="div-close">
              <CustomButton
                IconButton={RiCloseFill}
                size={28}
                color={"red"}
                func={handleClose}
              ></CustomButton>
            </div>
            <h2>Thông báo</h2>
            <div className="div-message">
              <h4>{message}</h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
