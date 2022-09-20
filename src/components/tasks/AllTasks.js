import { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { TasksContext } from "../../store/TasksStore";
import Task from "./Task";

const AllTasks = () => {
  const tasksCtx = useContext(TasksContext);
  const getTsks = tasksCtx.getAllTasks;
  
  useEffect(() => {
    getTsks()
  }, [getTsks]);

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
      {tasksCtx.tasks.length === 0 && tasksCtx.loading && (
        <Alert variant="warning">Loading</Alert>
      )}
      {tasksCtx.tasks.length === 0 && !tasksCtx.loading && (
        <Alert variant="warning">You don't have tasks, please add some!</Alert>
      )}
    </>
  );
};

export default AllTasks;
