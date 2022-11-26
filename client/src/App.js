import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CodeVerification from "./pages/codeVerification";
import PicAndBio from "./pages/addPicAndBio";
import AddExperience from "./pages/addExperience";
import UserProvider from "./contexts/userContext";
import './App.css';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
          <div className="App lg:max-w-[1280px] xl:mx-auto">
            <Routes>
              <Route path="/addexperience" element={<AddExperience />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/codeverification" element={<CodeVerification />} />
              <Route path="/picandbio" element={<PicAndBio />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
