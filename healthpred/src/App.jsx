import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login";
import Dashboard from "./healthData/Dashboard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header>
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Health Risk Prediction App</h1>
      </header>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300 mb-3"
        onClick={() => navigate("/Register")} 
      >
        Register
      </button>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
      onClick={() => navigate("/Login")}  
      >
        Login
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

