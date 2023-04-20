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

const PaymentsTable2 = ({ jwt }) => {
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

    const columns = [
        { id: "Project Title", label: "Project Title" },
        {
            id: "Requester Name",
            label: "Requester Name",
            // minWidth: 170,
            // align: "right",
            format: (value) => value.toFixed(2),
        },
        {
            id: "paid to",
            label: "Paid To",
            // minWidth: 170,
            // align: "right",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "payment amount",
            label: "Payment Amount",
            // minWidth: 170,
            // align: "right",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "request Date",
            label: "Request Date",
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
                        {response?.data?.map((payment, index) => (
                            <TableRow key={payment.data?.id}>
                                <TableCell>
                                    <Stack paddingY="24px" direction="row">
                                        <Stack direction="row">
                                            <>
                                                <Box display="flex" flexDirection="column">
                                                    <Typography>
                                                        {payment.attributes?.project?.data?.attributes?.projectTitle}
                                                    </Typography>
                                                    {/* <Typography>task - Updated 1 day ago</Typography> */}
                                                </Box>
                                            </>
                                        </Stack>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography>{payment?.attributes?.employee?.data?.attributes?.firstName}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {payment.attributes?.paidTo}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        ETB {payment.attributes?.paymentAmount}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {dayjs(payment?.attributes?.requestDate).format(
                                        "DD MMM, YYYY"
                                    )}
                                </TableCell>
                                {/* <TableCell>
                    {payment.attributes?.paymentPriorityLevel === "HIGH" ? (
                      <Typography color="#F44336">HIGH</Typography>
                    ) : (
                      ""
                    )}
                    {payment.attributes?.paymentPriorityLevel === "MEDIUM" ? (
                      <Typography color="#FFBA2E">MEDIUM</Typography>
                    ) : (
                      ""
                    )}
                    {payment.attributes?.paymentPriorityLevel === "LOW" ? (
                      <Typography color="#24B07D">LOW</Typography>
                    ) : (
                      ""
                    )}
                  </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default PaymentsTable2;
