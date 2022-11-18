import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { userContext } from "../../contexts/userContext";

export default function Logic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");


  const Navigate = useNavigate();
  const { getUserAndSet, user, loading } = useContext(userContext);

  useEffect(() => {
    if (!loading && user) Navigate("/");
  }, [loading]);

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const logIn = () => {
    API.post("/users/sessions", { username, password })
      .then(async (res) => {
        console.log("res: ", res);
        const { confirm, _id, token } = res.data;
        if (confirm) {
          Navigate("/codeverification", { state: { _id } });
          return;
        }

        localStorage.setItem("experienceToken", token);
        await getUserAndSet();
        Navigate("/");
      })
      .catch((err) => {
        console.log("err: ", err);
        const {message, additional} = err.response.data;
        setError(message);
        if(additional) setErrorField(additional);
      });
  };

  return { username, password, changeUsername, changePassword, logIn, error, errorField };
}
