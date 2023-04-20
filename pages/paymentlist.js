import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Payment from "../components/Payments/Payment";
import { readNotification } from "../lib";

import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";

const PaymentList = () => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [jwt, setJwt] = useState(null);

  const [response, setResponse] = useState([]);

  useEffect(() => {
    const jwt = getTokenFromLocalCookie();

    setJwt(jwt);

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("index response is", { response });
  }, []);
  return (
    <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
      <Stack paddingX="48px">
        <Box height="28px" />
        <Payment selectedIndex="0" />
      </Stack>
    </Layout>
  );
};

export default PaymentList;
