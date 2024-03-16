import React, { useContext, useState } from "react";
import { API_KEY } from "../Constants/Constants";
import AuthContext from "../store/UserAuthentication/auth-context";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userAuth = useContext(AuthContext);

  const emailHandler = (e) => setEmail(e.target.value);

  const passwordHandler = (e) => {
    const input = e.target.value;
    setPassword(input);
  };

  const userPasswordResetHandler = async () => {
    const userEmail = email;
    if (userEmail !== null) {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: userEmail,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.error.code === 400) {
          alert("please give your email");
        } else {
          alert(`Check your mail to reset password`);
        }
      } catch (error) {
        console.log("EMAIL_NOT_FOUND", error);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.email === undefined){
        return <SignIn />
      }
      else{
        userAuth.emailHandler(data.email);
        userAuth.login(data.idToken);
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="container mx-auto text-center">
        <div className="text-5xl mb-8">Login Account</div>
        <div className="flex justify-center">
          <form
            onSubmit={submitHandler}
            className="flex flex-col space-y-4 max-w-md"
          >
            <label className="text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={emailHandler}
              name="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
              required
            />
            <label className="text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={passwordHandler}
              name="password"
              placeholder="Type your password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
              required
            />
            <button
              type="submit"
              className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Sign-In
            </button>
            <button
              onClick={userPasswordResetHandler}
              className="bg-slate-400 text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none"
            >
              Forgot Password
            </button>
          </form>
        </div>
        <p>
          Are you a new user?
          <Link to="/signup" className="text-red-600">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
