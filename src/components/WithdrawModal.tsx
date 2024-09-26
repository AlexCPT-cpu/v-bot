import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { DialogClose } from "./ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndpoint, MAINNET_PROVIDER } from "../../config/config";
import { ethers } from "ethers";
import { ERC20_ABI } from "../../config/config";

export function WithdrawModal({
  username,
  index,
  wallets,
  privateKey,
  tokenAddress,
}: {
  wallets: string[];
  privateKey: string;
  username: string;
  index: string;
  tokenAddress: string;
}) {
  // Function to send all tokens from wallets to the main wallet
  async function sendTokensAndEthBack(
    walletsArray: string[],
    tokenAddress: string,
    privateKey: string
  ) {
    const provider = new ethers.InfuraProvider(
      import.meta.env.VITE_NETWORK || "mainnet",
      MAINNET_PROVIDER
    );
    // Main wallet - where all tokens and ETH will be sent
    const mainWallet = new ethers.Wallet(privateKey, provider);

    // ERC20 contract instance for token transfers
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider
    );

    // Loop through each wallet and transfer tokens and ETH
    for (const walletData of walletsArray) {
      const wallet = new ethers.Wallet(walletData, provider);

      // Transfer tokens from wallet to mainWallet
      try {
        const tokenBalance = await tokenContract.balanceOf(wallet.address);
        if (tokenBalance > 0) {
          console.log(
            `Transferring ${ethers.formatUnits(tokenBalance, 18)} tokens from ${
              wallet.address
            } to ${mainWallet.address}`
          );

          const tokenTx = await tokenContract
            .connect(wallet)
            //@ts-expect-error bet
            .transfer(mainWallet.address, tokenBalance);
          await tokenTx.wait();
          console.log(
            `Token transfer from ${wallet.address} successful: ${tokenTx.hash}`
          );
        }
      } catch (error) {
        console.log(`Error transferring tokens from ${wallet.address}:`, error);
        throw new Error();
      }

      // Transfer ETH from wallet to mainWallet
      try {
        const ethBalance = await provider.getBalance(wallet.address);
        const gasLimit = BigInt("21000"); // Basic gas limit for sending ETH
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice;
        //@ts-expect-error expected
        const gasCost = gasLimit * gasPrice;

        // Ensure there is enough balance to cover gas
        if (ethBalance > gasCost) {
          const ethAmountToSend = ethBalance - gasCost; // Subtract gas cost to avoid running out of gas

          console.log(
            `Transferring ${ethers.formatEther(ethAmountToSend)} ETH from ${
              wallet.address
            } to ${mainWallet.address}`
          );

          const ethTx = await wallet.sendTransaction({
            to: mainWallet.address,
            value: ethAmountToSend,
            gasLimit,
            gasPrice,
          });

          await ethTx.wait();
          console.log(
            `ETH transfer from ${wallet.address} successful: ${ethTx.hash}`
          );
        }
      } catch (error) {
        console.log(`Error transferring ETH from ${wallet.address}:`, error);
        throw new Error();
      }
    }
  }
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      await sendTokensAndEthBack(wallets, tokenAddress, privateKey);
      await axios.delete(`${apiEndpoint}/api/user/${username}/delete/${index}`);
      setTimeout(
        () =>
          toast.success("All funds and tokens sent to imported private key"),
        1500
      );
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.log(error);
      toast.error("error removing funds and deleting bot");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="transition-all duration-100 active:scale-90 border-none active:border-none focus:border-none focus:ring-0 active:ring-0 focus-visible:ring-0 bg-white"
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Withdraw & Stop
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] rounded-2xl bg-black border border-white text-white">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              Confirm Withdrawal of all funds to the imported private key,
              Stopping the bot process and delete it <br />
              <br />
              <span className="italic">
                note: make sure you have the private key imported in your
                ethereum wallet to recover the withdrawn funds
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full justify-between flex-row items-center mt-8 space-x-36">
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Close
              </Button>
            </DialogClose>

            <Button
              onClick={() => submitForm()}
              className="transition-all duration-100 active:scale-90 py-5"
              variant="default"
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
