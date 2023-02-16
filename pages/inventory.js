import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Inventory from "../components/Inventory/Inventory";

import Layout from "../components/Layout";
import { readNotification } from "../lib";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";

const InventoryScreen = () => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const buttons = ["All", "Instock", "Depleted ", "Out-of-stock"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [jwt, setJwt] = useState(null);

  const [response, setResponse] = useState([]);

  useEffect(() => {
    console.log(1, "params console is");

    const jwt = getTokenFromLocalCookie();

    console.log(2, "end", { jwt });

    setJwt(jwt);

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("index response is", { response });
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await readInventory();
  //     setResponse(result.data);
  //   };
  //   fetchData();
  //   console.log(response);
  // }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthIndex = new Date().getMonth();
  let monthName = monthNames[monthIndex];
  return (
    <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
      <Stack paddingX="48px">
        <Box height="28px" />
        <Inventory jwt={jwt} />
      </Stack>
    </Layout>
  );
};

export default InventoryScreen;
