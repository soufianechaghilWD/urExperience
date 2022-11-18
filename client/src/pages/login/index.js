import { Link } from "react-router-dom";
import Button from "../../components/Button";
import LabelAndInputs from "../../components/LabelAndInput";
import Logo from "../../files/logo.png";
import Logic from "./logic";

const typeText = "text";
const passwordLabel = "Password";

const usernamePlaceHolder = "type your username";
const usernameLabel = "Username";

const typePassword = "password";
const passwordPlaceHolder = "type your password";

export default function Index() {
  const { username, password, changeUsername, changePassword, logIn, error, errorField } =
    Logic();

  return (
    <div className="flex xl:items-center justify-center min-h-screen">
      <form
        className="lg:w-[550px] xl:h-fit bg-default xl:border-[0.7px] p-[30px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <img className="w-[300px] mx-auto" alt="logo" src={Logo} />
          <h2 className="text-center text-[20px] xl:text-[25px] ">
            Log in to share your experiences
          </h2>
        </div>
        <div className="xl:mt-4 mt-10">
          <LabelAndInputs
            type={typeText}
            value={username}
            onChange={changeUsername}
            placeholder={usernamePlaceHolder}
            label={usernameLabel}
            errorField={errorField}
            error={error}
          />
          <LabelAndInputs
            type={typePassword}
            value={password}
            onChange={changePassword}
            placeholder={passwordPlaceHolder}
            label={passwordLabel}
            errorField={errorField}
            error={error}
          />
        </div>
        <Button
          font="text-[30px]"
          width="w-[250px] xl:w-[350px]"
          height="h-[50px]"
          label="Log in"
          onClick={logIn}
        />
        {error !== "" && <p className="text-center text-danger">{error}</p>}
        <span>
          If you don't have an account{" "}
          <Link to="/signup" className="text-secondary underline">
            Signup
          </Link>{" "}
        </span>
      </form>
    </div>
  );
}
