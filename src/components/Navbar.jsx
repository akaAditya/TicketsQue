import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./store/UserAuthentication/auth-context";
import { Link } from "react-router-dom";
import useUserData from "./FetchData/useUserData";

const Navbar = ({ onSearch }) => {
  const userAuth = useContext(AuthContext);
  const userData = useUserData(userAuth);
  const [searchTask, setSearchTask] = useState("");

  const handleSearchChange = (e) => {
    setSearchTask(e.target.value);
  };

  const handleSearchTaskSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTask);
    setSearchTask("");
  };

  const logoutHandler = () => {
    userAuth.logout();
  };

  useEffect(() => {
    if (userData) {
      userAuth.signUp(userData);
    }
  }, []);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl ">TaskManager</span>
        </Link>
        {userAuth.isLoggedIn && (
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <form onSubmit={handleSearchTaskSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchTask}
                onChange={handleSearchChange}
                className="ml-2 mr-1 p-1 w-60 rounded-xl focus:bg-gray-300 bg-slate-700 focus:outline-none"
              />
              <button
                type="submit"
                className="mr-5 p-1 rounded-xl bg-gray-500 text-white hover:bg-gray-700"
              >
                Search
              </button>
            </form>
            <Link to="/profile" className="mr-5 hover:text-gray-900">
              Profile
            </Link>
            <Link
              to="/"
              onClick={logoutHandler}
              className="mr-5 hover:text-gray-900"
            >
              Logout
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
