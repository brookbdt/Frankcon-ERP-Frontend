import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AddPay from "../../components/Payroll/AddPay";
import { readNotification } from "../../lib";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const AddPayroll = () => {
  const [checked, setChecked] = React.useState(false);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const [jwt, setJwt] = useState(null);
  const [response, setResponse] = useState([]);

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
          <AddPay jwt={jwt} />
        </Box>
      </Layout>
    </>
  );
};

export default AddPayroll;
