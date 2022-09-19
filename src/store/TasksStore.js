import React, { useState } from "react";

export const TasksContext = React.createContext({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
});

const TasksContextProvider = (props) => {
  const [currentTasks, setCurrentTasks] = useState([]);

  const addTaskHandler = (task) => {
    setCurrentTasks((prevTasks) => prevTasks.concat(task));
  };

  const removeTaskHandler = (id) => {
    setCurrentTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const ctxValue = {
    tasks: currentTasks,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
  };

  return (
    <TasksContext.Provider value={ctxValue}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
