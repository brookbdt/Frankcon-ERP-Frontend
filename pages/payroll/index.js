import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import EmployeesLayout from "../../layout/employees";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import Layout from "../../components/Layout";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import Payroll from "../../components/Payroll";
import PayrollTable from "../../components/Payroll/PayrollTable";

const PayrollPage = ({ jwt }) => {
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };

  const [checked, setChecked] = React.useState(false);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  return (
    <>
      <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
        <Box paddingLeft="48px">
          {/* <Payroll jwt={jwt} /> */}
          <PayrollTable jwt={jwt} />
        </Box>
      </Layout>
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
    `https://frankconerp.herokuapp.com/api/employees`,
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

export default PayrollPage;
