import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ButtonGroups from "../ButtonGroups";
import ApprovalsTable from "./ApprovalsTable";
import PaymentsTable from "./PaymentsTable";
import PurchasesTable from "./PurchasesTable";
import TasksTable from "./TasksTable";
import ActiveProjects from "./ActiveProjects";
import ProjectExpense from "./ProjectExpense";

const DashboardComponent = ({ jwt }) => {
  const buttons = ["Tasks", "Payments", "Approvals ", "Purchases"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Paper
        sx={{
          backgroundColor: "white",
          width: "1080px",
          overflowY: "auto",
          maxHeight: "600px",
          borderRadius: "10px",
          boxShadow: "0",

        }}
      >
        <Box height="20px" />
        <Stack
          direction="row"
          // justifyContent="center"
          // alignItems="center"
          paddingLeft="30px"
          gap="36px"
        >
          <Stack>
            <ButtonGroups
              buttons={buttons}
              selectedIndex={selectedIndex}
              clickedButtonColor="#4339F1"
              unClickedButtonColor="#9FA0AB"
              onClick={(i) => {
                setSelectedIndex(i);
              }}
            />

            <Box height="14px" />
            <Divider width="692px" />
            <Box height="12px" />
            <Paper
              elevation={0} sx={{ maxHeight: "600px", overflow: "auto" }}
            >

              {selectedIndex === 0 ? <TasksTable jwt={jwt} /> : ""}
              {selectedIndex === 1 ? <PaymentsTable jwt={jwt} /> : ""}
              {selectedIndex === 2 ? <ApprovalsTable jwt={jwt} /> : ""}
              {selectedIndex === 3 ? <PurchasesTable jwt={jwt} /> : ""}
            </Paper>
          </Stack>
          <Stack justifyContent="center">
            <ActiveProjects jwt={jwt} />
            <Box height="32px" />

            <ProjectExpense jwt={jwt} />
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default DashboardComponent;
