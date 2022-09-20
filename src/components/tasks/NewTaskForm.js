import { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { TasksContext } from "../../store/TasksStore";

const NewTaskForm = () => {
  const taskInput = useRef();
  const tasksCtx = useContext(TasksContext);

  const submitTaskHandler = (event) => {
    event.preventDefault();

    tasksCtx.addTask(taskInput.current.value);
  };

  return (
    <Form onSubmit={submitTaskHandler}>
      <Form.Group controlId="task">
        <Form.Label>Your task:</Form.Label>
        <Form.Control
          ref={taskInput}
          type="text"
          placeholder="Enter your task here..."
        />
        <Form.Text className="text-muted">Please add a valid task!</Form.Text>
      </Form.Group>
      <Button className="mt-3" variant="success" type="submit">
        Add task
      </Button>
      {tasksCtx.loading && <p>Loading...</p>}
      {tasksCtx.error && <p>{tasksCtx.error}</p>}
    </Form>
  );
};

export default NewTaskForm;
