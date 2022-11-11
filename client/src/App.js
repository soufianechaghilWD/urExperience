import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CodeVerification from "./pages/codeVerification";
import PicAndBio from "./pages/addPicAndBio";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App lg:max-w-[1280px] xl:mx-auto">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/codeverification" element={<CodeVerification />} />
          <Route path="/picandbio" element={<PicAndBio />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
