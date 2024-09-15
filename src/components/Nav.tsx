import { BotIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <div className="w-full bg-black text-white h-16 flex justify-between items-center px-4 mb-4">
      <div className="flex items-center space-x-6 w-full mx-auto justify-center">
        <Link to="/">
          <button className="flex flex-col items-center text-center transition-all duration-100 active:scale-90 text-white">
            <div className="bg-gray-800 p-2 rounded-full">
              <HomeIcon className="h-4 w-4" />
            </div>
            <span className="text-xs mt-1">Home</span>
          </button>
        </Link>
        <Link to="bots">
          <button className="flex flex-col items-center text-center transition-all duration-100 active:scale-90 text-white">
            <div className="bg-gray-800 p-2 rounded-full">
              <BotIcon className="h-4 w-4" />
            </div>
            <span className="text-xs mt-1">Bots</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
