import { AttachFile, MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonGroups from "../ButtonGroups";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmployeesLayout from "../../layout/employees";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readOrder, readPurchaseRequest } from "../../lib";
import Delivered from "./Delivered";
import OnDelivery from "./OnDelivery";
import InPurchase from "./InPurchase";
import All from "./All";
import Cancelled from "./Cancelled";

const OrderLists = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const buttons = [
    "All",
    "Delivered",
    "On Delivery",
    "In-Purchase",
    "Cancelled",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readPurchaseRequest(jwt);
      setResponse(result.data);
    };
    fetchData();
    console.log(response);
  }, [user]);

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
            Ordered Item List
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
              {response?.data?.length} items
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
      {/* {buttonGroups.map((buttonGroup, index) => ({ buttonGroup }))} */}
      <Box height="10px" />
      <Divider />
      <Box height="10px" />
      {selectedIndex === 0 ? <All jwt={jwt} /> : ""}
      {selectedIndex === 1 ? <Delivered jwt={jwt} /> : ""}
      {selectedIndex === 2 ? <OnDelivery jwt={jwt} /> : ""}
      {selectedIndex === 3 ? <InPurchase jwt={jwt} /> : ""}
      {selectedIndex === 4 ? <Cancelled jwt={jwt} /> : ""}
    </>
  );
};

export default OrderLists;
