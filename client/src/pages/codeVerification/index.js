import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import LabelAndInputs from "../../components/LabelAndInput";
import Logo from "../../files/logo.png";
import API from "../../api";
import { userContext } from "../../contexts/userContext";

const typeText = "text";
const codePlaceHolder = "type the verification code";
const codeLabel = "Verification code";

export default function Index() {

  const [code, setCode] = useState("");
  const [id, setId] = useState("");
  const {state} = useLocation();
  const navigate = useNavigate();

  const { getUserAndSet } = useContext(userContext);

  useEffect(() => {
    if(!state) {
      navigate('/');
      return;
    }
    const {_id} = state;
    // if the _id does not exist do some
    setId(_id);
  })

  const changeCode = (e) => {
    setCode(e.target.value);
  };

  const verify = () => {
    API.post('/users/confirm', {candidate: code, _id: id})
    .then(async (res) => {
      localStorage.setItem('experienceToken', res.data.token);
      await getUserAndSet();
      navigate('/picandbio');
    })
    .catch((err) => {
      console.log('err: ', err);
    })
  };

  return (
    <div className="flex xl:items-center justify-center min-h-screen">
      <form
        className="lg:w-[550px] xl:h-fit bg-default xl:border-[0.7px] p-[30px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <img className="w-[300px] mx-auto" alt="logo" src={Logo} />
          <h2 className="text-center text-[20px] xl:text-[25px]">
            Verify your email (check your email)
          </h2>
        </div>
        <div className="xl:mt-4 mt-10">
          <LabelAndInputs
            type={typeText}
            value={code}
            onChange={changeCode}
            placeholder={codePlaceHolder}
            label={codeLabel}
          />
        </div>
        <Button
          className="mx-auto"
          font="text-[30px]"
          width="w-[250px] xl:w-[350px]"
          height="h-[50px]"
          label="Verify"
          onClick={verify}
        />
      </form>
    </div>
  );
}
