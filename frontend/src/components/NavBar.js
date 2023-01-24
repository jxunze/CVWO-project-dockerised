import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar(prop) {
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="nav-menu">
          <a href="/home" className="app-title">
            Chatbox
          </a>
          <div className="nav-elements">
            <a href="/home" className="nav-elements">
              Home
            </a>
          </div>
        </div>
        {prop.user ? (
          <div className="nav-elements">
            <button onClick={LogOut} className="profile-menu">
              LogOut
            </button>
          </div>
        ) : (
          <div className="profile-menu">You are not signed in.</div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
