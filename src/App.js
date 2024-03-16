import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SignUp from "./components/user-authentication/SignUp";
import SignIn from "./components/user-authentication/SignIn";
import TaskHome from "./components/TaskPage/TaskHome";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./components/store/UserAuthentication/auth-context";
import Profile from "./components/Profile/Profile";

const App = () => {
  const userAuth = useContext(AuthContext);
  const [taskData, setTaskData] = useState([]);
  const [filterTask, setFilterTask] = useState(taskData);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        if (userAuth.isLoggedIn) {
          let email = userAuth.email;
          email = email.replace("@", "").replace(".", "");
          const response = await fetch(
            `https://taskmanager-2024-default-rtdb.firebaseio.com/tasks${email}.json`
          );
          const data = await response.json();
          if (response.ok && data !== null) {
            return setTaskData(Object.values(data));
          } else {
            return setTaskData([]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTaskData();
  }, []);

  const handleSearch = (searchTask) => {
    const searchTasks = taskData.filter((value) =>
      value.task.toLowerCase().includes(searchTask.toLowerCase())
    );
    setFilterTask(searchTasks);
  };

  return (
    <React.Fragment>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        {userAuth.isLoggedIn ? (
          <Route
            path="/"
            element={
              <TaskHome
                onSearchFilterTasks={
                  filterTask.length > 0 ? filterTask : taskData
                }
              />
            }
          />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
        {userAuth.isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
      </Routes>
    </React.Fragment>
  );
};

export default App;
