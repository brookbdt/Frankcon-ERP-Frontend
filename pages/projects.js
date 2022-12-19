import React from "react";
import { Box } from "@mui/system";
import Layout from "../components/Layout";
import Projects from "../components/Projects";
const ProjectsPage = () => {
  return (
    <Layout>
      <Box paddingLeft="48px">
        <Projects />
      </Box>
    </Layout>
  );
};

export default ProjectsPage;
