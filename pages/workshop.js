import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import Workshop from "../components/Workshop/Workshop";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";

const workshop = ({ jwt }) => {
  return (
    <Layout>
      <Box paddingLeft="48px">
        <Workshop jwt={jwt} />
      </Box>
    </Layout>
  );
};

export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const workshopResponse = await fetcher(
    `http://localhost:1337/api/paymentrequests`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (workshopResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        taskResponse: workshopResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: workshopResponse.error.message,
      },
    };
  }
}

export default workshop;
