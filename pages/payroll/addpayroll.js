import { Box } from "@mui/material";
import React from "react";
import Layout from "../../components/Layout";
import AddPay from "../../components/Payroll/AddPay";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const AddPayroll = ({ jwt }) => {
  const [checked, setChecked] = React.useState(false);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  return (
    <>
      <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
        <Box paddingLeft="48px">
          <AddPay jwt={jwt} />
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
  const payrollResponse = await fetcher(
    `https://frankcon.herokuapp.com/api/payrolls`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (payrollResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        employeeResponse: payrollResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: payrollResponse.error.message,
      },
    };
  }
}

export default AddPayroll;
