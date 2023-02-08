import { Box } from "@mui/system";
import React from "react";

import EmployeesSorted from "../../components/EmployeesSorted";
import Layout from "../../components/Layout";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";

const sortedEmployees = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  console.log("the user is", user);
  console.log("the user department is", userDepartment);
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
export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const employeeResponse = await fetcher(
    `https://frankcon.herokuapp.com/api/employees`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (employeeResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        employeeResponse: employeeResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: employeeResponse.error.message,
      },
    };
  }
}

export default sortedEmployees;
