import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="container_landingPage">
      <Link to="/logIn">
        <div className="button_logIn">Log In</div>
      </Link>
      <Link to="/signUp">
        <div className="button_signUp">Sign Up</div>
      </Link>
      <Link to="/home">
        <button className="getStated_btn">GET STATED</button>
      </Link>
    </div>
  );
}
