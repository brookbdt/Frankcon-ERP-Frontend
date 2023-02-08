import React, { useEffect, useState } from "react";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import { readPaymentsRequests } from "../../pages/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  AttachFile,
  CallMade,
  CallReceived,
  CheckCircleOutline,
  CloseOutlined,
  ErrorOutline,
  HelpOutline,
  LocationOnOutlined,
  MoreHoriz,
  ShoppingCart,
  ShoppingCartOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ChangingButton from "../ChangingButton";

const Payins = ({ jwt }) => {
  const [purchaseId, setPurchaseId] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "544px",
    height: "750px",
    borderRadius: "10px",
    bgcolor: "background.paper",
    paddingLeft: "24px",
    paddingRight: "64px",
    paddingtop: "21px",
    // border: "2px solid #000",
    // boxShadow: 24,
    p: 4,
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
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Payment Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Approvals</TableCell>
            <TableCell>Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response?.data?.map((response) => (
            <TableRow key={response?.id}>
              {response?.attributes?.paymentType === "Pay in" ? (
                <>
                  <TableCell>
                    <Stack paddingY="24px" direction="row">
                      <Stack direction="row">
                        <>
                          <>
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
                            <Box width="24px" />
                            <Box display="flex" flexDirection="column">
                              <Typography>
                                {response.attributes?.projectTitle}{" "}
                                {/* {response.attributes?.LastName} */}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#CFCFD5",
                                  fontWeight: "400",
                                  fontSize: "12px",
                                }}
                              >
                                {response.attributes?.vendorId}
                              </Typography>
                            </Box>
                          </>
                        </>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography>
                        {" "}
                        {response.attributes?.department}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "#CFCFD5",
                        }}
                      >
                        {" "}
                        <Box display="flex">
                          By
                          <Box width="5px" />
                          {
                            response.attributes?.employee?.data?.attributes
                              ?.firstName
                          }{" "}
                          {
                            response.attributes?.employee?.data?.attributes
                              ?.lastName
                          }
                        </Box>
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {dayjs(response?.attributes?.requestDate).format(
                        "DD MMM YYYY"
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      ETB {response.attributes?.paymentAmount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Head of Finance</Typography>
                  </TableCell>
                  <TableCell>
                    <ChangingButton
                      color={
                        response?.attributes?.status === "pending"
                          ? "#FFBA2E"
                          : response?.attributes?.status === "complete"
                          ? "#24B07D"
                          : "gray"
                      }
                      values={["pending", "complete"]}
                      selectedValue={status}
                      onChange={setStatus}
                    />
                    <Fade in={open}>
                      <Box sx={style}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography fontWeight="700" fontSize="20px">
                            Request Order Detail
                          </Typography>
                          <IconButton
                            borderRadius="50%"
                            sx={{ backgroundColor: "#F6F6F6" }}
                            width="24px"
                            height="24px"
                            onClick={handleClose}
                          >
                            <CloseOutlined
                              sx={{
                                // width: "10px",
                                // height: "10px",
                                color: "#9FA0AB",
                              }}
                            />
                          </IconButton>
                        </Stack>
                        <Box height="12px" />
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${response?.attributes?.vendorImage?.data?.[0]?.attributes?.url}`}
                          />
                          <Box width="20px" />
                          <Typography
                            color="#4339F2"
                            fontWeight="700"
                            fontSize="20px"
                          >
                            {response.attributes?.itemName}{" "}
                          </Typography>
                        </Box>
                        <Box height="12px" />
                        <Typography
                          fontWeight="400"
                          fontSize="12px"
                          color="#3F4158"
                        >
                          {response.attributes?.additionalDetail}
                        </Typography>
                        <Box height="20px" />
                        <Box display="flex" alignItems="center">
                          <IconButton
                            fullWidth
                            variant="contained"
                            sx={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor: "#4339F2",
                            }}
                          >
                            <HelpOutline
                              sx={{
                                color: "white",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </IconButton>
                          <Divider
                            sx={{ width: "70px", borderBottomWidth: "5px" }}
                          />
                          <IconButton
                            fullWidth
                            variant="contained"
                            sx={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor:
                                response.attributes?.isApproved === "pending"
                                  ? "#E7E7EA"
                                  : "#4339F2",
                            }}
                          >
                            <CheckCircleOutline
                              sx={{
                                color:
                                  response.attributes?.isApproved === "pending"
                                    ? "#E7E7EA"
                                    : "white",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </IconButton>
                          <Divider
                            sx={{ width: "70px", borderBottomWidth: "5px" }}
                          />
                          <IconButton
                            fullWidth
                            variant="contained"
                            sx={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor:
                                response.attributes?.isApproved ===
                                "in purchase"
                                  ? "#24B07D"
                                  : "#E7E7EA",
                            }}
                          >
                            <ShoppingCartOutlined
                              sx={{
                                color:
                                  response.attributes?.isApproved ===
                                  "in purchase"
                                    ? "#E7E7EA"
                                    : "#9FA0AB",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </IconButton>
                          <Divider
                            sx={{ width: "70px", borderBottomWidth: "5px" }}
                          />
                          <IconButton
                            fullWidth
                            variant="contained"
                            sx={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor:
                                response.attributes?.isApproved ===
                                "on delivery"
                                  ? "#FFBA2E"
                                  : "#E7E7EA",
                            }}
                          >
                            <LocationOnOutlined
                              sx={{
                                color:
                                  response.attributes?.isApproved ===
                                  "on delivery"
                                    ? "#E7E7EA"
                                    : "#9FA0AB",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </IconButton>
                          <Divider
                            sx={{ width: "70px", borderBottomWidth: "5px" }}
                          />
                          <IconButton
                            fullWidth
                            variant="contained"
                            sx={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor:
                                response.attributes?.isApproved === "delivered"
                                  ? "#101010"
                                  : "#E7E7EA",
                            }}
                          >
                            <WorkOutlineOutlined
                              sx={{
                                color:
                                  response.attributes?.isApproved ===
                                  "delivered"
                                    ? "#E7E7EA"
                                    : "#9FA0AB",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </IconButton>
                        </Box>
                        <Box height="4px" />
                        <Box display="flex" alignItems="center">
                          <Typography
                            fontSize="12px"
                            fontWeight="400"
                            color="#3F4158"
                          >
                            Requested
                          </Typography>
                          <Box width="33px" />
                          <Typography
                            fontSize="12px"
                            fontWeight="400"
                            color="#3F4158"
                          >
                            Approved
                          </Typography>
                          <Box width="45px" />
                          <Typography
                            fontSize="12px"
                            fontWeight="400"
                            color="#3F4158"
                          >
                            In purchase
                          </Typography>
                          <Box width="40px" />
                          <Typography
                            fontSize="12px"
                            fontWeight="400"
                            color="#3F4158"
                          >
                            On Delivery
                          </Typography>
                          <Box width="33px" />
                          <Typography
                            fontSize="12px"
                            fontWeight="400"
                            color="#3F4158"
                          >
                            Delivered
                          </Typography>
                          <Box width="33px" />
                        </Box>
                        <Box height="24px" />
                        <Box display="flex" alignItems="center">
                          <Stack>
                            <Typography
                              sx={{
                                color:
                                  response.attributes?.isApproved ===
                                  "in purchase"
                                    ? "#22B07D"
                                    : "#0F112E",
                                fontSize: "20px",
                                fontWeight: "700",
                              }}
                            >
                              {" "}
                              {response.attributes?.isApproved}
                            </Typography>
                            <Typography
                              fontSize="12px"
                              fontWeight="400"
                              color="#3F4158"
                            >
                              Status
                            </Typography>
                          </Stack>
                          <Box width="24px" />
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                          />
                          <Box width="24px" />
                          <Stack>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: "700",
                                color: "#0F112E",
                              }}
                            >
                              {dayjs(response.attributes?.requestDate).fromNow(
                                true
                              )}
                            </Typography>
                            <Typography
                              fontSize="12px"
                              fontWeight="400"
                              color="#3F4158"
                            >
                              Elapsed Time
                            </Typography>
                          </Stack>
                        </Box>
                        <Box height="24px" />
                        <Box display="flex" alignItems="center">
                          <Typography
                            fontWeight="700"
                            fontSize="16px"
                            color="#3F4158"
                          >
                            Items Information
                          </Typography>
                          <Box width="5px" />
                          <Divider
                            width="311px"
                            sx={{
                              borderBottomWidth: "1px",
                              backgroundColor: "#F6F6F6",
                            }}
                          />
                        </Box>
                        <Box height="20px" />
                        <Stack
                          direction="row"
                          paddingLeft="12px"
                          paddingRight="100px"
                          justifyContent="space-between"
                        >
                          <Stack>
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Item Type
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                {response.attributes?.itemType}
                              </Typography>
                            </Stack>
                            <Box height="12px" />
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Purchase Request ID
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                {response?.attributes?.purchaseId}
                              </Typography>
                            </Stack>
                            <Box height="12px" />
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Request Approved By
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                {response?.attributes?.approvedBy}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack>
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Item Quantity
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                {response?.attributes?.itemQuantity}
                              </Typography>
                              <Box height="12px" />
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Total Item Price
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                ETB {response?.attributes?.itemTotalPrice}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                        <Box height="20px" />
                        <Box display="flex" alignItems="center">
                          <Typography
                            fontWeight="700"
                            fontSize="16px"
                            color="#3F4158"
                          >
                            Purchase Information
                          </Typography>
                          <Box width="5px" />
                          <Divider
                            width="285px"
                            sx={{
                              borderBottomWidth: "1px",
                              backgroundColor: "#F6F6F6",
                            }}
                          />
                        </Box>
                        <Box height="20px" />
                        <Stack
                          direction="row"
                          paddingLeft="12px"
                          paddingRight="100px"
                          justifyContent="space-between"
                        >
                          <Stack>
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Responsible Department
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                {response.attributes?.responsibleDepartment}
                              </Typography>
                            </Stack>
                            <Box height="12px" />
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Request Date
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                {dayjs(
                                  response?.attributes?.requestDate
                                ).format("DD MMMM  YYYY")}
                              </Typography>
                            </Stack>
                            <Box height="12px" />
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Affiliated Project
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                TODO
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack>
                            <Stack>
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Purchaser Name
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                TODO
                              </Typography>
                              <Box height="12px" />
                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Requester Name
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                {response?.attributes?.requesterName}
                              </Typography>
                              <Box height="12px" />

                              <Typography
                                fontWeight="700"
                                fontSize="12px"
                                color="#6F7082"
                              >
                                Delivery Location
                              </Typography>
                              <Typography
                                fontWeight="500"
                                fontSize="14px"
                                color="#0F112E"
                              >
                                TODO
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Box>
                    </Fade>
                  </TableCell>
                </>
              ) : (
                ""
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Payins;
