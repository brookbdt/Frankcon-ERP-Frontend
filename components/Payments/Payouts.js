import { CallMade, CallReceived, ErrorOutline } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readPaymentsRequests } from "../../pages/api";
import DataTable from "../DataTable";

const Payouts = ({ jwt }) => {
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "paymentName",
      headerName: "Payment Name",
      width: 250,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack paddingY="24px" direction="row">
            <Stack direction="row">
              <>
                {cellValues?.row?.status === "pending" ? (
                  <Box
                    sx={{
                      backgroundColor: "#FFFAE5",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <ErrorOutline sx={{ color: "#FFBA2E" }} />
                  </Box>
                ) : cellValues?.row?.paymentType === "Pay out" ? (
                  <Box
                    sx={{
                      backgroundColor: "#FFEBEB",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <CallMade sx={{ color: "#F44336" }} />
                  </Box>
                ) : cellValues?.row?.paymentType === "Pay in" ? (
                  <Box
                    sx={{
                      backgroundColor: "#B6E1D2",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CallReceived sx={{ color: "#20B07C" }} />
                  </Box>
                ) : (
                  ""
                )}
                <Box width="24px" />
                <Box display="flex" flexDirection="column">
                  <Typography color="#101010" fontWeight="500">
                    {cellValues.row?.projectTitle}{" "}
                    {/* {response.attributes?.LastName} */}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#CFCFD5",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    {cellValues.row?.paymentRequestId}
                  </Typography>
                </Box>
              </>
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography color="#101010" fontWeight="500">
              {cellValues.row.department}
            </Typography>
            <Typography fontWeight="400" color="#3F4158">
              By {cellValues.row.paidTo}
            </Typography>

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
      headerName: "Payment Date",
      width: 180,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography color="#101010" fontWeight="500">
              {" "}
              {dayjs(cellValues.row?.date).format("DD MMM, YYYY")}
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "paymentAmount",
      headerName: "Payment Amount",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {cellValues.row?.paymentAmount}
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "approvals",
      headerName: "Approval",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              Head of Finance
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 200,
      renderCell: (cellValues) => {
        // console.log({ cellValues });
        return (
          <>
            {cellValues.row?.paymentStatus === "pending" ? (
              <Button
                sx={{
                  backgroundColor: "#FFBA2E",
                  borderRadius: "20px",
                  color: "#F6F6F6",
                }}
              >
                PENDING
              </Button>
            ) : cellValues.row?.paymentStatus === "approved" ? (
              <Button
                sx={{
                  backgroundColor: "#24B07D",
                  borderRadius: "20px",
                  color: "#F6F6F6",
                }}
              >
                COMPLETED
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [status, setStatus] = useState("");

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readPaymentsRequests(jwt);
      setResponse(result.data);
    };
    fetchData();
    console.log(response);
  }, [user]);

  dayjs.extend(relativeTime);

  const monthNames = [
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
  let monthIndex = new Date().getMonth();
  let monthName = monthNames[monthIndex];
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
              response?.data
                ?.filter((i) => i?.attributes?.paymentType === "Pay out")
                .map((e) => {
                  return {
                    id: e?.id,
                    paymentName:
                      e?.attributes?.status +
                      e?.attributes?.paymentType +
                      e?.attributes?.projectTitle +
                      e?.attributes?.vendorId,
                    title: e?.attributes?.title,
                    projectTitle: e?.attributes?.projectTitle,
                    status: e.attributes?.status,
                    date: e?.attributes?.requestDate,
                    //   date: dayjs(e?.attributes?.date).format("DD MMM YYYY"),
                    paymentStatus: e.attributes?.isApproved,
                    employeeImage: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${e?.attributes?.employeeImage?.data?.attributes?.url}`,
                    paymentAmount: e?.attributes?.paymentAmount,

                    department:
                      e?.attributes?.employee?.data?.attributes?.department,
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

export default Payouts;
