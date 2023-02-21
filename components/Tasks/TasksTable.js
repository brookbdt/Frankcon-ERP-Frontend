import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "../DataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { readEmployee, readEmployeeTask, readTask } from "../../lib";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import WorkshopTable from "../Workshop/WorkshopTable";

const TasksTable = ({ jwt }) => {
  dayjs.extend(relativeTime);
  let today = new Date();

  let thisMonth = today.toLocaleString("default", { month: "long" });

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Task Details",
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
              <Typography fontWeight="500">{cellValues.row.title}</Typography>

              <Typography fontSize="12px" color="#3F4158">
                {cellValues.row.department} - Updated 1 day ago
              </Typography>
            </Stack>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Task Status",
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
    {
      field: "date",
      headerName: "Date",
      width: 300,
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
      field: "priority",
      headerName: "Priority",
      width: 400,
      renderCell: (cellValues) => {
        // console.log({ cellValues });
        return (
          <>
            {cellValues.row?.priority === "HIGH" ? (
              <Button
                sx={{
                  backgroundColor: "#F44336",
                  borderRadius: "20px",
                  color: "#F6F6F6",
                }}
              >
                HIGH
              </Button>
            ) : cellValues.row?.priority === "MEDIUM" ? (
              <Button
                sx={{
                  backgroundColor: "#24B07D",
                  borderRadius: "20px",
                  color: "#F6F6F6",
                }}
              >
                MEDIUM
              </Button>
            ) : cellValues.row?.priority === "LOW" ? (
              <Button
                sx={{
                  backgroundColor: "#FFBA2E",
                  borderRadius: "20px",
                  color: "#F6F6F6",
                }}
              >
                LOW
              </Button>
            ) : (
              ""
            )}
          </>
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
      setResponse(result.data);
      setEmployees(employeeList.data);
    };
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);
    console.log("relation is:", response);
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
        My Tasks
      </Typography>
      <Box height="11px" />
      {/* <pre>{JSON.stringify({ response }, null, 2)}</pre> */}
      {userDepartment === "workshop" ? (
        <WorkshopTable jwt={jwt} user={user} />
      ) : (
        <>
          <DataTable
            rows={
              response?.data?.map((e) => {
                return {
                  id: e?.id,
                  title: e?.attributes?.title,
                  status: e.attributes?.status,
                  date: e?.attributes?.date,
                  //   date: dayjs(e?.attributes?.date).format("DD MMM YYYY"),
                  priority: e.attributes?.priority,
                  employeeImage: `${e?.attributes?.employee?.data[0]?.attributes?.employeeImage?.data?.attributes?.url}`,

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
      )}
    </>
  );
};

export default TasksTable;
