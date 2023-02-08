import { Box, Stack } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";

import OrderLists from "../components/Orders/OrderLists";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";

const Orders = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  return (
    <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
      <Stack paddingX="48px">
        <Box height="28px" />
        <OrderLists jwt={jwt} />
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
  const orderResponse = await fetcher(
    `https://frankconerp.herokuapp.com/api/orders`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (orderResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        taskResponse: orderResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: orderResponse.error.message,
      },
    };
  }
}

export default Orders;
