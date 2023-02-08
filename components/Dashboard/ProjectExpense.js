import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const ProjectExpense = ({ jwt }) => {
  return (
    <Box paddingRight="16px">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="306px"
      >
        <Typography fontWeight="500">Project Expense</Typography>
        <Link href="/projects">
          <Button sx={{ color: "#9FA0AB", fontSize: "10px" }}>
            VIEW ALL EXPENSES
          </Button>
        </Link>
      </Stack>
      <Box height="8px" />
      <Divider sx={{ backgroundColor: "#E7E7EA", borderBottomWidth: "2px" }} />
      <Box height="16px" />
      <Typography color="#999999" fontWeight="400" fontSize="14px">
        Get the highlight of your ongoing project cost and expenses here.
      </Typography>
    </Box>
  );
};

export default ProjectExpense;
