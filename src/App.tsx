import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Bots from "./pages/Bots";
import BotPage from "./pages/BotPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black min-w-full text-white">
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bots" element={<Bots />} />
          <Route path="/bot/:userId/:tokenAddress" element={<BotPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
