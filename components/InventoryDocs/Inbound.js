import { CallReceived } from "@mui/icons-material";
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
import { readInboundReceivingForm, readInventoryDocs } from "../../lib";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const Inbound = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  dayjs.extend(relativeTime);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }
      const result = await readInboundReceivingForm(jwt);
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
              Department
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

          </TableRow>
        </TableHead>
        <TableBody>
          {response?.data?.map((item) =>

            <TableRow key={item?.id}>
              <TableCell>
                <>
                  <Box display="flex">
                    <Box
                      width="44px"
                      height="44px"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#B6E1D2"


                    >
                      <CallReceived sx={{ color: "#24B07D" }} />
                    </Box>
                    <Box width="12px" />
                    <Stack>
                      <Typography
                        fontWeight="500"
                        fontSize="16px"
                        color="#101010"
                      >
                        {
                          item?.attributes?.itemName
                        }
                      </Typography>
                      <Typography
                        fontWeight="400"
                        fontSize="12px"
                        color="#3F4158"
                      >
                        {
                          item?.attributes?.requestType
                        }
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
                  {
                    item?.attributes?.department
                  }
                </Typography>
                <Box display="flex">
                  <Typography
                    fontSize="12px"
                    fontWeight="400"
                    color="#3F4158"
                  >By</Typography>
                  <Box width="5px" />
                  <Typography
                    fontSize="12px"
                    fontWeight="400"
                    color="#3F4158"
                  >
                    {
                      item?.attributes?.employee
                    }
                  </Typography>
                </Box>

              </TableCell>
              <TableCell>

                <Typography fontWeight="500" color="#101010">
                  {dayjs(
                    item?.attributes?.leaveEndDate
                  ).utc().format("DD MMM YYYY")}
                </Typography>

              </TableCell>
              <TableCell>

                <Typography
                  fontSize="16px"
                  fontWeight="500"
                  color="#3F4158"
                >
                  Workshop
                </Typography>



              </TableCell>
              <TableCell>
                {" "}
                <Box display="flex">

                  <Typography
                    fontSize="16px"
                    fontWeight="500"
                    color="#3F4158"
                  >
                    {
                      item?.attributes?.itemQuantity
                    }
                  </Typography>

                  <Box width="5px" />
                  <Typography>items</Typography>
                </Box>{" "}
              </TableCell>

            </TableRow>

          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Inbound;
