import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LiquidityInput() {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    // Simulate loading and transaction processing
    setTimeout(() => {
      setLoading(false);
      navigate("/transactions"); // Navigate to transaction list page
    }, 3000); // Simulate 3s loading
  };

  return (
    <div className="flex items-center justify-center minh-screen ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Enter Token and Amount</h2>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            placeholder="Token A Address"
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            placeholder="Token B Address"
            value={tokenB}
            onChange={(e) => setTokenB(e.target.value)}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            placeholder="Amount A"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            placeholder="Amount B"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default LiquidityInput;
