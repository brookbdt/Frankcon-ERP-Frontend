import {
  Avatar,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFetchUser } from "../../lib/authContext";
import { readEmployeeTask } from "../../pages/api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs from "dayjs";

const TasksTable = ({ jwt }) => {
  const [response, setResponse] = useState([]);
  const { user, loading } = useFetchUser();
  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const result = await readEmployeeTask(jwt, user);
      setResponse(result.data);
    };
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);
    console.log("relation is:", response);
  }, [user]);

  const columns = [
    { id: "Task Name", label: "Task Name" },
    {
      id: "task status",
      label: "Task Status",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Task Due Date",
      label: "Task Due Date",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Task Priority",
      label: "Task Priority",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "Task Detail",
      label: "Task Detail",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toFixed(2),
    },
  ];
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography fontSize="14px" fontWeight="500" color="#0F112E">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {response?.data?.map((employee, index) => (
              <TableRow key={employee.data?.id}>
                <TableCell>
                  <Stack paddingY="24px" direction="row">
                    <Stack direction="row">
                      <>
                        <Box display="flex" flexDirection="column">
                          <Typography>{employee.attributes?.title}</Typography>
                          {/* <Typography>task - Updated 1 day ago</Typography> */}
                        </Box>
                      </>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography>{employee.attributes?.status}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {dayjs(employee?.attributes?.date).format("DD MMM, YYYY")}
                  </Typography>
                </TableCell>
                <TableCell>
                  {employee.attributes?.priority === "HIGH" ? (
                    <Typography color="#F44336">HIGH</Typography>
                  ) : (
                    ""
                  )}
                  {employee.attributes?.priority === "MEDIUM" ? (
                    <Typography color="#FFBA2E">MEDIUM</Typography>
                  ) : (
                    ""
                  )}
                  {employee.attributes?.priority === "LOW" ? (
                    <Typography color="#24B07D">LOW</Typography>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  <Button sx={{ color: "#6F7081", fontSize: "10px" }}>
                    View Details <Box width="10px" />{" "}
                    <ArrowForwardIcon fontSize="10px" />
                  </Button>
                  {/* <Typography></Typography> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TasksTable;
