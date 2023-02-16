import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "../DataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { readEmployee, readEmployeeTask, readTask } from "../../lib";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const WorkshopTable = ({ jwt }) => {
  dayjs.extend(relativeTime);
  let today = new Date();

  let thisMonth = today.toLocaleString("default", { month: "long" });
  let thisYear = new Date().getFullYear();

  const columns = [
    {
      field: "title",
      headerName: "Workshop Task Title",
      width: 250,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Box display="flex" sx={{ paddingY: "20px" }}>
            <Typography fontWeight="700" color="#101010">
              {cellValues.row.title}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Box display="flex" sx={{ paddingY: "20px" }}>
            <Typography fontSize="12px" color="#3F4158">
              {cellValues.row.department}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "postDate",
      headerName: "Post Date",
      width: 200,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {dayjs(cellValues.row?.createdAt).format("MMMM, DD, YYYY")}
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "date",
      headerName: "Delivery Date",
      width: 200,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {dayjs(cellValues.row?.date).format("MMMM, DD, YYYY")}
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "files",
      headerName: "Attachments",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {cellValues.row?.attachments}
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "status",
      headerName: "Payment Status",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">{cellValues.row.status}</Typography>

            {/* <Typography fontSize="12px" color="#3F4158">
                Joined on{" "}
                {dayjs(cellValues.row.employmentDate).format("DD MMM YYYY")}
              </Typography> */}
          </Stack>
        );
      },
    },
  ];

  const taskTableStyles = {
    height: "950px",
    border: 0,
    width: "100%",
  };
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [response, setResponse] = useState([]);
  const [priority, setPriority] = useState("HIGH");
  const [status, setStatus] = useState("INPROGRESS");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const result = await readEmployeeTask(jwt, user);
      const employeeList = await readEmployee(jwt, user);
      console.log("workshop task:", { res: result.data });
      setResponse(result.data.data);
      setEmployees(employeeList.data);
      console.log({ response: response });
    };
    // console.log("the jwt is", jwt);
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
        {thisMonth} {thisYear}
      </Typography>
      <Box height="11px" />
      <DataTable
        rows={
          response?.map((e) => {
            return {
              id: e?.id,
              title: e?.attributes?.title,
              status: e.attributes?.status,
              deliveryDate: e?.attributes?.date,
              //   attachments: e?.attributes?.files,
              priority: e.attributes?.priority,
              postDate: e.attributes?.createdAt,
              date: e.attributes?.date,
              department:
                e?.attributes?.employee?.data[0]?.attributes?.department,
            };
          }) ?? []
        }
        columns={columns}
        // className={classes.root}
        loading={!response?.data?.length}
        sx={taskTableStyles}
        checkboxSelection
      />
    </>
  );
};

export default WorkshopTable;
