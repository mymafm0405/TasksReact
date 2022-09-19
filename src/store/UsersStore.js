import React, { useState } from "react";

export const UserContext = React.createContext({
  isLoggedIn: false,
  singIn: () => {},
  signOut: () => {},
});

const UserContextProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState();

  const signInHandler = () => {
    setLoginStatus(true);
  };

  const signOutHandler = () => {
    setLoginStatus(false);
  };

  const ctxValue = {
    isLoggedIn: loginStatus,
    singIn: signInHandler,
    signOut: signOutHandler,
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
