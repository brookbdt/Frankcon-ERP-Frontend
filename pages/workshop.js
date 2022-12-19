import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import Workshop from "../components/Workshop";

const workshop = () => {
  return (
    <Layout>
      <Box paddingLeft="48px">
        <Workshop />
      </Box>
    </Layout>
  );
};

export default workshop;
