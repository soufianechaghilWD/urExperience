import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import LabelAndInputs from "../../components/LabelAndInput";
import Logo from "../../files/logo.png";
import User from "../../files/user.png";

const typeText = "text";
const bioPlaceHolder = "type your bio";
const bioLabel = "Bio";

export default function Index() {
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState("");

  const changeBio = (e) => {
    setBio(e.target.value);
  };

  const uploadPhoto = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = function (ev) {
        setFileUri(ev.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const setData = () => {
    console.log("setting the data");
  };


  return (
    <div className="flex justify-center flex-col mx-4 xl:mx-0">
      <div>
        <img className="w-[300px] xl:w-[350px] mx-auto" alt="logo" src={Logo} />
        <h2 className="text-center text-[20px] xl:text-[25px]">Add picture profile and bio</h2>
      </div>
      <div className="flex justify-center flex-col">
        <img className="w-[275px] h-[275px] mx-auto" alt="user" src={file === null ? User : fileUri} />
        <input onChange={uploadPhoto} type="file" className="mx-auto mt-2" />
      </div>
      <div className=" mt-4 flex justify-center flex-col xl:mx-auto xl:w-[400px]">
        <LabelAndInputs
          type={typeText}
          value={bio}
          onChange={changeBio}
          placeholder={bioPlaceHolder}
          label={bioLabel}
        />
      </div>
      <Button
        font="text-[30px]"
        width="w-[250px] xl:w-[350px]"
        height="h-[50px]"
        label="Set"
        onClick={setData}
      />
      <div className="xl:mx-auto xl:w-[400px] flex justify-end">
        <Link to="/" className="text-secondary underline text-[30px]">Skip</Link>
      </div>
    </div>
  );
}
