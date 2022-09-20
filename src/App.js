import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllTasks from "./components/tasks/AllTasks";
import NewTaskForm from "./components/tasks/NewTaskForm";
import { UserContext } from "./store/UsersStore";
import User from "./components/users/User";
import Welcome from "./components/Welcome";

const App = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <h1>Welcome to my Tasks App</h1>
          </Col>
          <Col>{userCtx.isLoggedIn && <User />}</Col>
        </Row>
        <Row>
          {userCtx.isLoggedIn && (
            <Col>
              <NewTaskForm />
              <AllTasks />
            </Col>
          )}

          {!userCtx.isLoggedIn && <Welcome />}
        </Row>
      </Container>
    </>
  );
};

export default App;
