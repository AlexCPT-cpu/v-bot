import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { MAINNET_PROVIDER } from "../../config/config";

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
  const addBot = useCallback(async (inputData: ApiInput) => {
    try {
      const response = await axios.post(`/api/user/${2024}/add`, {
        data: { ...inputData },
      });

      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      process.env.NETWORK || "mainnet",
      MAINNET_PROVIDER
    );

    const senderWallet = new ethers.Wallet(privateKey, provider);

    const amountPerWallet = ethers.parseEther((totalAmount / 5).toString());

    try {
      for (let i = 0; i < wallets.length; ++i) {
        const walletAddress = wallets[i].address;

        console.log(
          `Sending ${ethers.formatEther(
            amountPerWallet
          )} ETH to ${walletAddress}...`
        );

        // Sending the transaction
        try {
          const tx = await senderWallet.sendTransaction({
            to: walletAddress,
            value: amountPerWallet,
          });

          console.log(`Transaction sent to ${walletAddress}: ${tx.hash}`);

          // Wait for the transaction to be mined
          const receipt = await tx.wait();
          console.log(`Transaction mined: ${receipt}`);
        } catch (txError) {
          console.error(`Error sending to ${walletAddress}:`, txError);
        }
      }
    } catch (generalError) {
      console.error(
        "General error occurred during the sending process:",
        generalError
      );
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormInputs) => {
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

      if (isPrivateKeyValid && isTokenValid && data.amount >= 0) {
        const wallets = createWallets(5);
        const privateKey = data.privateKey;
        const token = data.token;
        const amount = data.amount;
        const wallet1 = wallets[0].privateKey;
        const wallet2 = wallets[1].privateKey;
        const wallet3 = wallets[2].privateKey;
        const wallet4 = wallets[3].privateKey;
        const wallet5 = wallets[4].privateKey;

        // sendEtherToWallets(wallets, amount, privateKey);

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
        addBot(formData);
        console.log(formData, wallets);
        setTimeout(() => toast.success("Volume Bot Created"), 1500);

        // You can now process the data, like interacting with an API
      }
    } catch (error) {
      console.log(error);
      toast.error("error creating Bot");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Private Key Input */}
      <div>
        <Label htmlFor="privateKey">Private Key</Label>
        <Input
          id="privateKey"
          type="text"
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
          type="number"
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
