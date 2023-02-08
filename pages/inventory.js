import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import Inventory from "../components/Inventory/Inventory";

import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";

const InventoryScreen = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const buttons = ["All", "Instock", "Depleted ", "Out-of-stock"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [response, setResponse] = useState([]);
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
export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const inventoryResponse = await fetcher(
    `https://frankconerp.herokuapp.com/api/inventories`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (inventoryResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        inventoryResponse: inventoryResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: inventoryResponse.error.message,
      },
    };
  }
}

export default InventoryScreen;
