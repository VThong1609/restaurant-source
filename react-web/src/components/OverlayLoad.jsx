import { ImSpinner2 } from "react-icons/im";
import "../css/OverlayLoad.css";
const OverlayLoad = () => {
  return (
    <>
      <div
        className="background-container"
        onContextMenu={(event) => event.preventDefault()}
      >
        <div>
          <ImSpinner2 size={45} color="pink" className="spinner-icon" />
        </div>
        <div>
          <h3>Dữ liệu đang được khởi tạo. Vui lòng chờ!</h3>
        </div>
      </div>
    </>
  );
};

export default OverlayLoad;
