import { Box } from "@mui/system";
import React from "react";
import Layout from "../components/Layout";
import Employees from "../components/Employees";
import {
  useFetchUser,
  useFetchUserDepartment,
  useUser,
} from "../components/lib/authContext";

const EmployeesPage = () => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  console.log("the user is", user);
  console.log("the user department is", userDepartment);
  return (
    <>
      {userDepartment === "Human Resource" ? (
        <>
          <Layout user={user} userDepartment={userDepartment}>
            <Box paddingLeft="48px">
              <Employees />
            </Box>
          </Layout>
        </>
      ) : (
        ""
      )}
      {userDepartment === "admin" ? (
        <>
          <Layout user={user} userDepartment={userDepartment}>
            <Box paddingLeft="48px">
              <Employees />
            </Box>
          </Layout>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default EmployeesPage;
