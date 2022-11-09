import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>      
    </BrowserRouter>
  );
}

export default App;
