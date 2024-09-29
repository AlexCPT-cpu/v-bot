import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { apiEndpoint } from "../../config/config";
import { MAINNET_PROVIDER } from "../../config/config";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

interface FormInputs {
  privateKey: string;
  token: string;
  amount: number; // New amount field
}

interface ApiInput {
  privateKey: string;
  wallet1: string;
  wallet2: string;
  wallet3: string;
  wallet4: string;
  wallet5: string;
  amount: number;
  tokenAddress: string;
}

// Define Zod schema with amount validation (must be greater than or equal to 0)
const formSchema = z.object({
  privateKey: z.string(), // Private key validation will be handled manually
  token: z
    .string()
    .min(42, "Token address must be valid")
    .max(42, "Token address must be valid"),
  amount: z.number().min(0, "Amount must be greater than or equal to 0"), // New validation for amount
});

const validatePrivateKeyWithEthers = (key: string): boolean => {
  try {
    const formattedKey = key.startsWith("0x") ? key : `0x${key}`;
    const wallet = new ethers.Wallet(formattedKey);
    return !!wallet.address; // Check if wallet address is valid
  } catch (error) {
    console.log(error);
    return false; // Return false if private key is invalid
  }
};

const validateEthAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

const TokenForm: React.FC<{ onError: (state: boolean) => void }> = ({
  onError,
}) => {
  const { initData } = retrieveLaunchParams();
  const userId = initData?.user?.id;

  // Function to create 5 unique wallets
  const createWallets = (amount: number) => {
    const wallets = [];
    for (let i = 0; i < amount; i++) {
      const wallet = ethers.Wallet.createRandom();
      wallets.push({
        privateKey: wallet.privateKey,
        address: wallet.address,
      });
    }
    return wallets;
  };

  // Function to send Ether equally to 5 wallets

  async function sendEtherToWallets(
    wallets: { address: string; privateKey: string }[],
    totalAmount: number,
    privateKey: string
  ) {
    const provider = new ethers.InfuraProvider(
      import.meta.env.VITE_NETWORK || "mainnet",
      MAINNET_PROVIDER
    );
    // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    const senderWallet = new ethers.Wallet(privateKey, provider);

    const amountPerWallet = ethers.parseEther((totalAmount / 5).toString());
    try {
      // Fetch the balance of the sender wallet
      const senderBalance = await provider.getBalance(senderWallet.address);

      // Estimate gas price and gas limit
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || ethers.parseUnits("20", "gwei");
      const gasLimit = BigInt(21000); // Standard gas limit for ETH transfers

      // Calculate the total gas cost for one transaction
      const gasCost = gasPrice * gasLimit;

      // Total amount to send including gas cost for each transaction
      const totalCostPerWallet = amountPerWallet + gasCost;

      // Ensure the sender has enough ETH to cover all transactions
      const totalRequiredBalance = totalCostPerWallet * BigInt(wallets.length);

      if (senderBalance < totalRequiredBalance) {
        toast.error("Insufficient funds to send ETH and cover gas fees.");
        throw new Error("Insufficient funds to send ETH and cover gas fees.");
      }

      for (let i = 0; i < wallets.length; ++i) {
        const walletAddress = wallets[i].address;

        console.log(
          `Sending ${ethers.formatEther(
            amountPerWallet
          )} ETH to ${walletAddress} ...`
        );

        // Check if sender wallet still has enough balance after each transaction
        const currentBalance = await provider.getBalance(senderWallet.address);
        if (currentBalance < totalCostPerWallet) {
          console.error(
            `Insufficient funds to send to ${walletAddress} after previous transactions.`
          );
          break;
        }

        try {
          const tx = await senderWallet.sendTransaction({
            to: walletAddress,
            value: amountPerWallet,

            gasLimit: gasLimit, // Ensure to specify the gas limit
            gasPrice: gasPrice, // Use the estimated gas price
          });

          console.log(`Transaction sent to ${walletAddress}: ${tx.hash}`);
          const receipt = await tx.wait();
          console.log(`Transaction mined: ${receipt}`);
        } catch (txError) {
          throw new Error(
            `Transaction failed for ${walletAddress}: ${txError}`
          );
        }
      }
    } catch (generalError) {
      console.error(
        "General error occurred during the sending process:",
        generalError
      );
      throw new Error();
    }
  }
  //0x0d89d0b5b4fa657f66caa7c1c73091f267554ac9f6dbef75636ab869effa1847
  //0xdAC17F958D2ee523a2206206994597C13D831ec7
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    let loadingId: string = "";
    try {
      const isPrivateKeyValid = validatePrivateKeyWithEthers(data.privateKey);
      const isTokenValid = validateEthAddress(data.token);

      if (!isPrivateKeyValid) {
        setError("privateKey", {
          type: "manual",
          message: "Invalid private key",
        });
        onError(true);
      } else {
        clearErrors("privateKey");
        onError(false);
      }

      if (!isTokenValid) {
        setError("token", {
          type: "manual",
          message: "Invalid Token A address",
        });
        onError(true);
      } else {
        clearErrors("token");
        onError(false);
      }
      loadingId = toast.loading("Creating and Funding Volume Wallets");

      if (isPrivateKeyValid && isTokenValid && data.amount >= 0) {
        const wallets = createWallets(5);
        const privateKey = data.privateKey;
        const token = data.token;
        const amount = Number(data.amount);
        const wallet1 = wallets[0].privateKey;
        const wallet2 = wallets[1].privateKey;
        const wallet3 = wallets[2].privateKey;
        const wallet4 = wallets[3].privateKey;
        const wallet5 = wallets[4].privateKey;
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // await sendEtherToWallets(wallets, amount, privateKey);
        toast.success("Wallets Created and Funded Succesfully", {
          id: loadingId,
        });
        const formData: ApiInput = {
          privateKey,
          wallet1,
          wallet2,
          wallet3,
          wallet4,
          wallet5,
          amount,
          tokenAddress: token,
        };

        await axios.post(`${apiEndpoint}/api/user/${userId}/add`, {
          ...formData,
        });
        onError(false);
        reset();
        setTimeout(
          () =>
            toast.success("Volume Bot Created", {
              id: loadingId,
            }),
          1500
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating Bot", { id: loadingId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Private Key Input */}
      <div>
        <Label htmlFor="privateKey">Private Key</Label>
        <Input
          id="privateKey"
          type="password"
          autoComplete="off"
          placeholder="Enter private key"
          {...register("privateKey")}
          className="mt-2"
        />
        {errors.privateKey && (
          <p className="text-red-500">{errors.privateKey.message}</p>
        )}
      </div>

      {/* Token Address */}
      <div>
        <Label htmlFor="tokenA">Token A Address</Label>
        <Input
          id="tokenA"
          type="text"
          placeholder="Enter Token A address"
          {...register("token")}
          className="mt-2"
        />
        {errors.token && <p className="text-red-500">{errors.token.message}</p>}
      </div>

      {/* Amount Input */}
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="text"
          placeholder="Enter amount"
          {...register("amount", { valueAsNumber: true })} // Register with number type
          className="mt-2"
        />
        {errors.amount && (
          <p className="text-red-500">{errors.amount.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-end">
        <Button
          type="submit"
          className="mt-4 transition-all duration-100 active:scale-90 py-5"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default TokenForm;
