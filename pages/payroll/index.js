import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const PayrollPage = () => {
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };

  const [checked, setChecked] = React.useState(false);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

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
      <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
        <Box paddingLeft="48px">
          {/* <Payroll jwt={jwt} /> */}
          <PayrollTable jwt={jwt} />
        </Box>
      </Layout>
    </>
  );
};

export default PayrollPage;
