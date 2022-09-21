import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { TasksContext } from "../../store/TasksStore";

const Task = ({ task, onRemove }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const tasksCtx = useContext(TasksContext);

  const removeHandler = () => {
    onRemove(task.id);
  };

  const cancelHandler = () => {
    // setConfirmDelete(false);
    // console.log("cancel");
    tasksCtx.getAllTasks();
  };
  return (
    <Card
      onClick={() => {
        setConfirmDelete(true);
      }}
      className="mt-3 mb-3"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <Card.Body>
        {confirmDelete && (
          <div>
            <Card.Text>Are you sure want to delete?</Card.Text>
            <Button onClick={removeHandler} variant="danger">
              Yes, sure
            </Button>
            <Button onClick={cancelHandler} variant="default">
              Cancel
            </Button>
          </div>
        )}
        {!confirmDelete && <Card.Text>{task.task}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Task;
