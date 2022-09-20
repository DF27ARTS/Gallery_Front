import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserInscription } from "../../Redux/actions/actions";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./LogIn.css";

const ErrorValidations = (input) => {
  let error = {};
  if (!input.name) error.name = "Name is required";
  if (!input.lastName) error.lastName = "Last name is required";
  if (!input.age) error.age = "Age is required";
  if (!input.gender) error.gender = "Gender is required";
  if (!input.password) error.password = "Password is required";
  if (!input.mail) error.mail = "Email is required";
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(input.mail))
    error.mail = "Email format is incorrect";
  return error;
};

export default function LogIn() {
  const dispatch = useDispatch();
  const [ShowPassword, setShowPassword] = useState(false);
  const [Image, setImage] = useState(null);
  const [ImageLoaded, setImageLoaded] = useState(false);

  const [LogInIput, setLogInIput] = useState({
    name: "",
    lastName: "",
    age: null,
    mail: "",
    gender: "",
    password: "",
  });

  const [Error, setError] = useState({
    name: "",
    lastName: "",
    age: null,
    mail: "",
    gender: "",
    password: "",
  });
  const [ErrorActive, setErrorActive] = useState(false);

  const HandleChangeImage = ({ target: { files } }) => {
    setImage(files[0]);
    setImageLoaded(true);
  };

  const HandleChange = ({ target: { name, value } }) => {
    setLogInIput({ ...LogInIput, [name]: value });
    setError(ErrorValidations({ ...LogInIput, [name]: value }));
  };

  const HandleSubmmit = (e) => {
    e.preventDefault();
    if (
      Error.name ||
      Error.lastName ||
      Error.age ||
      Error.mail ||
      Error.gender ||
      Error.password
    ) {
      setErrorActive(true);
    } else {
      const formData = new FormData();
      formData.append("image", Image);

      const Object = {
        userImage: formData,
        userInfomation: LogInIput,
      };

      dispatch(UserInscription(Object));
    }
  };

  return (
    <div className="container_logIn">
      <form onSubmit={HandleSubmmit} className="container_form">
        <h1 id="signUp_title">Create an Acount</h1>
        <span className="acount_message">
          You have an acount already?
          <Link id="signUp_link" to="/signUp">
            Sign Up
          </Link>
        </span>
        <input
          id="inputFile"
          onChange={(e) => HandleChangeImage(e)}
          type="file"
        />
        <label
          className={
            ImageLoaded
              ? "upload_image_logIn upload_image_selected"
              : "upload_image_logIn"
          }
          htmlFor="inputFile"
        >
          Upload Image
        </label>
        <div className="container_single_input">
          <input
            className="inputs"
            onChange={(e) => HandleChange(e)}
            type="text"
            name="name"
            value={LogInIput.name}
            id="name"
            placeholder=" "
          />
          <label className="labels" htmlFor="name">
            Name
          </label>
        </div>
        {Error.name && ErrorActive ? (
          <span className="error_span_logIn">{Error.name}</span>
        ) : null}

        <div className="container_single_input">
          <input
            className="inputs"
            onChange={(e) => HandleChange(e)}
            type="text"
            name="lastName"
            value={LogInIput.lastName}
            id="lastName"
            placeholder=" "
          />
          <label className="labels" htmlFor="lastName">
            Lastname
          </label>
        </div>
        {Error.lastName && ErrorActive ? (
          <span className="error_span_logIn">{Error.lastName}</span>
        ) : null}

        <div className="container_single_input">
          <input
            className="inputs"
            onChange={(e) => HandleChange(e)}
            type="number"
            name="age"
            value={LogInIput.age}
            id="age"
            placeholder=" "
          />
          <label className="labels" htmlFor="age">
            Age
          </label>
        </div>
        {Error.age && ErrorActive ? (
          <span className="error_span_logIn">{Error.age}</span>
        ) : null}

        <div className="container_single_input">
          <input
            className="inputs"
            onChange={(e) => HandleChange(e)}
            type="text"
            name="mail"
            value={LogInIput.mail}
            id="mail"
            placeholder=" "
          />
          <label className="labels" htmlFor="mail">
            Mail
          </label>
        </div>
        {Error.mail && ErrorActive ? (
          <span className="error_span_logIn">{Error.mail}</span>
        ) : null}

        <div className="container_single_input">
          <select
            onChange={(e) => HandleChange(e)}
            className="select"
            name="gender"
          >
            <option value="">Chose a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {Error.gender && ErrorActive ? (
          <span className="error_span_logIn">{Error.gender}</span>
        ) : null}

        <div className="container_single_input">
          <input
            className="inputs"
            onChange={(e) => HandleChange(e)}
            type={!ShowPassword ? "password" : "text"}
            name="password"
            value={LogInIput.password}
            id="password"
            placeholder=" "
          />
          <label className="labels" htmlFor="password">
            Password
          </label>
          {!ShowPassword ? (
            <AiFillEye
              className="show_password_btn"
              onClick={() => setShowPassword(!ShowPassword)}
            />
          ) : (
            <AiFillEyeInvisible
              className="show_password_btn"
              onClick={() => setShowPassword(!ShowPassword)}
            />
          )}
        </div>
        {Error.password && ErrorActive ? (
          <span className="error_span_logIn">{Error.password}</span>
        ) : null}

        <button className="logIn_btn">Log In</button>
      </form>
    </div>
  );
}
