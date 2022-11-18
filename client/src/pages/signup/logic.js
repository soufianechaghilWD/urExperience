import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api";
import { userContext } from "../../contexts/userContext";

export default function Logic() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");

  const Navigate = useNavigate();
  const { user, loading } = useContext(userContext);

  useEffect(() => {
    if (!loading && user) Navigate("/");
  }, [loading]);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const signUp = () => {
    Api.post("/users", { email, username, password })
      .then((res) => {
        const { done, _id } = res.data;
        if (done) {
          // move to confirmation page and pass the user_id
          Navigate("/codeverification", { state: { _id } });
        }
      })
      .catch((err) => {
        console.log("err: ", err);
        const {message, additional} = err.response.data;
        setError(message);
        if(additional) setErrorField(additional);
      });
  };

  return {
    email,
    username,
    password,
    error,
    changeEmail,
    changeUsername,
    changePassword,
    signUp,
    errorField
  };
}
