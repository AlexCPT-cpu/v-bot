import { Header } from "../components/Header";
import { BotCard } from "../components/BotCard";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";

function Bots() {
  return (
    <div className="flex h-screen w-full transition-all duration-150 flex-col px-5 relative">
      <Toaster />
      <Header />
      <h1 className="text-2xl font-bold mb-4 mt-10 text-center">
        Created Bots
      </h1>
      <div className="text-center flex items-center flex-col w-full h-full">
        <BotCard />
        <div className="w-full fixed bottom-0">
          <Nav />
        </div>
      </div>
    </div>
  );
}

export default Bots;
