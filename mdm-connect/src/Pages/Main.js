import { Routes, Route } from "react-router-dom";
import Headermain from "../components/Headermain";
import Footer from "../components/Footer";
import Paymentpage from "./Paymentpage";
import Guidelines from "../components/Guidelines";
import News from "../components/News";


const main = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50">
      <Headermain />

        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/payment" element={<Paymentpage />} />
        </Routes>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Guidelines />
      </main>

      <Footer />
    </div>
  );
};

export default main;
