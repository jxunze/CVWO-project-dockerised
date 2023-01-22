import React, { useState } from "react";

const SignUp = (props) => {
  const [userInfo, setInfo] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (event) => {
    setInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signUp(userInfo);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //     <h1>Sign Up Form</h1>
    //     <label>Username :</label>
    //     <input name='username' value={userInfo['username']} onChange={handleChange}/>
    //     <label>Password :</label>
    //     <input name='password' type='password' value={userInfo['password']} onChange={handleChange}/>
    //     <label>First Name :</label>
    //     <input name='firstName' value={userInfo['firstname']} onChange={handleChange}/>
    //     <label>Last Name :</label>
    //     <input name='lastName'  value={userInfo['lastname']} onChange={handleChange}/>
    //     <input type='submit' value='Register'/>
    //     <h5> <a href="/login">Sign in</a></h5>
    // </form>

    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Username"
              name="username"
              value={userInfo["username"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>First name</label>
            <input
              className="form-control mt-1"
              placeholder="First name"
              name="firstName"
              value={userInfo["firstname"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last name</label>
            <input
              className="form-control mt-1"
              placeholder="Last name"
              name="lastName"
              value={userInfo["lastname"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              type="password"
              value={userInfo["password"]}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="auth-btn"
              disabled={
                !(
                  userInfo.username &&
                  userInfo.password &&
                  userInfo.firstName &&
                  userInfo.lastName
                )
              }
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            Already registered? <a href="/login">Sign in</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
