import React from "react";
import { useParams } from "react-router-dom";

const BotPage = () => {
  // Extract dynamic parameters
  const { userId, tokenAddress } = useParams<{
    userId: string;
    tokenAddress: string;
  }>();

  return (
    <div>
      <h1>User Profile and Token Details</h1>
      {/* Display the dynamic userId and tokenAddress */}
      <p>User ID: {userId}</p>
      <p>Token Address: {tokenAddress}</p>
    </div>
  );
};

export default BotPage;
