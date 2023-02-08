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
import { readInventory } from "../../pages/api";
import Image from "next/image";
import DataTable from "../DataTable";

const All = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  dayjs.extend(relativeTime);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readInventory(jwt);
      console.log({ result });
      setResponse(result.data.data);
    };
    fetchData();
    console.log("inventory items", { response });
  }, [user]);

  const columns = [
    {
      field: "itemName",
      headerName: (
        <Typography fontWeight="700" fontSize="14px" color="#0F112E">
          {" "}
          Workshop Task Title
        </Typography>
      ),
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
      headerName: (
        <Typography fontWeight="700" fontSize="14px" color="#0F112E">
          Item Location
        </Typography>
      ),
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
      headerName: (
        <Typography fontWeight="700" fontSize="14px" color="#0F112E">
          Last Purchase Date
        </Typography>
      ),
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
      headerName: (
        <Typography fontWeight="700" fontSize="14px" color="#0F112E">
          Depletion Status
        </Typography>
      ),
      width: 150,
      renderCell: (cellValues) => {
        console.log({ cellValues });

        return (
          <Stack justifyContent="center">
            {(Number(cellValues.row?.originalItemQuantity) *
              Number(cellValues?.row?.itemAmount)) /
              100 <=
            Number(cellValues.row?.itemQuantity) ? (
              <Typography fontWeight="700">INSTOCK</Typography>
            ) : (Number(cellValues.row?.originalItemQuantity) *
                Number(cellValues?.row?.itemAmount)) /
                100 >
              Number(cellValues.row?.itemQuantity) ? (
              <Typography fontWeight="700" color="#FFBA2F">
                DEPLETED
              </Typography>
            ) : Number(cellValues.row?.itemQuantity) === 0 ? (
              <Typography fontWeight="500" color="#F44336">
                OUT OF STOCK
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        );
      },
    },
    {
      field: "itemQuantity",
      headerName: (
        <Typography fontWeight="700" fontSize="14px" color="#0F112E">
          Item Quantity
        </Typography>
      ),
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
      headerName: (
        <Typography fontWeight="700" fontSize="14px" color="#0F112E">
          Additional Info
        </Typography>
      ),
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

  return (
    <DataTable
      rows={
        response?.map((e) => {
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
            originalItemQuantity: e.attributes?.originalItemQuantity,
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

export default All;
