import FeedOutlined from "@mui/icons-material/FeedOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import WorkOutlineOutlined from "@mui/icons-material/WorkOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const AttachedDocuments = () => {
  return (
    <Stack paddingX="26px">
      <Typography fontWeight="700" fontSize="18px">
        Attached Documents
      </Typography>
      <Box height="16px" />
      <Button
        variant="contained"
        sx={{
          height: "48px",
          fontWeight: "600",
          fontSize: "10px",
          backgroundColor: "#F6F6F6",
          color: "black",
          borderRadius: "10px",
        }}
      >
        <FeedOutlined width="20px" height="20px" />
        <Box width="18px" />
        Download Employee Resume
      </Button>
      <Box height="12px" />
      <Button
        variant="contained"
        sx={{
          height: "48px",
          fontWeight: "600",
          fontSize: "10px",
          backgroundColor: "#F6F6F6",
          color: "black",
          borderRadius: "10px",
        }}
      >
        <ShieldOutlined width="20px" height="20px" />
        <Box width="12px" />
        Download Medical Sick Leaves
      </Button>
      <Box height="12px" />
      <Button
        variant="contained"
        sx={{
          height: "48px",
          fontWeight: "600",
          fontSize: "10px",
          backgroundColor: "#F6F6F6",
          color: "black",
          borderRadius: "10px",
        }}
      >
        <WorkOutlineOutlined width="20px" height="20px" />
        <Box width="18px" />
        Download Employee Payroll
      </Button>
    </Stack>
  );
};

export default AttachedDocuments;
