import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Paymentpage from "./Paymentpage";
import Guidelines from "../components/Guidelines";
import News from "../components/News";


const Public = () => {
  return (
    <div className="min-h-screen">
      <Header></Header>

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

export default Public;
