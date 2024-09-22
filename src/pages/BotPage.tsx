/* eslint-disable @typescript-eslint/no-unused-vars */
import truncateEthAddress from "truncate-eth-address";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";
import { BotItemCard } from "../components/BotItemCard";
import { useEffect, useMemo, useState } from "react";
import { WithdrawModal } from "../components/WithdrawModal";
import { Pencil } from "lucide-react";
import { StopModal } from "../components/StopModal";
import { ethers } from "ethers";
import { apiEndpoint, ERC20_ABI, MAINNET_PROVIDER } from "../../config/config";
import axios from "axios";
import { Bot } from "../components/HomeCard";

const BotPage = () => {
  // Extract dynamic parameters
  const { userId, tokenAddress, index } = useParams<{
    userId: string;
    tokenAddress: string;
    index: string;
  }>();

  const [name, setName] = useState("Unknown");
  const [data, setData] = useState<Bot[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/api/user/${userId}`);
        setData(response?.data?.bots);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    getUserData();
  }, [userId]);

  const bot = useMemo(() => {
    if (data.length > 0) {
      return data[Number(index)];
    }
  }, [data, index]);
  //@ts-expect-error bool
  const [active, setActive] = useState<boolean>(bot?.active);

  useEffect(() => {
    const getName = async () => {
      try {
        if (tokenAddress) {
          const provider = new ethers.InfuraProvider(
            import.meta.env.VITE_NETWORK || "mainnet",
            MAINNET_PROVIDER
          );
          const contract = new ethers.Contract(
            tokenAddress,
            ERC20_ABI,
            provider
          );
          const nameE = await contract.name();
          setName(nameE);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getName();
  }, [tokenAddress]);

  return (
    <div className="flex h-screen w-full transition-all duration-150 flex-col px-5 relative">
      <Toaster />
      <Header />
      {!!bot && (
        <>
          <div className="bg-black text-white flex flex-col items-center mt-2 px-4 py-2">
            <div className="w-full shadow-md p-6 space-y-4 border border-gray-600 rounded-lg bg-gray-900">
              <div className="w-full flex flex-row justify-between">
                <div className="items-start text-left hover:bg-gray-600/20 rounded-lg">
                  <span
                    className={`flex h-2 w-2 translate-y-1 rounded-full ${
                      bot?.active ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>
                <div className="transition-all duration-150 ease-in-out">
                  <StopModal
                    username={userId!}
                    index={index!}
                    setPaused={setActive}
                    paused={bot.active}
                  />
                  {/* <Switch
                noMargin={true}
                checked={active}
                onChange={(checked: boolean) => setActive(checked)}
              /> */}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-white">{name} BOT</h1>
                {/* <EditModal /> */}
                <div className="cursor-pointer relative flex items-center border border-gray-600 rounded-lg p-2 bg-gray-800 transition-all duration-100 active:scale-90">
                  <Pencil className="text-white w-4 h-4" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">User ID:</span> {userId}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Token Address:</span>{" "}
                  {truncateEthAddress(bot.tokenAddress)}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Amount:</span> {bot.amount}
                  ETH
                </p>
              </div>
              {/* Private Key Section */}
              <div className="flex fleex-row w-full justify-between items-center space-x-8">
                <div className="whitespace-nowrap">Private Key:</div>
                <div className="relative flex items-center border border-gray-600 rounded-lg p-2 bg-gray-800">
                  <input
                    type="text"
                    value={truncateEthAddress(bot.privateKey)}
                    className="bg-transparent text-white w-full focus:outline-none text-center"
                    placeholder="Enter Private Key"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-center">
            Created Wallets
          </h1>
          <BotItemCard
            tokenAddress={tokenAddress}
            wallets={[
              bot.wallet1,
              bot.wallet2,
              bot.wallet3,
              bot.wallet4,
              bot.wallet5,
            ]}
          />
          <div className="flex justify-end items-center">
            <WithdrawModal
              wallets={[
                bot.wallet1,
                bot.wallet2,
                bot.wallet3,
                bot.wallet4,
                bot.wallet5,
              ]}
              privateKey={bot.privateKey}
              username={userId!}
              index={index!}
              tokenAddress={tokenAddress!}
            />
          </div>
          <div className="text-center flex items-center flex-col w-full h-full">
            <div className="w-full fixed bottom-0">
              <Nav />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BotPage;
