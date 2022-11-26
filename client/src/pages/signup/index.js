import { Link } from "react-router-dom";
import Button from "../../components/Button";
import LabelAndInputs from "../../components/LabelAndInput";
import Logo from "../../files/logo.png";
import Logic from "./logic";

const typeText = "text";
const typeEmail = "email";
const passwordLabel = "Password";

const emailPlaceHolder = "type a valid email";
const emailLabel = "Email";

const usernamePlaceHolder = "type a valid username";
const usernameLabel = "Username";

const typePassword = "password";
const passwordPlaceHolder = "type a valid password";

export default function Index() {
  const {
    username,
    email,
    password,
    changeEmail,
    changeUsername,
    changePassword,
    signUp,
    error,
    errorField
  } = Logic();

  return (
    <div className="flex xl:items-center justify-center min-h-screen">
      <form
        className="lg:w-[550px] xl:h-fit bg-default xl:border-[0.7px] p-[30px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <img className="w-[300px] mx-auto" alt="logo" src={Logo} />
          <h2 className="text-center text-[20px] xl:text-[25px] ">
            Sign up to share your experiences
          </h2>
        </div>
        <div className="xl:mt-4 mt-10">
          <LabelAndInputs
            type={typeEmail}
            value={email}
            onChange={changeEmail}
            placeholder={emailPlaceHolder}
            label={emailLabel}
            errorField={errorField}
            error={error}
          />
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
          className="mx-auto"
          font="text-[30px]"
          width="w-[250px] xl:w-[350px]"
          height="h-[50px]"
          label="Sign up"
          onClick={signUp}
          disabled={email === "" || username === "" || password === ""}
        />
        {error !== "" && <p className="text-center text-danger">{error}</p>}
        <span>
          If you have an account{" "}
          <Link to="/login" className="text-secondary underline">
            Login
          </Link>{" "}
        </span>
      </form>
    </div>
  );
}
