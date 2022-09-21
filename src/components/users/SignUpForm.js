import { useContext, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { UserContext } from "../../store/UsersStore";

const SignUpForm = () => {
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const userCtx = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    setSubmitted(true);

    const newUser = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      returnSecureToken: true,
      name: nameInput.current.value
    };
    userCtx.signUp(newUser);
  };

  return (
    <>
      {!userCtx.error && submitted && (
        <Alert variant="success">Your account created successfully!</Alert>
      )}
      {userCtx.error && submitted && (
        <Alert variant="danger">{userCtx.error}</Alert>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>First name:</Form.Label>
          <Form.Control type="text" placeholder="First name" ref={nameInput} />
          <Form.Text>Enter your first name!</Form.Text>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            ref={emailInput}
          />
          <Form.Text>Enter a valid email address!</Form.Text>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInput}
          />
          <Form.Text>Enter a strong password!</Form.Text>
        </Form.Group>
        <Button type="submit" variant="success">
          Register
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
