import React, { useState } from "react";

const SignIn = (props) => {
  const [userInfo, setInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signIn(userInfo);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              name="username"
              value={userInfo["username"]}
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1 mb-2"
              placeholder="Enter password"
              name="password"
              value={userInfo["password"]}
              onChange={handleChange}
            />
          </div>
          {props.error ? <p style={{ color: "red" }}>{props.error}</p> : null}
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="auth-btn"
              disabled={!(userInfo.username && userInfo.password)}
            >
              Submit
            </button>
          </div>
          <p className="register text-center mt-2">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
