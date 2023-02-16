import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import EmployeesSorted from "../../components/EmployeesSorted";
import Layout from "../../components/Layout";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { readNotification } from "../../lib";

const sortedEmployees = () => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  console.log("the user is", user);
  console.log("the user department is", userDepartment);

  const [response, setResponse] = useState([]);
  const [jwt, setJwt] = useState(null);

  useEffect(async () => {
    console.log(1, "start");

    const jwt = getTokenFromLocalCookie();

    console.log(2, "end", { jwt });

    setJwt(jwt);

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("index response is", { response });
  }, []);
  return (
    <>
      {userDepartment === "Human Resource" ? (
        <>
          <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
            <Box paddingLeft="48px">
              <EmployeesSorted jwt={jwt} />
            </Box>
          </Layout>
        </>
      ) : (
        ""
      )}
      {userDepartment === "admin" ? (
        <>
          <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
            <Box paddingLeft="48px">
              <EmployeesSorted jwt={jwt} />
            </Box>
          </Layout>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default sortedEmployees;
