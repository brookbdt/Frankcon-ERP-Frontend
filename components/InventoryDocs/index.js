import { AttachFile } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../../layout/employees";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readInventoryDocs } from "../../lib";
import ButtonGroups from "../ButtonGroups";

import All from "./All";
import Inbound from "./Inbound";
import MaterialTransfer from "./MaterialTransfer";

const InventoryDocs = ({ jwt }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [response, setResponse] = useState([]);
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

  const buttons = ["All Documents", "Inbound", "Material Transfer"];
  useEffect(() => {
    const fetchData = async () => {
      const result = await readInventoryDocs(jwt);
      setResponse(result.data);
    };
    fetchData();
    console.log(response);
  }, [user]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography fontWeight="700" fontSize="32px">
            Inventory Documentation
          </Typography>
          <Box display="flex">
            <Typography fontWeight="500" color="#6F7081" fontSize="16px">
              {monthName}
            </Typography>
            <Box width="5px" />
            <Typography fontWeight="500" color="#6F7081" fontSize="16px">
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" gap="48px" alignItems="center">
          <Stack>
            <Typography fontWeight="500" color="#6F7082" fontSize="16px">
              Documentation Request
            </Typography>
            <Typography fontWeight="700" fontSize="24px">
              {response?.data?.length} Items
            </Typography>
          </Stack>
          <Button
            variant="contained"
            disableElevation
            // onClick={}
            sx={{
              backgroundColor: "#E1DFF6",
              borderRadius: "10px",
              width: "169px",
              height: "48px",
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <AttachFile
                sx={{ color: "#4339F2", width: "20px", height: "20px" }}
              />
              <Box width="12px"></Box>
              <Typography fontWeight="600" fontSize="10px" color="#4339F2">
                generate report
              </Typography>
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <EmployeesLayout
        metric={`Date: ${monthName}`}
        list="list"
        sortBy="decline"
      />
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
      {selectedIndex === 1 ? <Inbound jwt={jwt} /> : ""}
      {selectedIndex === 2 ? <MaterialTransfer jwt={jwt} /> : ""}
    </>
  );
};

export default InventoryDocs;
