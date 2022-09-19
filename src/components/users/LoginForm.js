import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../store/UsersStore";

const LoginForm = () => {
  const userCtx = useContext(UserContext);

  const submitLoginHandler = (event) => {
    event.preventDefault();
    userCtx.singIn();
  };

  return (
    <Form onSubmit={submitLoginHandler}>
      <Form.Group className="mt-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mt-3" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button className="mt-3" type="submit" variant="danger">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
