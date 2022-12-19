import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import Homescreen from "./screens/Homescreen";
import Profilescreen from "./screens/Profilescreen";

function Nav() {
  const [show, handleShow] = useState(false);

  const navigate = useNavigate;

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={
            <Homescreen />
          } /* Needs to change to a function after fixing React Router dom */
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt=""
        />

        <img
          onClick={
            <Profilescreen />
          } /* Needs to change to a function after fixing React Router dom */
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
