import React, { useContext, useState } from "react";
import useHttp from "../hooks/use-http";
import { TasksContext } from "./TasksStore";

export const UserContext = React.createContext({
  isLoggedIn: false,
  singIn: () => {},
  signOut: () => {},
  signUp: (user) => {},
  loading: false,
  error: null,
  autoSignIn: () => {},
  displayName: ''
});

const UserContextProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [myDisplayName, setMyDisplayName] = useState('');
  const { sendRequest, loading, error } = useHttp();
  const tasksCtx = useContext(TasksContext);
  const API = "AIzaSyAjYv8rt5pls968HbuIlMTjkp-Sbs0BwzQ";

  const signInHandler = (user) => {
    const applyData = (data) => {
      localStorage.setItem("myToken", data.idToken);
      localStorage.setItem("localId", data.localId);
      setLoginStatus(true);
      setMyDisplayName(data.displayName)
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
    localStorage.removeItem("localId");
    tasksCtx.clearTasks();
  };

  const signUpHandler = (user) => {
    const applyData = (data) => {
      localStorage.setItem("myToken", data.idToken);
      localStorage.setItem("localId", data.localId);
      sendRequest({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          idToken: data.idToken,
          displayName: user.name,
          photoUrl: "",
          deleteAttribute: [],
          returnSecureToken: false,
        },
      });
      setMyDisplayName(user.name)
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
    displayName: myDisplayName
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
