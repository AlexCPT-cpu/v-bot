import { Header } from "../components/Header";
import { HomeCard } from "../components/HomeCard";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <div className="flex h-screen w-full transition-all duration-150 flex-col px-5 relative">
      <Toaster />
      <Header />
      <h1 className="text-2xl font-bold mb-2 mt-3 text-center">
        Create Volume For Pairs
      </h1>
      <div className="text-center flex items-center mt-3 flex-col w-full h-full">
        <HomeCard />
        <div className="w-full fixed bottom-0">
          <Nav />
        </div>
      </div>
    </div>
  );
}

export default Home;
