import { useContext, useRef } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { UserContext } from "../../store/UsersStore";

const LoginForm = () => {
  const userCtx = useContext(UserContext);
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitLoginHandler = (event) => {
    event.preventDefault();
    const user = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      returnSecureToken: true,
    };
    userCtx.singIn(user);
  };

  return (
    <Form onSubmit={submitLoginHandler}>
      <Form.Group className="mt-3" controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email address"
          ref={emailInput}
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordInput}
        />
      </Form.Group>
      <Button className="mt-3" type="submit" variant="danger">
        Login
      </Button>
      {userCtx.loading && <Alert variant="warning">Please wait...</Alert>}
      {userCtx.error && !userCtx.loading && <Alert variant="danger">{userCtx.error}</Alert>}
    </Form>
  );
};

export default LoginForm;
