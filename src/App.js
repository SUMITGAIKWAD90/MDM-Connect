import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import PublicPage from "./Pages/Public";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Paymentpage from "./Pages/Paymentpage";
import Govdashboard from "./Pages/Govdashboard";
import Schooldashboard from "./Pages/Schooldashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/public" element={<PublicPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Paymentpage />} />
        <Route path="/gov-dashboard" element={<Govdashboard />} />
        <Route path="/school-dashboard" element={<Schooldashboard />} />
        <Route path="/login/school" element={<Schooldashboard />} />
      </Routes>
    </Router>
  );
}

export default App;