import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
import { readAllMaterialTransferRequest, readInboundReceivingForm, readInventory } from "../../lib";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import DataTable from "../DataTable";

const All = ({ jwt }) => {
    const { user, loading } = useFetchUser();
    const { userDepartment } = useFetchUserDepartment();
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    const [materialResponse, setMaterialResponse] = useState([]);
    const [inboundResponse, setInboundResponse] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                return;
            }
            const materialTransferResult = await readAllMaterialTransferRequest(jwt);
            const inboundReceivingResult = await readInboundReceivingForm(jwt);
            setMaterialResponse(materialTransferResult.data);
            setInboundResponse(inboundReceivingResult.data);
        };
        fetchData();

    }, [user]);

    const columns = [
        {
            field: "itemTitle",
            headerName: (
                <Typography fontWeight="700" fontSize="14px" color="#0F112E">
                    {" "}
                    Item Name
                </Typography>
            ),
            width: 250,
            renderCell: (cellValues) => {
                console.log({ cellValues });
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">

                        <Box width="12px" />
                        <Stack>
                            <Typography fontWeight="500" color="#101010">
                                {cellValues?.row?.itemName}
                                {cellValues?.row?.itemType}
                            </Typography>
                            <Typography fontWeight="400" color="#3F4158">
                                {cellValues?.row?.requestType}
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
                    Department
                </Typography>
            ),
            width: 150,
            renderCell: (cellValues) => {
                console.log({ cellValues });
                return (
                    <Stack>
                        <Typography>
                            {cellValues?.row?.department}

                        </Typography>

                        <Typography fontSize="12px" color="#3F4158">
                            {cellValues?.row?.employee}
                        </Typography>
                    </Stack>
                );
            },
        },

        {
            field: "requestDate",
            headerName: (
                <Typography fontWeight="700" fontSize="14px" color="#0F112E">
                    Request Date
                </Typography>
            ),
            width: 150,
            renderCell: (cellValues) => {
                console.log({ cellValues });
                return (
                    <Stack justifyContent="center">
                        <Typography fontWeight="500">
                            {" "}
                            {dayjs(cellValues.row?.requestDate).utc().format("DD MMM, YYYY")}
                            {/* {cellValues.attributes?.date} */}
                        </Typography>
                    </Stack>
                );
            },
        },
        {
            field: "materialDestination",
            headerName: (
                <Typography fontWeight="700" fontSize="14px" color="#0F112E">
                    Material Destination
                </Typography>
            ),
            width: 200,
            renderCell: (cellValues) => {
                console.log({ cellValues });

                return (
                    <Stack justifyContent="center">
                        {(Number(cellValues.row?.originalItemQuantity) *
                            Number(cellValues?.row?.itemAmount)) /
                            100 <=
                            Number(cellValues.row?.itemQuantity) ? (
                            <Typography fontWeight="700">INSTOCK</Typography>
                        ) :
                            Number(cellValues.row?.itemQuantity) === 0 ? (
                                <Typography fontWeight="500" color="#F44336">
                                    OUT OF STOCK
                                </Typography>
                            )
                                :
                                (Number(cellValues.row?.originalItemQuantity) *
                                    Number(cellValues?.row?.itemAmount)) /
                                    100 >
                                    (Number(cellValues.row?.itemQuantity)) && (Number(cellValues.row?.originalItemQuantity) *
                                        Number(cellValues?.row?.itemAmount)) /
                                    100 !== 0 ? (
                                    <Typography fontWeight="700" color="#FFBA2F">
                                        DEPLETED
                                    </Typography>
                                )
                                    : (
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
                    Material Quantity
                </Typography>
            ),
            width: 200,
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

    ];
    const taskTableStyles = {
        height: "950px",
        border: 0,
        width: "100%",
    };

    return (
        <DataTable
            rows={
                inboundResponse?.data?.map((e) => {
                    return {
                        id: e?.id,
                        itemName: e?.attributes?.itemName,
                        requestType: e?.attributes?.requestType,
                        department: e?.attributes?.department,
                        // isApproved: e?.attributes?.isApproved,
                        employee: e?.attributes?.employee,
                        //   attachments: e?.attributes?.files,
                        leaveEndDate: e.attributes?.leaveEndDate,
                        materialDestination: 'Workshop',
                        itemQuantity: e.attributes?.itemQuantity,
                        originalItemQuantity: e.attributes?.originalItemQuantity,
                    };
                },
                    // materialResponse?.data?.map((e) => {
                    //   return {
                    //     id: e?.id,
                    //     itemType: e?.attributes?.itemType,
                    //     materialTransferId: e?.attributes?.materialTransferId,
                    //     department: e?.attributes?.department,
                    //     requesterName: e?.attributes?.requesterName,
                    //     requestDate: e?.attributes?.requestDate,
                    //     transferLocation: e?.attributes?.transferLocation,
                    //     itemQuantity: e.attributes?.itemQuantity,
                    //   };
                    // })
                ) ?? []
            }
            columns={columns}
            // className={classes.root}
            loading={!inboundResponse?.length && !materialResponse?.length}
            sx={taskTableStyles}
            checkboxSelection
        />
    );
};

export default All;
