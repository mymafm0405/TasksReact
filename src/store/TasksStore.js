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

  const addTaskHandler = (text) => {
    const applyData = (data) => {
      const taskId = data.name;
      setCurrentTasks((prevTasks) => prevTasks.concat({ id: taskId, text }));
    };
    sendRequest(
      {
        url: "https://todoreact-cb7b2-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: text,
      },
      applyData
    );
  };

  const getAllTasksHandler = useCallback( () => {
    const applyData = (data) => {
      const loadedTasks = [];
      for (const key in data) {
        loadedTasks.push({id: key, text: data[key]})
      }
      setCurrentTasks(loadedTasks);
    }
    sendRequest({url: 'https://todoreact-cb7b2-default-rtdb.firebaseio.com/tasks.json'}, applyData)
  }, [sendRequest])

  const removeTaskHandler = (id) => {
    const applyData = () => {
      setCurrentTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
    sendRequest({url: 'https://todoreact-cb7b2-default-rtdb.firebaseio.com/tasks/'+id+'.json', method: 'DELETE'}, applyData)
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
