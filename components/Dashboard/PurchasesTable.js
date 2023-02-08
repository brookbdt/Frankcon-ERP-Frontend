import React, { useEffect, useState } from "react";
import { useFetchUser } from "../../lib/authContext";
import { readPaymentsRequests, readPurchaseRequest } from "../../pages/api";
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

const PurchasesTable = ({ jwt }) => {
  const [response, setResponse] = useState([]);
  const { user, loading } = useFetchUser();
  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const result = await readPurchaseRequest(jwt, user);
      setResponse(result.data);
      // console.log({response})
    };
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);
    console.log("relation is:", response);
  }, [user]);

  const columns = [
    { id: "Item Name", label: "Item Name" },
    {
      id: "Item Type",
      label: "Item Type",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Item Quantity",
      label: "Item Quantity",
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
    {
      id: "Vendor Name",
      label: "Vendor Name",
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
            {response?.data?.map((purchase, index) => (
              <TableRow key={purchase.data?.id}>
                <TableCell>
                  <Stack paddingY="24px" direction="row">
                    <Stack direction="row">
                      <>
                        <Box display="flex" flexDirection="column">
                          <Typography>
                            {purchase.attributes?.itemName}
                          </Typography>
                          {/* <Typography>task - Updated 1 day ago</Typography> */}
                        </Box>
                      </>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography>{purchase.attributes?.itemType}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{purchase.attributes?.itemQuantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {dayjs(purchase?.attributes?.requestDate).format(
                      "DD MMM, YYYY"
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{purchase.attributes?.vendorName}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PurchasesTable;
