import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Guidelines from "../components/Guidelines";
import Headermain from "../components/Headermain";
import News from "../components/News";
import Paymentpage from "./Paymentpage";


const main = () => {
  return (
    <div className="min-h-screen">
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