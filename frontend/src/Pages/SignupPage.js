import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar.js";
import SignUp from "../components/loginpage/SignUp";

const SignupPage = () => {
  const navigate = useNavigate();
  const [userInfo, setInfo] = useState({
    user: {},
    error: "",
  });

  useEffect(() => {
    console.log("hit");
    let token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            setInfo({
              ...userInfo,
              user: result,
            });
          }
        });
    }
  }, []);

  const signUp = (user) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
          first_name: user.firstName,
          last_name: user.lastName,
        },
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        setInfo({ ...userInfo, user: user });
        navigate("/home");
      });
  };

  return (
    <div className="App">
      <Navbar user={localStorage.getItem("username")} />
      <SignUp signUp={signUp} />
    </div>
  );
};

export default SignupPage;
