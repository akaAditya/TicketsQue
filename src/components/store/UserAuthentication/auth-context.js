import React from "react";

const AuthContext = React.createContext({
  user: [],
  email: "",
  token: "",
  isLoggedIn: false,
  emailHandler: (email) => {},
  signUp: (bio) => {},
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;
