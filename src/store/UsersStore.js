import React, { useState } from "react";
import useHttp from "../hooks/use-http";

export const UserContext = React.createContext({
  isLoggedIn: false,
  singIn: () => {},
  signOut: () => {},
  signUp: (user) => {},
  loading: false,
  error: null,
  autoSignIn: () => {},
});

const UserContextProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState();
  const { sendRequest, loading, error } = useHttp();
  const API = "AIzaSyAjYv8rt5pls968HbuIlMTjkp-Sbs0BwzQ";

  const signInHandler = (user) => {
    console.log(user);
    const applyData = (data) => {
      localStorage.setItem("myToken", data.idToken);
      setLoginStatus(true);
    };
    sendRequest(
      {
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      },
      applyData
    );
  };

  const autoSignInHandler = () => {
    setLoginStatus(true);
  };

  const signOutHandler = () => {
    setLoginStatus(false);
    localStorage.removeItem("myToken");
  };

  const signUpHandler = (user) => {
    console.log(user);
    const applyData = (data) => {
      localStorage.setItem("myToken", data.idToken);
    };
    sendRequest(
      {
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      },
      applyData
    );
  };

  const ctxValue = {
    isLoggedIn: loginStatus,
    singIn: signInHandler,
    signOut: signOutHandler,
    signUp: signUpHandler,
    loading: loading,
    error: error,
    autoSignIn: autoSignInHandler,
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
