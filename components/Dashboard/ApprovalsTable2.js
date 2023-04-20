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

const ApprovalsTable2 = ({ jwt }) => {
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
        {
            id: "Title",
            label: "Title",
            // minWidth: 170,
            // align: "right",
            format: (value) => value.toLocaleString("en-US"),
        },
        { id: "Approval Type", label: "Approval Type" },

        {
            id: "request Date",
            label: "Request Date",
            // minWidth: 170,
            // align: "right",
            format: (value) => value.toFixed(2),
        },
        {
            id: "Requester Name",
            label: "Requester Name",
            // minWidth: 170,
            // align: "right",
            format: (value) => value.toFixed(2),
        },
        {
            id: "Status",
            label: "Status",
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
                        {/* <pre>{JSON.stringify({ allNotifications }, null, 2)}</pre> */}
                        {/* <pre>{JSON.stringify({ response }, null, 2)}</pre>
            <pre>{JSON.stringify({ paymentNotificationResponse }, null, 2)}</pre> */}
                        {allNotifications?.map((approval, index) => (
                            <TableRow key={approval.data?.id}>
                                <TableCell>
                                    <Stack paddingY="24px" direction="row">
                                        <Stack direction="row">
                                            <>
                                                <Box display="flex" flexDirection="column">
                                                    <Typography fontSize="14px">
                                                        {approval?.attributes?.type === "purchase request" || approval?.attributes?.type === "edited purchase request"
                                                            ? approval?.attributes?.purchaseRequest?.data
                                                                ?.attributes?.itemName
                                                            : approval?.attributes?.type === "leave request"
                                                                ? approval?.attributes?.leaveRequest?.data
                                                                    ?.attributes?.leaveRequestType
                                                                : approval?.attributes?.type === "payment request"
                                                                    ? approval?.attributes?.project?.data?.attributes?.projectTitle
                                                                    : approval?.attributes?.type === "vendor request" ?
                                                                        approval?.attributes?.vendor?.data?.attributes?.vendorName
                                                                        : ""}
                                                    </Typography>
                                                    {/* <Typography>task - Updated 1 day ago</Typography> */}
                                                </Box>
                                            </>
                                        </Stack>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography fontSize="12px">
                                        {approval?.attributes?.type === "edited purchase request" ? "purchase request" : approval?.attributes?.type}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        <Typography fontSize="12px">
                                            {dayjs(approval?.attributes?.date).format("DD MMM, YYYY")}
                                        </Typography>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontSize="14px">
                                        {
                                            approval?.attributes?.employee?.data?.attributes?.firstName
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontSize="14px">
                                        {approval?.attributes?.type === "purchase request" || approval?.attributes?.type === "edited purchase request"
                                            ? approval?.attributes?.purchaseRequest?.data?.attributes
                                                ?.isApproved
                                            : approval?.attributes?.type === "leave request"
                                                ? approval?.attributes?.leaveRequest?.data?.attributes
                                                    ?.isApproved
                                                : approval?.attributes?.type === "payment request"
                                                    ? approval?.attributes?.paymentrequest?.data?.attributes
                                                        ?.isApproved
                                                    : approval?.attributes?.type === "vendor request"
                                                        ? approval?.attributes?.vendor?.data?.attributes?.isApproved
                                                        : ""}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ApprovalsTable2;
