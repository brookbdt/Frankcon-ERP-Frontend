import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const ProjectTasks = ({ response }) => {
  return (
    <Box paddingX="24px">
      <Divider width="100%" sx={{ borderBottomWidth: "2px" }} />
      <Box height="20px" />
      <Typography fontWeight="500" fontSize="20px">
        Project Tasks & Activities
      </Typography>
      <Box height="20px" />
      <Divider width="100%" sx={{ borderBottomWidth: "2px" }} />
      <Box height="80px" />
    </Box>
  );
};

export default ProjectTasks;
