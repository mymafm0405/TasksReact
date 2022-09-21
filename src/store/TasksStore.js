import React, { useCallback, useState } from "react";
import useHttp from "../hooks/use-http";

export const TasksContext = React.createContext({
  tasks: [],
  addTask: (text) => {},
  getAllTasks: () => {},
  removeTask: (id) => {},
  loading: false,
  error: null,
});

const TasksContextProvider = (props) => {
  const { loading, error, sendRequest } = useHttp();
  const [currentTasks, setCurrentTasks] = useState([]);
  const localId = localStorage.getItem("localId");
  console.log(localId);

  const addTaskHandler = (text) => {
    const applyData = (data) => {
      const taskId = data.name;
      setCurrentTasks((prevTasks) =>
        prevTasks.concat({ id: taskId, userId: localId, task: text })
      );
    };
    sendRequest(
      {
        url: "https://todoreact-cb7b2-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { userId: localId, task: text },
      },
      applyData
    );
  };

  const getAllTasksHandler = useCallback(() => {
    const applyData = (data) => {
      const loadedTasks = [];
      if (data) {
        for (const key in data) {
          loadedTasks.push({ id: key, userId: localId, task: data[key].task });
        }
        setCurrentTasks(loadedTasks);
      }
    };
    sendRequest(
      { url: "https://todoreact-cb7b2-default-rtdb.firebaseio.com/tasks.json" },
      applyData
    );
  }, [sendRequest, localId]);

  const removeTaskHandler = (id) => {
    const applyData = () => {
      setCurrentTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    };
    sendRequest(
      {
        url:
          "https://todoreact-cb7b2-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json",
        method: "DELETE",
      },
      applyData
    );
  };

  const ctxValue = {
    tasks: currentTasks,
    addTask: addTaskHandler,
    getAllTasks: getAllTasksHandler,
    removeTask: removeTaskHandler,
    loading: loading,
    error: error,
  };

  return (
    <TasksContext.Provider value={ctxValue}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
