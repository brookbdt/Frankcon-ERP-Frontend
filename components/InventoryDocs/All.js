import { ArrowOutward, CallReceived } from "@mui/icons-material";
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
import { readInventoryDocs } from "../../lib";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const All = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  dayjs.extend(relativeTime);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readInventoryDocs(jwt);
      setResponse(result.data);
    };
    fetchData();
    console.log(response);
  }, [user]);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Item Title
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Item Type
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Request Date
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Material Destination
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Material Quantity
            </TableCell>
            <TableCell sx={{ fontWeight: "700", fontSize: "16x" }}>
              Request Detail
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response?.data?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>
                <>
                  <Box display="flex">
                    {item?.attributes?.requestType === "inboundreceiving" ? (
                      <Box
                        width="44px"
                        height="44px"
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor={
                          item?.attributes?.requestType === "inboundreceiving"
                            ? "#B6E1D2"
                            : "#FFEBEB"
                        }
                      >
                        <CallReceived sx={{ color: "#20B07C" }} />
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
                          item?.attributes?.requestType === "inboundreceiving"
                            ? "#B6E1D2"
                            : "#FFEBEB"
                        }
                      >
                        <ArrowOutward sx={{ color: "#F44336" }} />
                      </Box>
                    )}
                    <Box width="12px" />
                    <Stack>
                      {item.attributes?.requestType === "inboundreceiving" ? (
                        <>
                          <Typography
                            fontWeight="500"
                            fontSize="16px"
                            color="#101010"
                          >
                            {
                              item?.attributes?.inboundreceivingform?.data
                                ?.attributes?.itemName
                            }
                          </Typography>
                          <Typography
                            fontWeight="400"
                            fontSize="12px"
                            color="#3F4158"
                          >
                            ####
                          </Typography>
                        </>
                      ) : (
                        <>
                          {
                            item?.attributes?.materialtransferrequest?.data
                              ?.attributes?.requesterName
                          }
                          <Typography
                            fontWeight="400"
                            fontSize="12px"
                            color="#3F4158"
                          >
                            ####
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Box>
                </>
              </TableCell>
              <TableCell>
                {item?.attributes?.requestType === "inboundreceiving" ? (
                  <Typography fontSize="16px" fontWeight="500" color="#3F4158">
                    {
                      item?.attributes?.inboundreceivingform?.data?.attributes
                        ?.requestType
                    }
                  </Typography>
                ) : (
                  <Typography fontSize="16px" fontWeight="500" color="#3F4158">
                    {
                      item?.attributes?.materialtransferrequest?.data
                        ?.attributes?.itemType
                    }
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {item?.attributes?.requestType === "inboundreceiving" ? (
                  <Typography fontWeight="500" color="#101010">
                    {dayjs(
                      item?.attributes?.inboundreceivingform?.data?.attributes
                        ?.leaveEndDate
                    ).format("DD MMM YYYY")}
                  </Typography>
                ) : (
                  <Typography fontWeight="500" color="#101010">
                    {dayjs(
                      item?.attributes?.materialtransfer?.data?.attributes
                        ?.requestDate
                    ).format("DD MMM YYYY")}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {item?.attributes?.requestType === "inboundreceiving" ? (
                  <Typography fontSize="16px" fontWeight="500" color="#3F4158">
                    Addis Ababa
                  </Typography>
                ) : (
                  <Typography fontSize="16px" fontWeight="500" color="#3F4158">
                    {
                      item?.attributes?.materialtransferrequest?.data
                        ?.attributes?.transferLocation
                    }
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {" "}
                <Box display="flex">
                  {item?.attributes?.requestType === "inboundreceiving" ? (
                    <Typography
                      fontSize="16px"
                      fontWeight="500"
                      color="#3F4158"
                    >
                      {
                        item?.attributes?.inboundreceivingform?.data?.attributes
                          ?.itemQuantity
                      }
                    </Typography>
                  ) : (
                    <Typography
                      fontSize="16px"
                      fontWeight="500"
                      color="#3F4158"
                    >
                      {
                        item?.attributes?.materialtransferrequest?.data
                          ?.attributes?.itemQuantity
                      }
                    </Typography>
                  )}
                  <Box width="5px" />
                  <Typography>items</Typography>
                </Box>{" "}
              </TableCell>
              <TableCell>
                <Button
                  // onClick={handleOpen}
                  sx={{
                    color: "#9FA0AB",
                    fontWeight: "700",
                    fontSize: "11px",
                  }}
                >
                  VIEW ITEM DETAIL
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default All;
