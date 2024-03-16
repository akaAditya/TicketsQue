import { useEffect, useState } from 'react';

const useUserData = (userAuth) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userAuth.isLoggedIn) {
          let userEmail = userAuth.email;
          userEmail = userEmail.replace("@", "").replace(".", "");
          const response = await fetch(
            `https://taskmanager-2024-default-rtdb.firebaseio.com/users${userEmail}.json`
          );
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();

    return () => setUserData(null);
  }, [userAuth]); 
  
  return userData;
};

export default useUserData;
