import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/UserAuthentication/auth-context";
import useUserData from "../FetchData/useUserData";

const Profile = () => {
const userAuth = useContext(AuthContext);
const userData = useUserData(userAuth);
const [userDetails, setUserDetails] = useState(null);

useEffect(()=>{
  setUserDetails(userData)
},[userData])

  return (
    <div className="container mx-auto">
      {userDetails !== null && Object.values(userDetails).map((data)=>(
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Name: {data.fname}</h1>
          <h1 className="text-xl text-gray-600">Your Email: {data.email}</h1>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Profile);
