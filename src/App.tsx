import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivateKey from "./pages/PrivateKey";
import LiquidityInput from "./pages/LiquidityInput";
import TransactionList from "./pages/TransactionList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black min-w-full text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/private-key" element={<PrivateKey />} />
          <Route path="/liquidity" element={<LiquidityInput />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
