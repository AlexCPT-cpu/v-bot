import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";

interface FormInputs {
  privateKey: string;
  token: string;
  amount: number; // New amount field
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

const EditForm: React.FC<{ onError: (state: boolean) => void }> = ({
  onError,
}) => {
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
      console.log("Form data is valid", data);
      toast.success("Volume Bot Created");
      // You can now process the data, like interacting with an API
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Private Key Input */}
      <div>
        <Label htmlFor="privateKey">Private Key</Label>
        <Input
          autoComplete="off"
          id="privateKey"
          type="text"
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

export default EditForm;
