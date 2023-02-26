import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import HomePage from "./Home/HomePage";
import LoginPage from "./Login/Login";
import RegisterPage from "./Login/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/dashboard/:email" element={<DashBoard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
