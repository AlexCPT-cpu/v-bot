/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bot } from "./HomeCard";
import truncateEthAddress from "truncate-eth-address";
import { ERC20_ABI, MAINNET_PROVIDER } from "../../config/config";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const BotItem = ({
  userId,
  notification,
  goToTokenDetails,
  index,
}: {
  userId: number;
  notification: Bot;
  goToTokenDetails: any;
  index: number;
}) => {
  const [name, setName] = useState("Unknown");

  useEffect(() => {
    const getName = async () => {
      try {
        if (notification.tokenAddress) {
          const provider = new ethers.InfuraProvider(
            import.meta.env.VITE_NETWORK || "mainnet",
            MAINNET_PROVIDER
          );
          const contract = new ethers.Contract(
            notification.tokenAddress,
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
  }, [notification]);

  return (
    <div
      onClick={() => goToTokenDetails(userId, notification.tokenAddress, index)}
      className="w-full flex flex-row justify-between border-b border-b-white items-center py-2 mb-4 pb-5 cursor-pointer"
    >
      <div className="grid grid-cols-[25px_1fr] items-start text-left hover:bg-gray-600/20 rounded-none w-full">
        <span
          className={`flex h-2 w-2 translate-y-1 rounded-full transition-colors duration-100 ${
            notification.active ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">${name}</p>
          <p className="text-sm text-muted-foreground">
            {truncateEthAddress(notification.tokenAddress)}
          </p>
        </div>
      </div>

      <div className="flex items-center w-full justify-end">
        {/* <Switch
        checked={notification.active}
        onChange={(checked: boolean) =>
          handleSwitchChange(index, checked)
        }
      /> */}
      </div>
    </div>
  );
};

export default BotItem;
