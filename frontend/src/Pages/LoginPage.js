import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar.js";
import SignIn from "../components/loginpage/SignIn";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userInfo, setInfo] = useState({
    user: {},
    error: "",
  });

  const signIn = (user) => {
    fetch("http://localhost:3000/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", result.username);
          localStorage.setItem("user_id", result.user_id);
          setInfo({
            ...userInfo,
            user: result.user,
          });
          navigate("/home");
        } else {
          setInfo({
            ...userInfo,
            error: result.error,
          });
        }
      });
  };

  return (
    <div className="App">
      <Navbar user={localStorage.getItem("username")} />
      <SignIn signIn={signIn} error={userInfo["error"]} />
    </div>
  );
};

export default LoginPage;
