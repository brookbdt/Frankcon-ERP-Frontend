import { createContext, useContext, useEffect, useState } from "react";
import {
  getEmployeeFromUser,
  getUserDepartmentFromLocalCookie,
  getUserFromLocalCookie,
} from "./auth";

let userState;

// const User = createContext({ user: null,  loading: false });

// this part is new. above was original

const User = createContext({
  user: null,
  userDepartment: null,
  loading: false,
});
//end of new
export const UserProvider = ({ value, children }) => {
  const { user, userDepartment } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = { user, userDepartment };
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
    userDepartment: userState || null,
  });

  useEffect(() => {
    if (userState != undefined) {
      return;
    }

    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();
      // this part is new
      const userDepartment = getUserDepartmentFromLocalCookie();
      const userEmployee = getEmployeeFromUser();
      if (isMounted) {
        setUser({ user, userDepartment, loading: false, userEmployee });
      }
    };

    resolveUser();

    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
export const useFetchUserDepartment = () => {
  const [data, setUser] = useState({
    // user: userState || null,
    // loading: userState === undefined,
    userDepartment: userState || null,
  });

  useEffect(() => {
    if (userState != undefined) {
      return;
    }

    let isMounted = true;

    // const user = getUserFromLocalCookie();
    // this part is new
    const userDepartment = getUserDepartmentFromLocalCookie();
    if (isMounted) {
      setUser({ userDepartment });
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
export const useFetchUserEmployee = () => {
  const [data, setData] = useState({
    // user: userState || null,
    // loading: userState === undefined,
    userEmployee: userState || null,
  });
  useEffect(() => {
    if (userState != undefined) {
      return;
    }

    let isMounted = true;

    const fetchUserEmployee = async () => {
      const userEmployee = await getEmployeeFromUser();
      if (isMounted) {
        setData({
          // loading: false,
          userEmployee: userEmployee,
        });
      }
    };

    fetchUserEmployee();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};

// export const useFetchUserEmployee = () => {
//   const [data, setUser] = useState({
//     // user: userState || null,
//     // loading: userState === undefined,
//     userEmployee: userState || null,
//   });

//   useEffect(() => {
//     if (userState != undefined) {
//       return;
//     }

//     let isMounted = true;

//     // const user = getUserFromLocalCookie();
//     // this part is new
//     const userEmployee = getEmployeeFromUser();
//     if (isMounted) {
//       setUser({ userEmployee });
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, []);
//   return data;
// };
