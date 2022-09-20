import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Sign_Up } from "../../Redux/actions/actions";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import "./SignUp.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const [ShowPassword, setShowPassword] = useState(false);

  const [SignUpInput, setSignUpInput] = useState({
    mail: "",
    password: "",
  });

  const [ErrorSignUpInput, setErrorSignUpInput] = useState("");

  const HandleChange = ({ target: { name, value } }) => {
    setSignUpInput({ ...SignUpInput, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!SignUpInput.mail || !SignUpInput.password) {
      setErrorSignUpInput("Email and password are both required");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(SignUpInput.mail)) {
      setErrorSignUpInput("Email format is incorrect");
    } else {
      dispatch(Sign_Up(SignUpInput));
      setErrorSignUpInput("");
    }
  };

  return (
    <div className="container_signUp">
      <form onSubmit={HandleSubmit} className="container_form_signUp">
        <h1 id="signUp_title">Sign Up with your Email</h1>
        <span className="acount_message">
          You need an Acount?
          <Link id="signUp_link" to="/logIn">
            Log In
          </Link>
        </span>
        <div className="container_single_input">
          <input
            className="inputs"
            onChange={HandleChange}
            type="text"
            name="mail"
            value={SignUpInput.mail}
            id="mail2"
            placeholder=" "
          />
          <label className="labels" htmlFor="mail2">
            Email
          </label>
        </div>
        <div className="container_single_input">
          <input
            className="inputs"
            onChange={HandleChange}
            type={!ShowPassword ? "password" : "text"}
            name="password"
            value={SignUpInput.password}
            id="password2"
            placeholder=" "
          />
          <label className="labels" htmlFor="password2">
            Password
          </label>
          {!ShowPassword ? (
            <AiFillEyeInvisible
              className="show_password_btn"
              onClick={() => setShowPassword(!ShowPassword)}
            />
          ) : (
            <AiFillEye
              className="show_password_btn"
              onClick={() => setShowPassword(!ShowPassword)}
            />
          )}
        </div>

        <span className="error_label_img_form">{ErrorSignUpInput}</span>
        <button className="signUp_btn">Sign Up</button>
      </form>
    </div>
  );
}
