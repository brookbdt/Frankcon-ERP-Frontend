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
import { readWorkshopTasks } from "../../pages/api";

const Pending = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  dayjs.extend(relativeTime);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readWorkshopTasks(jwt);
      setResponse(result.data);
    };
    fetchData();
    console.log(response);
  }, [user]);

  const [status, setStatus] = useState("pending");

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Workshop Task Title
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Department
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Post Date
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Delivery Date
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Attachments
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Payment Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response?.data?.map((item) => (
            <>
              {item?.attributes?.paymentStatus === "pending" ? (
                <>
                  <TableRow key={item?.id}>
                    <TableCell>
                      <>
                        <Box display="flex">
                          {item?.attributes?.paymentStatus === "pending" ? (
                            <Box
                              width="44px"
                              height="44px"
                              borderRadius="50%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              bgcolor={
                                item?.attributes?.paymentStatus === "pending"
                                  ? "#FFFAE5"
                                  : "#FFEBEB"
                              }
                            >
                              <ErrorOutline sx={{ color: "#FFBA2E" }} />
                            </Box>
                          ) : item?.attributes?.paymentStatus ===
                            "on progress" ? (
                            <Box
                              width="44px"
                              height="44px"
                              borderRadius="50%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              bgcolor={
                                item?.attributes?.paymentStatus ===
                                "on progress"
                                  ? "#B6E1D2"
                                  : "#FFEBEB"
                              }
                            >
                              <Check sx={{ color: "#24B07D" }} />
                            </Box>
                          ) : (
                            <Box
                              width="44px"
                              height="44px"
                              borderRadius="50%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              bgcolor={
                                item?.attributes?.paymentStatus === "cancelled"
                                  ? "#FFEAEB"
                                  : "#FFEBEB"
                              }
                            >
                              <Clear sx={{ color: "#F44336" }} />
                            </Box>
                          )}
                          <Box width="12px" />
                          <Stack>
                            <Typography
                              fontWeight="500"
                              fontSize="16px"
                              color="#101010"
                            >
                              {item?.attributes?.taskTitle}
                            </Typography>
                            <Typography
                              fontWeight="400"
                              fontSize="12px"
                              color="#3F4158"
                            >
                              ####
                            </Typography>
                          </Stack>
                        </Box>
                      </>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontSize="16px"
                        fontWeight="500"
                        color="#3F4158"
                      >
                        {item?.attributes?.department}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="500" color="#101010">
                        {dayjs(item?.attributes?.postDate).format(
                          "DD MMM YYYY"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="500" color="#101010">
                        {dayjs(item?.attributes?.deliveryDate).format(
                          "DD MMM YYYY"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Box display="flex">
                        <Typography
                          fontSize="14px"
                          fontWeight="500"
                          color="#3F4158"
                        >
                          VIEW PROJECT FILES
                        </Typography>
                      </Box>{" "}
                    </TableCell>
                    <TableCell>
                      {item?.attributes?.paymentStatus === "pending" ? (
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            backgroundColor: "#FFBA2E",
                            borderRadius: "100px",
                            fontSize: "11px",
                          }}
                        >
                          PENDING
                        </Button>
                      ) : item?.attributes?.paymentStatus === "on progress" ? (
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            backgroundColor: "#24B07D",
                            borderRadius: "100px",
                            fontSize: "11px",
                          }}
                        >
                          ON PROGRESS
                        </Button>
                      ) : item?.attributes?.paymentStatus === "cancelled" ? (
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            backgroundColor: "#F44336",
                            borderRadius: "100px",
                            fontSize: "11px",
                          }}
                        >
                          CANCELLED
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                ""
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Pending;
