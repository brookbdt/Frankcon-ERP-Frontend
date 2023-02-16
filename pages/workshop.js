import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Workshop from "../components/Workshop/Workshop";
import { readNotification } from "../lib";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";

const workshop = () => {
  const [jwt, setJwt] = useState(null);

  const [response, setResponse] = useState([]);

  useEffect(async () => {
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
  return (
    <Layout>
      <Box paddingLeft="48px">
        <Workshop jwt={jwt} />
      </Box>
    </Layout>
  );
};

export default workshop;
