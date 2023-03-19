import { ArrowOutward } from "@mui/icons-material";
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
import { readAllMaterialTransferRequest, readInventoryDocs } from "../../lib";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const MaterialTransfer = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  dayjs.extend(relativeTime);

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }
      const result = await readAllMaterialTransferRequest(jwt);
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
              Item Name
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
                      bgcolor={
                        "#FFEBEB"
                      }
                    >
                      <ArrowOutward sx={{ color: "#F44336" }} />
                    </Box>
                    <Box width="12px" />
                    <Stack>
                      <Typography
                        fontWeight="500"
                        fontSize="16px"
                        color="#101010"
                      >
                        {
                          item?.attributes?.itemType
                        }
                      </Typography>
                      <Typography
                        fontWeight="400"
                        fontSize="12px"
                        color="#3F4158"
                      >
                        {item?.attributes?.materialTransferId}
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
                <Typography fontSize="16px" fontWeight="500" color="#3F4158">
                  By {
                    item?.attributes?.requesterName}
                </Typography>

              </TableCell>
              <TableCell>

                <Typography fontWeight="500" color="#101010">
                  {dayjs(
                    item?.attributes?.requestDate
                  ).utc().format("DD MMM YYYY")}
                </Typography>

              </TableCell>
              <TableCell>

                <Typography
                  fontSize="16px"
                  fontWeight="500"
                  color="#3F4158"
                >
                  {
                    item?.attributes?.transferLocation
                  }
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

export default MaterialTransfer;
