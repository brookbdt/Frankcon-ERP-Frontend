import { AttachFile } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EmployeesLayout from "../../layout/employees";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import ButtonGroups from "../ButtonGroups";
import Layout from "../Layout";
import All from "./All";
import Depleted from "./Depleted";
import Instock from "./Instock";
import OutofStock from "./OutofStock";

const Inventory = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const buttons = ["All", "Instock", "Depleted ", "Out-of-stock"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [response, setResponse] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await readInventory();
  //     setResponse(result.data);
  //   };
  //   fetchData();
  //   console.log(response);
  // }, []);

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
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography fontWeight="700" fontSize="32px">
            Inventory Item List
          </Typography>
          <Typography fontWeight="500" color="#6F7082" fontSize="16px">
            {new Date().getFullYear()} Fiscal Year
          </Typography>
        </Stack>
        <Stack direction="row" gap="48px" alignItems="center">
          <Stack>
            <Typography fontWeight="500" color="#6F7082" fontSize="16px">
              Total Inventory
            </Typography>
            <Typography fontWeight="700" fontSize="24px">
              433 items
            </Typography>
          </Stack>
          <Button
            variant="contained"
            // onClick={}
            sx={{
              backgroundColor: "#E1DFF6",
              borderRadius: "10px",
              width: "250px",
              height: "48px",
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <AttachFile
                sx={{ color: "#4339F2", width: "24px", height: "24px" }}
              />
              <Box width="12px"></Box>
              <Typography fontWeight="600" fontSize="12px" color="#4339F2">
                generate item report
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
      {selectedIndex === 1 ? <Instock jwt={jwt} /> : ""}
      {selectedIndex === 2 ? <Depleted jwt={jwt} /> : ""}
      {selectedIndex === 3 ? <OutofStock jwt={jwt} /> : ""}
    </>
  );
};

export default Inventory;
