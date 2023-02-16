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
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readInventory } from "../../lib";
import Image from "next/image";
import DataTable from "../DataTable";

const Instock = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  dayjs.extend(relativeTime);
  const [response, setResponse] = useState([]);

  const columns = [
    {
      field: "itemName",
      headerName: "Workshop Task Title",
      width: 250,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar src={cellValues?.row.tagImage} />
            <Box width="12px" />
            <Stack>
              <Typography fontWeight="500" color="#101010">
                {cellValues?.row?.itemName}
              </Typography>
              <Typography fontWeight="400" color="#3F4158">
                {cellValues?.row?.tagRegistrationID}
              </Typography>
            </Stack>
          </Box>
        );
      },
    },

    {
      field: "itemStorageLocation",
      headerName: "Item Location",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack>
            <Typography>Project Site</Typography>

            <Typography fontSize="12px" color="#3F4158">
              {cellValues?.row?.itemStorageLocation}
            </Typography>
          </Stack>
        );
      },
    },

    {
      field: "createdAt",
      headerName: "Last Purchase Date",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {dayjs(cellValues.row?.createdAt).format("DD MMM, YYYY")}
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "itemAmount",
      headerName: "Depletion Status",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {cellValues.row?.itemAmount}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "itemQuantity",
      headerName: "Item Quantity",
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500">
              {" "}
              {cellValues.row?.itemQuantity} items
              {/* {cellValues.attributes?.date} */}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "additionalInfo",
      headerName: "Additional Info",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Button
            sx={{ fontSize: "11px", color: "#9FA0AB", fontWeight: "700" }}
          >
            VIEW ITEM DETAIL
          </Button>
        );
      },
    },
  ];
  const taskTableStyles = {
    height: "950px",
    border: 0,
    width: "100%",
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await readInventory(jwt);
      setResponse(result.data.data);
    };
    fetchData();
  }, [user]);
  return (
    <DataTable
      rows={
        response
          // ?.filter((e) => e.attributes?.itemStorageLocation === "Wello Sefer")
          ?.filter((e) => e.attributes?.itemQuantity === "0")
          .map((e) => {
            return {
              id: e?.id,
              itemName: e?.attributes?.itemName,
              tagRegistrationID: e?.attributes?.tagRegistrationID,
              itemStorageLocation: e?.attributes?.itemStorageLocation,
              // isApproved: e?.attributes?.isApproved,
              createdAt: e?.attributes?.createdAt,
              //   attachments: e?.attributes?.files,
              itemAmount: e.attributes?.itemAmount,
              itemQuantity: e.attributes?.itemQuantity,
              tagImage: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${e?.attributes?.tagImage?.data?.attributes?.url}`,
            };
          }) ?? []
      }
      columns={columns}
      // className={classes.root}
      loading={!response?.length}
      sx={taskTableStyles}
      checkboxSelection
    />
  );
};

export default Instock;
