import {
  Box,
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
import React, { useEffect, useState } from "react";
import { readPaymentsRequests } from "../../lib";
import { useFetchUser } from "../../lib/authContext";
import DataTable from "../DataTable";
import relativeTime from "dayjs/plugin/relativeTime";

const PaymentsTable = ({ jwt }) => {
  dayjs.extend(relativeTime);

  const [response, setResponse] = useState([]);
  const { user, loading } = useFetchUser();
  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const result = await readPaymentsRequests(jwt, user);
      setResponse(result.data);
      // console.log({response})
    };
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);
    console.log("relation is:", response);
  }, [user]);
  const taskTableStyles = {
    height: "950px",
    border: 0,
    width: "100%",
    backgroundColor: "white"
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "projectTitle",
      headerName: "Project Title",
      width: 200,
      renderCell: (cellValues) => {

        return (
          <Stack paddingY="24px" direction="row">
            <Stack direction="row">
              <>
                <Box display="flex" flexDirection="column">
                  <Typography>
                    {cellValues.row.projectTitle}
                  </Typography>
                  {/* <Typography>task - Updated 1 day ago</Typography> */}
                </Box>
              </>
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "requesterName",
      headerName: "Requester Name",
      width: 150,
      renderCell: (cellValues) => {
        return (

          <Typography fontWeight="500">{cellValues.row.requesterName}</Typography>


        );
      },
    },
    {
      field: "paidTo",
      headerName: "Paid To",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">{cellValues.row.paidTo}</Typography>

          </Stack>
        );
      },
    },
    {
      field: "paymentAmount",
      headerName: "Payment Amount",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">{cellValues.row.paymentAmount}</Typography>

            {/* <Typography fontSize="12px" color="#3F4158">
              Joined on{" "}
              {dayjs(cellValues.row.employmentDate).format("DD MMM YYYY")}
            </Typography> */}
          </Stack>
        );
      },
    },
    {
      field: "requestDate",
      headerName: "Request Date",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {dayjs(cellValues.row?.requestDate).format("MMMM, DD, YYYY")}
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },

  ];
  return (
    <>
      <DataTable
        rows={
          response?.data?.map((e) => {
            return {
              id: e?.id,
              projectTitle: e?.attributes?.project?.data?.attributes?.projectTitle,
              requesterName: e?.attributes?.employee?.data?.attributes?.firstName,
              paidTo: e?.attributes?.paidTo,
              //   date: dayjs(e?.attributes?.date).format("DD MMM YYYY"),
              paymentAmount: e?.attributes?.paymentAmount,
              requestDate: dayjs(e?.attributes?.requestDate).format(
                "DD MMM, YYYY"
              ),

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

export default PaymentsTable;
