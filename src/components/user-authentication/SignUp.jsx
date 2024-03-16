import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../Constants/Constants";
import AuthContext from "../store/UserAuthentication/auth-context";

const SignUp = () => {
  const userAuth = useContext(AuthContext);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  let userEmail = email;
  userEmail = userEmail.replace("@", "").replace(".", "");
  const firstNameHandler = (e) => {
    setFname(e.target.value);
  };
  const lastNameHandler = (e) => setLname(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);

  const passwordHandler = (e) => {
    const input = e.target.value;
    setPassword(input);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setValidPassword(regex.test(input));
  };
  const confirmPasswordHandler = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userSignUpData = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    // console.log(data);
    userAuth.signUp(userSignUpData);

    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(userSignUpData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await fetch(
      `https://taskmanager-2024-default-rtdb.firebaseio.com/users${userEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(userSignUpData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
  };
  return (
    <>
      <div className="container mx-auto text-center">
        <div className="text-5xl mb-8">Register Your Account</div>
        <div className="flex justify-center">
          <form
            onSubmit={submitHandler}
            className="flex flex-col space-y-4 max-w-md"
          >
            <div className="flex flex-row gap-2">
              <div className="flex flex-col">
                <label className="text-left">First Name</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="Your first name"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
                  onChange={firstNameHandler}
                  value={fname}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-left">Last Name</label>
                <input
                  type="text"
                  value={lname}
                  onChange={lastNameHandler}
                  name="lname"
                  placeholder="Your last name"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
            <label className="text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={emailHandler}
              name="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
            />
            <label className="text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={passwordHandler}
              name="password"
              placeholder="Type your password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
            />
            {!validPassword && (
              <p className="text-red-600 text-sm">
                Password must contain at least 8 characters, include numbers,
                letters, and symbols.
              </p>
            )}
            <label className="text-left">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={confirmPasswordHandler}
              name="confirm-password"
              placeholder="Confirm your password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
            />
            {password === confirmPassword ? (
              <p className="text-green-600">Password is matched</p>
            ) : (
              <p className="text-red-600">incorrect password</p>
            )}
            <button
              type="submit"
              className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Sign-Up
            </button>
          </form>
        </div>
        <p>
          Have Account?
          <Link to="/" className="text-red-600 ">
            Sign In!
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
