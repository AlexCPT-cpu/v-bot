import { useNavigate } from "react-router-dom";
import { CreateModal } from "./CreateModal";
import myImage from "../assets/logo.jpg";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center mt-3">
      <div
        onClick={() => navigate("/")}
        className="ring-2 ring-white rounded-full p-1 w-fit flex justify-center items-center cursor-pointer transition-all duration-150 active:scale-90"
      >
        <img src={myImage} alt="icon" className="w-10 rounded-full" />
      </div>

      <div>
        <CreateModal />
      </div>
    </div>
  );
};
