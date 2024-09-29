/* eslint-disable @typescript-eslint/no-explicit-any */
import truncateEthAddress from "truncate-eth-address";
import { ERC20_ABI, MAINNET_PROVIDER } from "../../config/config";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const WalletItem = ({
  wallet,
  index,
  tokenAddress,
}: {
  wallet: string;
  index: number;
  tokenAddress: string;
}) => {
  const [balance, setBalance] = useState("0");
  const [balanceToken, setBalanceToken] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getName = async () => {
      try {
        if (wallet && tokenAddress) {
          // const provider = new ethers.InfuraProvider(
          //   import.meta.env.VITE_NETWORK || "mainnet",
          //   MAINNET_PROVIDER
          // );
          const provider = new ethers.InfuraProvider(
            "mainnet",
            MAINNET_PROVIDER
          );
          const walletE = new ethers.Wallet(wallet, provider);
          setAddress(walletE.address);
          const contract = new ethers.Contract(
            tokenAddress,
            ERC20_ABI,
            provider
          );
          const balanceToken = await contract.balanceOf(walletE.address);
          const balanceWei = await provider.getBalance(walletE.address); // Get balance in Wei
          const balanceEther = ethers.formatEther(balanceWei); // Convert Wei to Ether

          const formattedBalance = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2, // Display up to 3 decimal places
            maximumFractionDigits: 2,
          }).format(parseFloat(balanceEther));
          const formattedTokenBalance = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2, // Display up to 3 decimal places
            maximumFractionDigits: 2,
          }).format(parseFloat(balanceToken));
          console.log(formattedBalance);
          setBalance("1");
          setBalanceToken(formattedTokenBalance);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getName();
  }, [wallet, tokenAddress]);

  return (
    <div key={index} className="p-2 shadow-md border-b border-b-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`flex h-2 w-2 rounded-full bg-green-500`} />
          <p className="font-semibold text-white">Wallet {index + 1}</p>
        </div>
      </div>
      <div className="text-sm flex flex-row w-full justify-between py-2">
        <div className="font-semibold">Address:</div>
        <div>{truncateEthAddress(address)}</div>
      </div>
      <div className="flex flex-row w-full justify-between items-center">
        <div className="text-sm">
          <div className="font-semibold">Token Amount:</div>
          <div>{balanceToken}</div>
        </div>
        <div className="text-sm">
          <div>
            <span className="font-semibold">ETH Amount:</span>
          </div>
          <div>{balance}</div>
        </div>
      </div>
    </div>
  );
};

export default WalletItem;
