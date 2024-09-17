import truncateEthAddress from "truncate-eth-address";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";
import { BotItemCard } from "../components/BotItemCard";
import { useState } from "react";
import { WithdrawModal } from "../components/WithdrawModal";
import { EditModal } from "../components/EditModal";
import { StopModal } from "../components/StopModal";

const BotPage = () => {
  // Extract dynamic parameters
  const { userId, tokenAddress } = useParams<{
    userId: string;
    tokenAddress: string;
  }>();

  const amount = 1.5;

  const [privateKey, setPrivateKey] = useState(
    truncateEthAddress(tokenAddress ? tokenAddress : "")
  );

  const [active, setActive] = useState(true);

  return (
    <div className="flex h-screen w-full transition-all duration-150 flex-col px-5 relative">
      <Toaster />
      <Header />
      {/* <h1 className="text-2xl font-bold mb-4 mt-10 text-center">
        {"USDC"} BOT
      </h1>
      <p>User ID: {userId}</p>
      <p>
        Token Address: {truncateEthAddress(tokenAddress ? tokenAddress : "")}
      </p>
      <p>Amount: {amount}</p> */}
      <div className="bg-black text-white flex flex-col items-center mt-2 px-4 py-2">
        <div className="w-full shadow-md p-6 space-y-4 border border-gray-600 rounded-lg bg-gray-900">
          <div className="w-full flex flex-row justify-between">
            <div className="items-start text-left hover:bg-gray-600/20 rounded-lg">
              <span
                className={`flex h-2 w-2 translate-y-1 rounded-full ${
                  !active ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
            <div className="transition-all duration-150 ease-in-out">
              <StopModal setPaused={setActive} paused={active} />
              {/* <Switch
                noMargin={true}
                checked={active}
                onChange={(checked: boolean) => setActive(checked)}
              /> */}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">USDC BOT</h1>
            <EditModal />
          </div>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">User ID:</span> {userId}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Token Address:</span>{" "}
              {truncateEthAddress("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Amount:</span> {amount}
            </p>
          </div>
          {/* Private Key Section */}
          <div className="flex fleex-row w-full justify-between items-center space-x-8">
            <div className="whitespace-nowrap">Private Key:</div>
            <div className="relative flex items-center border border-gray-600 rounded-lg p-2 bg-gray-800">
              <input
                type="text"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="bg-transparent text-white w-full focus:outline-none text-center"
                placeholder="Enter Private Key"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2 text-center">Created Wallets</h1>
      <BotItemCard />
      <div className="flex justify-end items-center">
        <WithdrawModal />
      </div>
      <div className="text-center flex items-center flex-col w-full h-full">
        <div className="w-full fixed bottom-0">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default BotPage;
