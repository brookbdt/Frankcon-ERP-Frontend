import { AttachFile } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonGroups from "../components/ButtonGroups";
import Layout from "../components/Layout";
import {
  useFetchUser,
  useFetchUserDepartment,
} from "../components/lib/authContext";
import EmployeesLayout from "../layout/employees";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { readOrder } from "./api";

const Orders = () => {
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
      const result = await readOrder();
      setResponse(result.data);
    };
    fetchData();
    console.log(response);
  }, []);

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
    <Layout user={user} userDepartment={userDepartment}>
      <Stack paddingX="48px">
        <Box height="28px" />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Purchase Order List</TableCell>
                <TableCell align="right">Order Location</TableCell>
                <TableCell align="right">Last Purchase Date</TableCell>
                <TableCell align="right">Item Status</TableCell>
                <TableCell align="right">Item Quantity</TableCell>
                <TableCell align="right">Additional Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response?.data?.map((response, index) => (
                <TableRow key={response.attributes?.PurchaseOrderList}>
                  <TableCell>
                    <Stack paddingY="24px" direction="row">
                      <Stack direction="row">
                        <>
                          <Avatar src={response.attributes?.avatar} />
                          <Box width="24px" />
                          <Box display="flex" flexDirection="column">
                            {/* <pre>
																			{JSON.stringify(
																				{
																					response,
																				},
																				null,
																				2
																			)}
																		</pre> */}
                            <Typography>
                              {response.attributes?.PurchaseOrderList}{" "}
                              {/* {response.attributes?.LastName} */}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#CFCFD5",
                                fontWeight: "400",
                                fontSize: "12px",
                              }}
                            >
                              {response.attributes?.Department} -{" "}
                              {response.attributes?.Position}
                            </Typography>
                          </Box>
                        </>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography>
                        {" "}
                        {response.attributes?.OrderLocation}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "#CFCFD5",
                        }}
                      >
                        {" "}
                        Joined on
                        {/* {response.attributes?.EmploymentDate} */}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      +2519{response.attributes?.LastPurchaseDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{response.attributes?.ItemStatus}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{response.attributes?.ItemQuantity}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Layout>
  );
};

export default Orders;
