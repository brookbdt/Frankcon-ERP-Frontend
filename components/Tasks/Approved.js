import { Check, Clear, ErrorOutline } from "@mui/icons-material";
import {
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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readEmployee, readEmployeeTask, readWorkshopTasks } from "../../lib";
import DataTable from "../DataTable";

const Approved = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  dayjs.extend(relativeTime);
  const [response, setResponse] = useState([]);
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
  const [status, setStatus] = useState("pending");
  const taskTableStyles = {
    height: "950px",
    border: 0,
    width: "100%",
  };
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
      field: "isApproved",
      headerName: "Payment Status",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {cellValues.row.isApproved}
            </Typography>

            {/* <Typography fontSize="12px" color="#3F4158">
                Joined on{" "}
                {dayjs(cellValues.row.employmentDate).format("DD MMM YYYY")}
              </Typography> */}
          </Stack>
        );
      },
    },
  ];

  return response?.map((e) => {
    response?.attributes?.isApproved === "Approved" ? (
      <DataTable
        rows={
          response?.map((e) => {
            return {
              id: e?.id,
              title: e?.attributes?.title,
              isApproved: e?.attributes?.isApproved,
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
        loading={!response?.length}
        sx={taskTableStyles}
        checkboxSelection
      />
    ) : (
      "hi"
    );
  });
};

export default Approved;
