import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../../layout/employees";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readPaymentsRequests } from "../../lib";
import ButtonGroups from "../ButtonGroups";
import All from "./All";
import Payouts from "./Payouts";
import Payins from "./Payins";
import Pending from "./Pending";
import { AttachFile } from "@mui/icons-material";

const Payment = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const buttons = ["All", "Pay outs", "Pay ins", "Pending"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readPaymentsRequests(jwt);
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
            Payment List
          </Typography>
          <Typography fontWeight="500" color="#6F7082" fontSize="16px">
            {new Date().getFullYear()} Fiscal Year
          </Typography>
        </Stack>
        <Stack direction="row" gap="48px" alignItems="center">
          <Stack>
            <Typography fontWeight="500" color="#6F7082" fontSize="16px">
              Total Payments
            </Typography>
            <Typography fontWeight="700" fontSize="24px">
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: "ETB",
              }).format(
                response?.data
                  ?.map((payment) =>
                    Number(payment.attributes?.paymentAmount?.replace(/,/g, ""))
                  )
                  .reduce((acc, curr) => acc + curr, 0)
              )}
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
      {selectedIndex === 1 ? <Payouts jwt={jwt} /> : ""}
      {selectedIndex === 2 ? <Payins jwt={jwt} /> : ""}
      {selectedIndex === 3 ? <Pending jwt={jwt} /> : ""}
    </>
  );
};

export default Payment;
