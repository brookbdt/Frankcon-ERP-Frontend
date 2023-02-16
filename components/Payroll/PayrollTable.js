import React, { useEffect, useState } from "react";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readEmployee, readPayroll } from "../../lib";
import DataTable from "../DataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const PayrollTable = ({ onError, jwt }) => {
  dayjs.extend(relativeTime);
  let today = new Date();

  let thisMonth = today.toLocaleString("default", { month: "long" });

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "employeeName",
      headerName: "Employee name",
      width: 300,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Box display="flex" sx={{ paddingY: "20px" }}>
            <Avatar
              src={cellValues.row.employeeImage}
              width="44px"
              height="44px"
            />
            <Box width="12px" />

            <Stack justifyContent="center">
              <Typography fontWeight="500">
                {cellValues.row.firstName} {cellValues.row.lastName}
              </Typography>

              <Typography fontSize="12px" color="#3F4158">
                {cellValues.row.department}
              </Typography>
            </Stack>
          </Box>
        );
      },
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {cellValues.row.department}
            </Typography>
            <Typography fontSize="12px" color="#3F4158">
              Joined on{" "}
              {dayjs(cellValues.row.employmentDate).format("DD MMM YYYY")}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">28 {monthName}</Typography>

            <Typography fontSize="12px" color="#3F4158">
              {dayjs(`${thisMonth}`).fromNow()}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "employeeSalary",
      headerName: "Employee Salary",
      width: 200,
      renderCell: (cellValues) => {
        // console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              ETB {cellValues.row.employeeSalary}
            </Typography>

            <Typography fontSize="12px" color="#3F4158">
              Net Salary + 10% Bonus
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <>
            {cellValues.row.paymentStatus === "Payment Pending" ? (
              <Button
                sx={{
                  backgroundColor: "#F44336",
                  fontSize: "11px",
                  color: "#F6F6F6",
                  borderRadius: "100px",
                }}
              >
                Payment Pending
              </Button>
            ) : cellValues.row.paymentStatus === "Payment Made" ? (
              <Button
                sx={{
                  backgroundColor: "#24B07D",
                  fontSize: "11px",
                  color: "#F6F6F6",
                  borderRadius: "100px",
                }}
              >
                Complete
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#9FA0AB",
                  fontSize: "11px",
                  color: "#F6F6F6",
                  borderRadius: "100px",
                }}
              >
                N/A
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const payrollTableStyles = {
    height: "950px",
    border: 0,
    width: "100%",
  };
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readPayroll(jwt);

      setResponse(result.data);

      console.log(response);
    };
    fetchData();
  }, [user]);

  var months = [
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
  var currDate = new Date();
  var currMonth = currDate.getMonth();
  var monthName = months[currMonth];

  return (
    <>
      <Box height="11px" />
      <Typography fontSize="20px" fontWeight="700">
        {thisMonth} Payroll
      </Typography>
      <Box height="11px" />

      {/* <pre>{JSON.stringify({ response }, null, 2)}</pre> */}

      <DataTable
        rows={
          response?.data?.map((e) => {
            return {
              id: e?.id,
              firstName: e?.attributes?.firstName,
              lastName: e?.attributes?.lastName,
              employeeName:
                e?.attributes?.firstName +
                " " +
                e?.attributes?.lastName +
                "\n" +
                e?.attributes?.department,
              department: e?.attributes?.department,
              employmentDate: e?.attributes?.employmentDate,
              department: e?.attributes?.department,
              dueDate: "28" + " " + monthName,
              employeeSalary: e?.attributes?.employeeNetSalary,
              employeeImage: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${e?.attributes?.employeeImage?.data?.attributes?.url}`,
              paymentStatus: e?.attributes?.paymentStatus,
            };
          }) ?? []
        }
        columns={columns}
        // className={classes.root}
        loading={!response?.data?.length}
        sx={payrollTableStyles}
        checkboxSelection
      />
    </>
  );
};

export default PayrollTable;
