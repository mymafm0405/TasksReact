import { useState } from "react";
import { Nav } from "react-bootstrap";
import LoginForm from "./users/LoginForm";
import SignUpForm from "./users/SignUpForm";

const Welcome = () => {
  const [currentView, setCurrentView] = useState("login");

  const loginSelectHandler = () => {
    setCurrentView("login");
  };
  const signUpSelectHandler = () => {
    setCurrentView("signup");
  };
  return (
    <>
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link onClick={loginSelectHandler}>Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={signUpSelectHandler}>Sign up</Nav.Link>
        </Nav.Item>
      </Nav>
      {currentView === 'login' && <LoginForm />}
      {currentView === 'signup' && <SignUpForm />}
    </>
  );
};

export default Welcome;
