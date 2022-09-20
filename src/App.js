import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import AlertMessage from "./components/AlertMessage/AlertMessage";
import DetailUser from "./components/DetailUser/DetailUser";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import { verifyUserToken } from "./Redux/actions/actions";

function App() {
  const { loggedIn } = useSelector((state) => state.rootReducer.User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUserToken());
  }, [dispatch]);

  return (
    <>
      <Route exact path="/">
        {!loggedIn ? <LandingPage /> : <Redirect to="/home" />}
      </Route>
      <Route path="/logIn">
        {!loggedIn ? <LogIn /> : <Redirect to="/home" />}
      </Route>
      <Route path="/signUp">
        {!loggedIn ? <SignUp /> : <Redirect to="/home" />}
      </Route>
      <Route path="/home">
        {loggedIn ? <Home /> : <Redirect to="/signUp" />}
      </Route>
      <Route path="/detail">
        {loggedIn ? <DetailUser /> : <Redirect to="/signUp" />}
      </Route>
      <AlertMessage />
    </>
  );
}

export default App;
