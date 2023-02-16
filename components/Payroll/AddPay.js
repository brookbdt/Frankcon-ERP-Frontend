import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DataTable from "../DataTable";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readPayroll } from "../../lib";

const AddPay = ({ jwt }) => {
  const [checked, setChecked] = React.useState(false);
  dayjs.extend(relativeTime);
  let today = new Date();

  let thisMonth = today.toLocaleString("default", { month: "long" });
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [response, setResponse] = useState([]);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "employeeName",
      headerName: "Employee name",
      width: 300,
      renderCell: (cellValues) => {
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

  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await readPayroll(jwt);

      setResponse(result.data);

      console.log(response);
    };
    fetchData();
  }, [user]);
  const payrollTableStyles = {
    height: "950px",
    border: 0,
    width: "100%",
  };

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
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight="700" fontSize="32px" color="#141522">
            Employee Payroll
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack
              direction="column"
              alignItems="space-between"
              justifyContent="flex-end"
              //   gap="10px"
            >
              <Typography fontWeight="400" fontSize="12px" color="#3F4158">
                Total Payroll Payment
              </Typography>
              <Typography fontWeight="700" fontSize="16px" color="#141522">
                ETB TODO
              </Typography>
            </Stack>

            <Box width="103px" />
            <Button
              onClick={handleSlide}
              sx={{
                marginTop: "3px",
                backgroundColor: "#E1DFF6",

                color: "#4339F2",
                borderRadius: "10px",
                paddingX: "16px",
                paddingY: "12px",
                fontWeight: "600",
                fontSize: "12px",
              }}
            >
              <AddIcon />
              <Box width="12px" />
              Add Payroll
            </Button>
            <>{/* <pre>{JSON.stringify({ response }, null, 2)}</pre> */}</>
          </Stack>
        </Stack>
        <Box height="11px" />
        <Typography fontSize="20px" fontWeight="700">
          {thisMonth} Payroll
        </Typography>
        <Box height="11px" />
      </Stack>
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
        // checkboxSelection
      />
    </>
  );
};

export default AddPay;
