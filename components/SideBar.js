import {
  AccountBox,
  Article,
  Group,
  Home,
  LocalShippingOutlined,
  PeopleOutline,
  Person,
  Settings,
  ShoppingCart,
  ShoppingCartCheckout,
  ShoppingCartOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DomainIcon from "@mui/icons-material/Domain";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  Collapse,
  createTheme,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import {
  editInventory,
  editLeaveRequest,
  editMaterialTransfer,
  editPaymentRequest,
  editPurchaseRequest,
  getInventoryQuantity,
  readInventory,
  readMaterialTransferRequest,
  readNotification,
  readPurchaseRequest,
} from "../lib";
import Notifications from "./Notifications";
import EngineeringIcon from "@mui/icons-material/Engineering";
import dayjs from "dayjs";

const SideBar = ({
  children,
  firstListIcon,
  secondListIcon,
  thirdListIcon,
  fourthListIcon,
  fifthListIcon,
  sixthListIcon,
  seventhListIcon,
  eighthListIcon,
  firstListItemText,
  secondListItemText,
  thirdListItemText,
  fourthListItemText,
  fifthListItemText,
  sixthListItemText,
  seventhListItemText,
  eighthListItemText,
  firstDropDownItems,
  secondDropDownItems,
  thirdDropDownItems,
  fourthDropDownItems,
  jwt,
  purchaseRequestResponse,
}) => {
  // const { user, userDepartment, loading } = useFetchUser();

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [open, setOpen] = React.useState(false);
  const [openList, setOpenList] = React.useState(false);
  const [openListHR, setOpenListHR] = React.useState(false);
  const [openListInventory, setOpenListInventory] = React.useState(false);
  const [openListWorkshop, setOpenListWorkshop] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleList = () => {
    setOpenList(!openList);
  };
  const handleListHR = () => {
    setOpenListHR(!openListHR);
  };
  const handleListInventory = () => {
    setOpenListInventory(!openListInventory);
  };
  const handleListWorkshop = () => {
    setOpenListWorkshop(!openListWorkshop);
  };

  const [components, setComponents] = useState([""]);

  function addComponent() {
    setComponents([...components, <Notifications />]);
  }

  const handleClose = () => setOpen(false);

  const SideBox = styled(Box)(({ theme }) => ({
    // display: "column",
    alignItems: "center",
    // gap: "10px",
    // [theme.breakpoints.up("sm")]: {
    // 	display: "none",
    // },
  }));

  const style = {
    position: "absolute",
    top: "70%",
    left: "31%",
    transform: "translate(-50%, -50%)",
    width: "440px",
    height: "604px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };

  const Status = styled("div")(({ theme }) => ({
    display: "flex",
    backgroundColor: "white",
    padding: "8px",
    borderRadius: "8px",
    width: "100%",
  }));

  const theme = createTheme({
    components: {
      MuiListItemText: {
        variants: [
          {
            props: {
              variant: "title",
            },
            style: {
              fontSize: 14,
              fontWeight: 400,
              color: "white",
            },
          },
        ],
      },
    },
  });

  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [response, setResponse] = useState([]);
  useEffect(() => {
    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("response is", { response });
  }, []);

  const handleRequest = async (
    isApproved,
    purchaseRequestId,
    requesterName,
    itemName
  ) => {
    // optimistic update
    console.log({ response });

    setResponse(
      response.map((r) => {
        if (r.id === purchaseRequestId) {
          r.attributes.isApproved = isApproved;
          r.attributes.approvedBy = user;
        }
        return r;
      })
    );

    // setAdminResponse()
    await editPurchaseRequest(
      { data: { isApproved, user } },
      purchaseRequestId,
      jwt
    );
    await fetchData();
  };

  const handleRequestPaymentRequest = async (
    isApproved,
    paymentRequestId,
    requesterName,
    itemName
  ) => {
    // optimistic update
    console.log({ response });

    setResponse(
      response.map((r) => {
        if (r.id === paymentRequestId) {
          r.attributes.isApproved = isApproved;
          r.attributes.approvedBy = user;
        }
        return r;
      })
    );
    // setAdminResponse()
    await editPaymentRequest(
      { data: { isApproved, user } },
      paymentRequestId,
      jwt
    );
    await fetchData();
  };

  const handleRequestMaterialTransfer = async (
    isApproved,
    materialTransferId,
    materialItemQuantity
  ) => {
    // set approved

    // optimistic update
    console.log({ response });

    setResponse(
      response.map((r) => {
        if (r.id === materialTransferId) {
          r.attributes.isApproved = isApproved;
          r.attributes.approvedBy = user;
        }
        return r;
      })
    );

    // setAdminResponse()
    await editMaterialTransfer(
      { data: { isApproved, user } },
      materialTransferId,
      jwt
    );

    // change itemQuantity

    const materialTransferRequest = await readMaterialTransferRequest(
      materialTransferId,
      jwt
    );
    console.log({ materialTransferRequest });
    await editInventory(
      {
        data: {
          itemQuantity: String(
            Number(
              materialTransferRequest.data?.data?.attributes?.tag_registration
                ?.data?.attributes?.itemQuantity
            ) - Number(materialItemQuantity)
          ),
        },
      },
      materialTransferRequest?.data?.data?.attributes?.tag_registration?.data
        ?.id,
      jwt
    );

    //

    await fetchData();
  };

  const handleRequestLeaveRequest = async (
    isApproved,
    leaveRequestId,
    requesterName,
    itemName
  ) => {
    // optimistic update
    console.log({ response });

    setResponse(
      response.map((r) => {
        if (r.id === leaveRequestId) {
          r.attributes.isApproved = isApproved;
          r.attributes.approvedBy = user;
        }
        return r;
      })
    );
    // setAdminResponse()
    await editLeaveRequest({ data: { isApproved, user } }, leaveRequestId, jwt);
    await fetchData();
  };

  const [refreshToken, setRefreshToken] = useState(Math.random());

  const fetchData = async () => {
    const result = await readNotification(jwt);
    console.log(result);
    setResponse(result.data.data);
  };

  return (
    <ThemeProvider theme={theme}>
      <SideBox
        bgcolor="#0F112E"
        color="white"
        width="244px"
        height="1032px"
        // flex={1}
        paddingX="24px"
        sx={{
          display: { xs: "none", sm: "block" },
          // overflow: "auto",
          // position: "sticky",
        }}
      >
        {/* <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
        ></Stack> */}
        <Box height="32px" />
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* <Image src="/static/Logo.png" alt="logo" width={60} height={60} /> */}
          <Typography> Frankcon ERP</Typography>
        </Box>
        <Box height="80px" />

        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon padding="0px">
                <Home sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Home"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/tasks">
              <ListItemIcon>
                <Group sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="My Tasks"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <Article sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Notifications"
              />
            </ListItemButton>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Notifications </Typography>
                    <Typography>Mark all as read</Typography>
                  </Stack>
                  <Box height="28px" />
                  {(userDepartment === "admin" ||
                    userDepartment === "finance" ||
                    userDepartment === "purchaser") &&
                    response?.map((notification, index) => (
                      <>
                        <Stack direction="row" alignItems="center">
                          <>
                            {notification?.attributes?.type ===
                            "purchase request" ? (
                              notification?.attributes?.purchaseRequest?.data
                                ?.attributes?.isApproved === "pending" ? (
                                <Stack>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    // justifyContent="center"
                                  >
                                    <Avatar
                                    // src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${notification?.attributes?.purchaseRequest?.data?.attributes?.vendorImage.data?.[0].attributes?.url}`}
                                    />
                                    <Box width="16px" />

                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {
                                        notification?.attributes
                                          ?.purchaseRequest?.data?.attributes
                                          ?.requesterName
                                      }
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography>
                                      {" "}
                                      requested payment on
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {
                                        notification?.attributes
                                          ?.purchaseRequest?.data?.attributes
                                          ?.itemName
                                      }
                                    </Typography>
                                  </Box>
                                  <Box height="8px" />

                                  <Stack direction="row">
                                    <Box width="55px" />
                                    <Button
                                      id="accept"
                                      variant="contained"
                                      onClick={() =>
                                        handleRequest(
                                          "approved",
                                          notification?.attributes
                                            ?.purchaseRequest?.data?.id
                                        )
                                      }
                                      sx={{
                                        width: "64px",
                                        height: "28px",
                                        backgroundColor: "#F44336",
                                      }}
                                    >
                                      <Typography fontSize="10px">
                                        Accept{" "}
                                      </Typography>
                                    </Button>
                                    <Box width="8px" />
                                    <Button
                                      id="reject"
                                      variant="outlined"
                                      onClick={() =>
                                        handleRequest(
                                          "rejected",
                                          notification?.attributes
                                            ?.purchaseRequest?.data?.id
                                        )
                                      }

                                      // color="white"
                                      // sx={{ : "white" }}
                                    >
                                      <Typography
                                        fontSize="10px"
                                        color="#404158"
                                      >
                                        Reject
                                      </Typography>
                                    </Button>
                                  </Stack>
                                </Stack>
                              ) : (
                                ""
                              )
                            ) : notification?.attributes?.type ===
                              "leave request" ? (
                              notification?.attributes?.leaveRequest?.data
                                ?.attributes?.isApproved === "pending" ? (
                                <Stack>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    // justifyContent="center"
                                  >
                                    <Avatar
                                    // src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${notification?.attributes?.purchaseRequest?.data?.attributes?.vendorImage.data?.[0].attributes?.url}`}
                                    />
                                    <Box width="16px" />

                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {
                                        notification?.attributes?.leaveRequest
                                          ?.data?.attributes?.requesterName
                                      }
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography> requested leave on</Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {
                                        notification?.attributes?.leaveRequest
                                          ?.data?.attributes?.createdAt
                                      }
                                    </Typography>
                                  </Box>
                                  <Box height="8px" />

                                  <Stack direction="row">
                                    <Box width="55px" />
                                    <Button
                                      id="accept"
                                      variant="contained"
                                      onClick={() =>
                                        handleRequestLeaveRequest(
                                          "approved",
                                          notification?.attributes?.leaveRequest
                                            ?.data?.id
                                        )
                                      }
                                      sx={{
                                        width: "64px",
                                        height: "28px",
                                        backgroundColor: "#F44336",
                                      }}
                                    >
                                      <Typography fontSize="10px">
                                        Accept{" "}
                                      </Typography>
                                    </Button>
                                    <Box width="8px" />
                                    <Button
                                      id="reject"
                                      variant="outlined"
                                      onClick={() =>
                                        handleRequestLeaveRequest(
                                          "rejected",
                                          notification?.attributes?.leaveRequest
                                            ?.data?.id
                                        )
                                      }

                                      // color="white"
                                      // sx={{ : "white" }}
                                    >
                                      <Typography
                                        fontSize="10px"
                                        color="#404158"
                                      >
                                        Reject
                                      </Typography>
                                    </Button>
                                  </Stack>
                                </Stack>
                              ) : (
                                ""
                              )
                            ) : notification?.attributes?.type ===
                              "payment request" ? (
                              notification?.attributes?.paymentRequest?.data
                                ?.attributes?.isApproved === "pending" ? (
                                <Stack>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    // justifyContent="center"
                                  >
                                    <Avatar
                                    // src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${notification?.attributes?.purchaseRequest?.data?.attributes?.vendorImage.data?.[0].attributes?.url}`}
                                    />
                                    <Box width="16px" />
                                    <Typography>
                                      {" "}
                                      Payment Requesdddddddt to
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {
                                        notification?.attributes?.paymentRequest
                                          ?.data?.attributes?.paidTo
                                      }
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography>for project </Typography>
                                    <Box width="5px" />

                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {
                                        notification?.attributes?.paymentRequest
                                          ?.data?.attributes?.projectTitle
                                      }
                                    </Typography>
                                  </Box>
                                  <Box height="8px" />

                                  <Stack direction="row">
                                    <Box width="55px" />
                                    <Button
                                      id="accept"
                                      variant="contained"
                                      onClick={() =>
                                        handleRequestPaymentRequest(
                                          "approved",
                                          notification?.attributes
                                            ?.paymentRequest?.data?.id
                                        )
                                      }
                                      sx={{
                                        width: "64px",
                                        height: "28px",
                                        backgroundColor: "#F44336",
                                      }}
                                    >
                                      <Typography fontSize="10px">
                                        Accept{" "}
                                      </Typography>
                                    </Button>
                                    <Box width="8px" />
                                    <Button
                                      id="reject"
                                      variant="outlined"
                                      onClick={() =>
                                        handleRequestPaymentRequest(
                                          "rejected",
                                          notification?.attributes
                                            ?.paymentRequest?.data?.id
                                        )
                                      }

                                      // color="white"
                                      // sx={{ : "white" }}
                                    >
                                      <Typography
                                        fontSize="10px"
                                        color="#404158"
                                      >
                                        Reject
                                      </Typography>
                                    </Button>
                                  </Stack>
                                </Stack>
                              ) : (
                                ""
                              )
                            ) : notification?.attributes?.type ===
                              "material request" ? (
                              notification?.attributes?.materialtransferrequest
                                ?.data?.attributes?.isApproved === "pending" ? (
                                <>
                                  <Box>
                                    {/* <Box
                                    display="flex"
                                    alignItems="center"
                                  > */}
                                    <Avatar
                                    // src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${notification?.attributes?.purchaseRequest?.data?.attributes?.vendorImage.data?.[0].attributes?.url}`}
                                    />
                                    <Box width="16px" />
                                    <Typography>
                                      {" "}
                                      {
                                        notification?.attributes
                                          ?.materialtransferrequest?.data
                                          ?.attributes?.requesterName
                                      }
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      requested material transfer of
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {
                                        notification?.attributes
                                          ?.materialtransferrequest?.data
                                          ?.attributes?.itemQuantity
                                      }
                                      <Box width="5px" />
                                      {
                                        notification?.attributes
                                          ?.materialtransferrequest?.data
                                          ?.attributes?.itemType
                                      }
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography>to</Typography>
                                    <Box width="5px" />
                                    <Typography>
                                      {
                                        notification?.attributes
                                          ?.materialtransferrequest?.data
                                          ?.attributes?.transferLocation
                                      }
                                    </Typography>
                                    <Box width="5px" />
                                    {/* </Box> */}
                                    <Box height="8px" />
                                  </Box>
                                  <Stack direction="row">
                                    <Box width="55px" />
                                    <Button
                                      id="accept"
                                      variant="contained"
                                      onClick={() =>
                                        handleRequestMaterialTransfer(
                                          "approved",
                                          notification?.attributes
                                            ?.materialtransferrequest?.data?.id,
                                          notification?.attributes
                                            ?.materialtransferrequest?.data
                                            ?.attributes?.itemQuantity
                                        )
                                      }
                                      sx={{
                                        width: "64px",
                                        height: "28px",
                                        backgroundColor: "#F44336",
                                      }}
                                    >
                                      <Typography fontSize="10px">
                                        Accept{" "}
                                      </Typography>
                                    </Button>
                                    <Box width="8px" />
                                    <Button
                                      id="reject"
                                      variant="outlined"
                                      onClick={() =>
                                        handleRequestMaterialTransfer(
                                          "rejected",
                                          notification?.attributes
                                            ?.materialtransferrequest?.data?.id
                                        )
                                      }

                                      // color="white"
                                      // sx={{ : "white" }}
                                    >
                                      <Typography
                                        fontSize="10px"
                                        color="#404158"
                                      >
                                        Reject
                                      </Typography>
                                    </Button>
                                  </Stack>
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </>
                        </Stack>
                      </>
                    ))}
                  {(userDepartment === "finance" ||
                    userDepartment === "purchaser") &&
                    {}}
                </Box>
              </Fade>
            </Modal>
          </ListItem>
          <Box height="20px" />
          <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
          <Box height="20px" />
          {/* conditional rendering starts from here */}
          {userDepartment === "admin" ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemIcon>
                    <DomainIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Architecture"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemIcon>
                    <EngineeringIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Engineering"
                  />
                </ListItemButton>
              </ListItem>
              <ListItemButton onClick={handleList}>
                <ListItemIcon>
                  <AttachMoneyIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Finance"
                />
                {openList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Payouts"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Payins"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Pending Payment"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Receipt Approvals"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleListHR}>
                <ListItemIcon>
                  <PeopleOutline sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Human Resources"
                />
                {openListHR ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListHR} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Attendance"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    component="a"
                    href="/employees"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      primary="Employees"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Payroll"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleListInventory}>
                <ListItemIcon>
                  <ListAltIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Inventory"
                />
                {openListInventory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListInventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item List"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item Documentation"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/projects">
                  <ListItemIcon>
                    <WorkOutlineOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Projects"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="">
                  <ListItemIcon>
                    <ShoppingCartOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Purchaser"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/workshop">
                  <ListItemIcon>
                    <LocalShippingOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Workshop"
                  />
                </ListItemButton>
              </ListItem>
              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />

              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : userDepartment === "finance" ? (
            <>
              <ListItemButton onClick={handleList}>
                <ListItemIcon>
                  <AttachMoneyIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Finance"
                />
                {openList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    component="a"
                    href="/paymentlist"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      component="a"
                      href="/paymentlist"
                      primary="Payouts"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    component="a"
                    href="/paymentlist"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      primary="Payins"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    component="a"
                    href="/paymentlist"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      primary="Pending Payment"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    component="a"
                    href="/paymentlist"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      primary="Receipt Approvals"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleListHR}>
                <ListItemIcon>
                  <PeopleOutline sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Human Resources"
                />
                {openListHR ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListHR} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Attendance"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Employees"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Payroll"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleListInventory}>
                <ListItemIcon>
                  <ListAltIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Inventory"
                />
                {openListInventory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListInventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item List"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item Documentation"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem disablePadding>
                <ListItemButton component="a" href="">
                  <ListItemIcon>
                    <ShoppingCartOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Purchaser"
                  />
                </ListItemButton>
              </ListItem>
              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />
              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : userDepartment === "architecture" ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemIcon>
                    <DomainIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Architecture"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="">
                  <ListItemIcon>
                    <LocalShippingOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Workshop"
                  />
                </ListItemButton>
              </ListItem>
              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />
              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : userDepartment === "inventory" ? (
            <>
              <ListItemButton onClick={handleListInventory}>
                <ListItemIcon>
                  <ListAltIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Inventory"
                />
                {openListInventory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListInventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item List"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item Documentation"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />
              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : userDepartment === "human resource" ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemIcon>
                    <DomainIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Architecture"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemIcon>
                    <EngineeringIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Engineering"
                  />
                </ListItemButton>
              </ListItem>
              <ListItemButton onClick={handleList}>
                <ListItemIcon>
                  <AttachMoneyIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Finance"
                />
                {openList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Payouts"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Payins"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Pending Payment"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Receipt Approvals"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleListHR}>
                <ListItemIcon>
                  <PeopleOutline sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Human Resources"
                />
                {openListHR ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListHR} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Attendance"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Employees"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Payroll"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem disablePadding>
                <ListItemButton component="a" href="">
                  <ListItemIcon>
                    <ShoppingCartOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Purchaser"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="">
                  <ListItemIcon>
                    <LocalShippingOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Workshop"
                  />
                </ListItemButton>
              </ListItem>
              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />
              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : userDepartment === "engineering" ? (
            <>
              <ListItemButton onClick={handleListInventory}>
                <ListItemIcon>
                  <ListAltIcon sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Inventory"
                />
                {openListInventory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListInventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item List"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItem disablePadding>
                <ListItemButton component="a" href="/projects">
                  <ListItemIcon>
                    <WorkOutlineOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Projects"
                  />
                </ListItemButton>
              </ListItem>

              <ListItemButton onClick={handleListWorkshop}>
                <ListItemIcon>
                  <LocalShippingOutlined sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Workshop"
                />
                {openListWorkshop ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListWorkshop} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item Deliveries"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />
              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : userDepartment === "purchaser" ? (
            <>
              <ListItemButton onClick={handleListInventory}>
                <ListItemIcon>
                  <ListAltIcon sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Inventory"
                />
                {openListInventory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListInventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item List"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItem disablePadding>
                <ListItemButton component="a" href="/projects">
                  <ListItemIcon>
                    <WorkOutlineOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Projects"
                  />
                </ListItemButton>
              </ListItem>

              <ListItemButton onClick={handleListWorkshop}>
                <ListItemIcon>
                  <LocalShippingOutlined sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Workshop"
                />
                {openListWorkshop ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListWorkshop} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item Deliveries"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />
              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : userDepartment === "workshop" ? (
            <>
              <ListItemButton onClick={handleListInventory}>
                <ListItemIcon>
                  <ListAltIcon sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Inventory"
                />
                {/* {openListWorkshop ? <ExpandLess /> : <ExpandMore />} */}

                {openListInventory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListInventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item List"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItem disablePadding>
                <ListItemButton component="a" href="/projects">
                  <ListItemIcon>
                    <WorkOutlineOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Projects"
                  />
                </ListItemButton>
              </ListItem>

              <ListItemButton onClick={handleListWorkshop}>
                <ListItemIcon>
                  <LocalShippingOutlined sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Workshop"
                />
                {openListWorkshop ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openListWorkshop} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton component="a" href="/" sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item Deliveries"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    component="a"
                    href="/inventorydocumentation"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      primary="Item Documentation"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: "80px" }}>
                    <ListItemText
                      primary="Item List"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              <Box height="20px" />
              <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
              <Box height="20px" />
              <ListItem disablePadding>
                <ListItemButton component="a" href="/settings">
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: "white" }} />
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Settings"
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            ""
          )}
        </List>
        {/* username and online status */}

        <Box height="56px">
          <Card height="56px">
            <CardHeader
              sx={{ paddingLeft: "8px" }}
              avatar={
                <Avatar
                  alt="UserImage"
                  src="/static/Avatar.png"
                  sx={{ paddingLeft: "0px" }}
                />
              }
              title={
                <Typography fontWeight="400" fontSize="14px">
                  {" "}
                  {user}
                </Typography>
              }
              titleTypographyProps={{ variant: "h6", component: "span" }}
              subheader={
                <Box display="flex">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingRight="8px"
                  >
                    <Image
                      src="/static/online.png"
                      alt="online badge"
                      width={8}
                      height={8}
                    />
                  </Box>
                  <Typography fontSize="12px">Online</Typography>
                </Box>
              }
              // action={
              //   <Box>
              //     <IconButton aria-label="settings">
              //       <UnfoldMore onClick={(event) => handleClick()} />
              //     </IconButton>
              //   </Box>
              // }
            />
          </Card>
        </Box>
        <Box height="25px" />
      </SideBox>
    </ThemeProvider>
  );
};

export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const newPurchaseRequestResponse = await fetcher(
    `https://frankconerp.herokuapp.com/api/purchaserequests`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (newPurchaseRequestResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        newPurchaseRequestResponse: newPurchaseRequestResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: newPurchaseRequestResponse.error.message,
      },
    };
  }
}

export default SideBar;
