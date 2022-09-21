import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (reqConfig, applyData) => {
    setLoading(true);
    setError(null);
    console.log(reqConfig.body);
    console.log(JSON.stringify(reqConfig.body));
    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : "GET",
        headers: reqConfig.headers ? reqConfig.headers : {},
        body: JSON.stringify(reqConfig.body)
          ? JSON.stringify(reqConfig.body)
          : null,
      });
      setLoading(false);

      const data = await response.json();
      console.log(data);
      applyData(data);
    } catch (error) {
      setError("Something went wrong!");
      console.log(error);
      setLoading(false);
    }
  }, []);
  return {
    loading,
    error,
    sendRequest,
  };
};

export default useHttp;
