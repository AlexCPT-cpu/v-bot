import { useNavigate } from "react-router-dom";
import { CreateModal } from "./CreateModal";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center mt-3">
      <div
        onClick={() => navigate("/")}
        className="ring-2 ring-white rounded-full p-2 w-fit flex justify-center items-center mr-3 cursor-pointer transition-all duration-150 active:scale-90"
      >
        <img
          src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=John`}
          alt="icon"
          className="w-8"
        />
      </div>

      <div>
        <CreateModal />
      </div>
    </div>
  );
};
