import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const tokenStore = localStorage.getItem("token");
  const emailStore = localStorage.getItem("email");
  const [token, setToken] = useState(tokenStore);
  const [email, setEmail] = useState(emailStore);
  const [user, setUser] = useState([]);

  const userIsLoggedIn = !!token;

  const signUpHandler = (bio) => {
    setUser(bio);
  };
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
  };
  const emailLocalStore = (email) => {
    setEmail(email);
    localStorage.setItem("email", email);
  };

  const userAuth = {
    user: user,
    email: email,
    token: token,
    isLoggedIn: userIsLoggedIn,
    emailHandler: emailLocalStore,
    signUp: signUpHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={userAuth}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
