import { Link } from "react-router-dom";

function TransactionList() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your Transactions</h1>
        {/* List Transactions Here */}
        <ul className="list-disc text-left">
          <li>Transaction 1: TokenA -&gt; TokenB</li>
          <li>Transaction 2: TokenA -&gt; TokenB</li>
        </ul>
        <Link to="/">
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TransactionList;
