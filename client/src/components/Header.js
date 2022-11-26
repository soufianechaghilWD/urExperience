import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import Logo from "../files/logo.png";
import Button from "./Button";
import {  AiOutlineSearch } from "react-icons/ai";

export default function Header({ showButton }) {
  const Navigate = useNavigate();

  const { user } = useContext(userContext);
  const moveToAddEperiencePage = () => {
    Navigate("/addexperience");
  };

  return (
    <header className="lg:flex lg:h-[100px] lg:items-center mx-4">
      <img src={Logo} alt="logo" className="h-[50px]" />
      {/* the search field */}
      <div className="flex items-center max-w-md flex-1 border-[0.2px] bg-primary p-1">
        <input
          type="text"
          placeholder="Search for a company or a person"
          className="h-[50px] w-ful bg-primary flex-1 outline-0"
        />
        <AiOutlineSearch className="text-[25px]" />
      </div>
      {showButton && (
        <Button
          font="text-[30px]"
          label="Add Experience"
          onClick={moveToAddEperiencePage}
          width="w-[250px] xl:w-[350px]"
          height="h-[50px]"
          className="lg:mx-auto"
        />
      )}
      <div className="flex ml-4 items-center">
        {/* {user?.username} */}
        userusername
        <img
          className="h-[50px]"
          src={process.env.REACT_APP_BaseUrl + user?.profilePic}
          alt="profilePic"
        />
      </div>
    </header>
  );
}
