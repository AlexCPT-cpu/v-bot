import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PrivateKey() {
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (privateKey) {
      // Add private key validation if needed
      navigate("/liquidity"); // Navigate to liquidity input page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full transiton-all duration-150">
      <div className="w-full max-w-md p-6 border border-gray-600 rounded-lg shadow-lg mx-4">
        <h2 className="text-2xl font-bold mb-4">Enter Private Key</h2>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg mb-4"
          placeholder="Private Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default PrivateKey;
