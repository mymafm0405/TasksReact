import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { TasksContext } from "../../store/TasksStore";
import Task from "./Task";

const AllTasks = () => {
  const tasksCtx = useContext(TasksContext);

  const onRemoveHandler = (id) => {
    tasksCtx.removeTask(id);
  };
  return (
    <>
      <h2 className="mt-3">Your Tasks</h2>
      {tasksCtx.tasks.length > 0 && (
        <p style={{ color: "#FF8697" }}>Click on a task to remove it</p>
      )}

      {tasksCtx.tasks.length > 0 &&
        tasksCtx.tasks.map((task) => (
          <Task onRemove={onRemoveHandler} key={task.id} task={task} />
        ))}
      {tasksCtx.tasks.length === 0 && (
        <Alert variant="danger">You've no tasks! Please add some</Alert>
      )}
    </>
  );
};

export default AllTasks;
