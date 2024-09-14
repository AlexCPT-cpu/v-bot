import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { TableDemo } from "../components/Table";

function Home() {
  return (
    <div className="flex h-screen w-full transition-all duration-150 flex-col">
      <Header />
      <h1 className="text-2xl font-bold mb-4 mt-10 text-center">
        Bundle Liquidity Transactions
      </h1>
      <div className="text-center flex items-center justify-center flex-col w-full h-full">
        <TableDemo />
        {/* <Link to="private-key">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-150 active:scale-90 focus:border-white">
            Enter Private Key
          </button>
        </Link> */}
      </div>
    </div>
  );
}

export default Home;
