import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";

import ButtonGroups from "../ButtonGroups";
import EmployeesLayout from "../../layout/employees";

import All from "../Tasks/All";
import Pending from "../Tasks/Pending";
import Cancelled from "../Tasks/Cancelled";
import Approved from "../Tasks/Approved";
import { readEmployee } from "../../lib";

const Workshop = ({ jwt }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ["All", "Approved", "Pending", "Cancelled"];
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

  const [response, setResponse] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await readEmployee();
  //     setResponse(result.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <Stack
      paddingRight="55px"
      direction="column"
      width="100%"
      height="100%"
      overflowY="auto"
    >
      <Box height="24px"></Box>
      <Stack justifyContent="space-between" direction="row">
        <Stack>
          <Typography fontWeight="700" fontSize="32px">
            Workshop Delivery List
          </Typography>
          <Typography color="#6F7082" fontSize="16px">
            {`${monthName}`} {new Date().getFullYear()}
          </Typography>
        </Stack>
        <Stack direction="row" gap="69px" alignItems="center">
          <Stack>
            <Typography color="#3F4158" fontWeight="400" fontSize="12px">
              Total Active Deliveries
            </Typography>
            <Typography color="black" fontSize="24px" fontWeight="400">
              9 Tasks
            </Typography>
          </Stack>
          <Button
            //   onClick={handleSlide}
            sx={{
              marginTop: "3px",
              backgroundColor: "#E1E0F6",
              color: "#4339F2",
              borderRadius: "10px",
              paddingX: "16px",
              paddingY: "12px",
            }}
          >
            <AttachFileIcon />
            <Typography variant="p" fontSize="12px" fontWeight="600">
              Generate Task List
            </Typography>
          </Button>
        </Stack>
      </Stack>
      <EmployeesLayout />

      <Box height="32px" />
      <ButtonGroups
        buttons={buttons}
        selectedIndex={selectedIndex}
        clickedButtonColor="#4339F1"
        unClickedButtonColor="#9FA0AB"
        onClick={(i) => {
          setSelectedIndex(i);
        }}
      />
      <Box height="10px" />
      <Divider />
      <Box height="10px" />
      {selectedIndex === 0 ? <All jwt={jwt} /> : ""}
      {selectedIndex === 1 ? <Approved jwt={jwt} /> : ""}
      {selectedIndex === 2 ? <Pending jwt={jwt} /> : ""}
      {selectedIndex === 3 ? <Cancelled jwt={jwt} /> : ""}
    </Stack>
  );
};

export default Workshop;
