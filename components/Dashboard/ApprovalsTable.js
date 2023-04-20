import React, { useEffect, useState } from "react";
import { useFetchUser } from "../../lib/authContext";
import { readNotification, readPaymentNotification, readPaymentsRequests } from "../../lib";
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
import dayjs from "dayjs";
import DataTable from "../DataTable";

const ApprovalsTable = ({ jwt }) => {
  const [response, setResponse] = useState([]);
  const [paymentNotificationResponse, setPaymentNotificationResponse] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const { user, loading } = useFetchUser();


  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      // const result = await readNotification(jwt, user);
      // setResponse(result.data.data);

      // readPaymentNotification(jwt, user).then((pr) => {
      //   console.log("pr is", pr.data?.data);
      //   setPaymentNotificationResponse(pr.data?.data);
      // });

      const notifications = [...response, ...paymentNotificationResponse];
      setAllNotifications(notifications);

      // console.log({response})
    };
    readNotification(jwt, user).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });
    readPaymentNotification(jwt, user).then((pr) => {
      console.log("pr is", pr.data?.data);
      setPaymentNotificationResponse(pr.data?.data);
    });
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);
    console.log("relation is:", response);
  }, [user]);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "approvalType",
      headerName: "Approval Type",
      width: 150,
      renderCell: (cellValues) => {
        return (

          <>
            {cellValues.row?.approvalType === "purchase request" || cellValues?.row?.approvalType === "edited purchase request"
              ? cellValues?.purchaseRequest?.data
                ?.attributes?.itemName
              : cellValues?.type === "leave request"
                ? cellValues?.leaveRequest?.data
                  ?.attributes?.leaveRequestType
                : cellValues?.type === "payment request"
                  ? cellValues?.project?.data?.attributes?.projectTitle
                  : cellValues?.type === "vendor request" ?
                    cellValues?.vendor?.data?.attributes?.vendorName
                    : ""
            }
          </>

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

          <Typography fontWeight="500">
            {" "}
            {dayjs(cellValues.row?.requestDate).format("MMMM, DD, YYYY")}

          </Typography>

        );
      },
    },
    {
      field: "requesterName",
      headerName: "Requester Name",
      width: 400,
      renderCell: (cellValues) => {
        // console.log({ cellValues });
        return (
          <>
            {cellValues.row?.requesterName === "HIGH" ? (
              <Button
                sx={{
                  backgroundColor: "#F44336",
                  borderRadius: "20px",
                  color: "#F6F6F6",
                }}
              >
                HIGH
              </Button>
            ) : cellValues.row?.requesterName === "MEDIUM" ? (
              <Button
                sx={{
                  backgroundColor: "#24B07D",
                  borderRadius: "20px",
                  color: "#F6F6F6",
                }}
              >
                MEDIUM
              </Button>
            ) : cellValues.row?.requesterName === "LOW" ? (
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
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {dayjs(cellValues.row?.status).format("MMMM, DD, YYYY")}
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
          response?.data?.map((approval) => {
            return {
              id: approval?.data?.id,

              approvalType: approval?.attributes?.type,
              // date: approval?.attributes?.date,
              requesterName: approval?.attributes?.requesterName,
              status: approval.attributes?.status,
              date: dayjs(approval?.attributes?.date).format("DD MMM YYYY"),
              priority: approval.attributes?.priority,


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

export default ApprovalsTable;
