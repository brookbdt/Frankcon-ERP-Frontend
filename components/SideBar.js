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
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import {
  createMonthlyExpense,
  createNotification,
  createPayin,
  createPayout,
  editAccountBalance,
  editInventory,
  editLeaveRequest,
  editMaterialTransfer,
  editNotification,
  editPaymentRequest,
  editPurchaseRequest,
  editVendorRequest,
  getInventoryQuantity,
  readAccountBalanceId,
  readAllProjects,
  readEmployeeByDepartment,
  readEmployeeDetail,
  readInventory,
  readMaterialTransferRequest,
  readNotification,
  readPaymentNotification,
  readPaymentsRequests,
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
  const [accountBalanceId, setAccountBalanceId] = useState("");
  const [accountBalanceAmount, setAccountBalanceAmount] = useState("");
  const [adminNotify, setAdminNotify] = useState({});
  const [financeNotify, setFinanceNotify] = useState({});
  const [purchaserNotify, setPurchaserNotify] = useState({});
  const [requestingEmployee, setRequestingEmployee] = useState({});
  const [paymentId, setPaymentId] = useState("");

  const [showNotifications, setShowNotifications] = React.useState(true);

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
    overflow: "auto",
    height: "80%",
    p: 4,
  };

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
  const [paymentNotificationResponse, setPaymentNotificationResponse] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [balance, setBalance] = useState(0)
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonClickedLeaveRequest, setButtonClickedLeaveRequest] = useState(false);
  const [buttonClickedMaterialTransferRequest, setButtonClickedMaterialTransferRequest] = useState(false);
  const [buttonClickedPaymentRequest, setButtonClickedPaymentRequest] = useState(false);
  const [buttonClickedVendorRequest, setButtonClickedVendorRequest] = useState(false);



  useEffect(() => {
    if (!user) {
      return;
    }



    readNotification(jwt, user).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });
    readPaymentNotification(jwt, user).then((pr) => {
      console.log("pr is", pr.data?.data);
      setPaymentNotificationResponse(pr.data?.data);
    });




    const fetchData = async () => {
      const currentEmployee = await readEmployeeDetail(jwt, user);

      const notifiedAdminEmployee = await readEmployeeByDepartment(jwt, "admin");
      const notifiedFinanceEmployee = await readEmployeeByDepartment(jwt, "Finance");
      const notifiedPurchaserEmployee = await readEmployeeByDepartment(jwt, "Purchaser");
      setAdminNotify(notifiedAdminEmployee)
      setFinanceNotify(notifiedFinanceEmployee)
      setPurchaserNotify(notifiedPurchaserEmployee)
      setRequestingEmployee(currentEmployee);
      const notifications = [...response, ...paymentNotificationResponse];

      // const notifications = response?.map((item, index) => {
      //   // Do something with item from array1State

      //   const otherNotifications = item; // Example transformation

      //   const paymentNotifications = paymentNotificationResponse

      //   return [otherNotifications, paymentNotifications];
      // });
      console.log({ notifications })

      // Set the state of mappedArrayState as the new mapped array
      setAllNotifications(notifications);


      const lastAccountBalance = await readAccountBalanceId(jwt);

      const lastAccountBalanceId = lastAccountBalance?.data?.data?.[0]?.id || 1;
      const lastAccountBalanceAmount = lastAccountBalance?.data?.data?.[0]?.attributes?.accountBalance;

      setAccountBalanceId(lastAccountBalanceId);
      setAccountBalanceAmount(parseInt(lastAccountBalanceAmount.replace(/,/g, '')));

      setBalance(accountBalanceAmount);

      const result = await readAllProjects(jwt, user);
      // setProjectsResponse(result?.data?.data);

      const inventoryResult = await readInventory(jwt);
      const purchaseResult = await readPurchaseRequest(jwt);
      // const vendorResult = await readVendor(jwt);

      // res = inventoryResult.data.data;

      console.log({ inventoryResult });
      // setInventoryResponse(inventoryResult?.data?.data);
      console.log({ accountBalanceAmount })
      // setPurchaseResponse(purchaseResult?.data?.data);
      return () => {
        setButtonClicked(false);
        setButtonClickedLeaveRequest(false);
        setButtonClickedMaterialTransferRequest(false);
        setButtonClickedPaymentRequest(false);
        setButtonClickedVendorRequest(false);

      };

    };

    fetchData();
    console.log("notif is", { user });
  }, [user, balance, accountBalanceAmount, buttonClicked, response, paymentNotificationResponse]);

  const handleRequest = async (
    isApproved,
    purchaseRequestId,
    notificationId,
    itemName
  ) => {
    // optimistic update
    console.log({ response });
    setButtonClicked(true)


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
    const editedPurchaseRequest = await editPurchaseRequest(
      { data: { isApproved: 'pending payment', user } },
      purchaseRequestId,
      jwt
    );

    const editedNotification = {
      data: {
        date: new Date().toISOString(),
        type: "edited purchase request",
        purchaseRequest: editedPurchaseRequest.data?.data?.id,

        employees: purchaserNotify?.data?.data?.map((purchaser) => purchaser.id),
        employees: financeNotify?.data?.data.map((finance) => finance.id),

      },
    };
    // employee: employee.data?.data?.[0]?.id,

    await editNotification(editedNotification, notificationId, jwt);
  };

  const handleRequestPaymentRequest = async (
    isApproved,
    paymentRequestNotificationId,
    paymentRequestId,
    purchaseRequestId,
    itemName
  ) => {
    // optimistic update
    setButtonClickedPaymentRequest(true);
    console.log({ response });
    console.log({
      paymentRequestNotificationId
    });
    console.log({
      paymentRequestId
    });
    console.log({
      purchaseRequestId
    });
    console.log({
      allNotifications
    });
    console.log({
      paymentNotificationResponse
    });

    // const paymentAmountNumber = parseInt(paymentAmount.replace(/\,/g, '')); // Remove commas and convert payment amount to a number


    // setPaymentNotificationResponse(
    //   paymentNotificationResponse.map((r) => {
    //     if (r.id === paymentRequestNotificationId

    //       r.attributes.isApproved = isApproved;
    //       r.attributes.approvedBy = user;
    //     }
    //     return r;
    //   })
    // );
    // setAdminResponse()
    console.log('this balance', { balance })
    // const newExpense = {
    //   data: {
    //     expenseAmount
    //   }
    // }


    const projectExpense = paymentNotificationResponse?.map((r) => {
      if ((r.id === paymentRequestNotificationId) && isApproved === "approved" && r?.attributes?.paymentrequest?.data?.attributes?.paymentType === "Pay out") {
        const previousProjectExpense = parseInt(r?.attributes?.paymentrequest?.data?.attributes?.project?.data?.attributes?.projectExpense.replace(/,/g, ''));
        const paymentAmountNumber = parseInt(r?.attributes?.paymentrequest?.data?.attributes?.paymentAmount.replace(/,/g, '')); // Remove commas and convert payment amount to a number

        console.log({ expense: previousProjectExpense + paymentAmountNumber })

        return previousProjectExpense + paymentAmountNumber
      }
    })



    const newBalance = paymentNotificationResponse?.map((r) => {
      if ((r.id === paymentRequestNotificationId
      ) && isApproved === "approved" && r?.attributes?.paymentrequest?.data?.attributes?.paymentType === "Pay out") {
        const paymentAmountNumber = parseInt(r?.attributes?.paymentrequest?.data?.attributes?.paymentAmount.replace(/,/g, '')); // Remove commas and convert payment amount to a number

        console.log({
          paymentAmountNumber
        })


        return balance - paymentAmountNumber


      } else if ((r.id === paymentRequestNotificationId
      ) && isApproved === "approved" && r?.attributes?.paymentrequest?.data?.attributes?.paymentType === "Pay in") {
        const paymentAmountNumber = parseInt(r?.attributes?.paymentrequest?.data?.attributes?.paymentAmount.replace(/,/g, '')); // Remove commas and convert payment amount to a number


        console.log({
          paymentAmountNumber
        })
        return balance + paymentAmountNumber
      }
      else {
        return '666'
      }

    })

    allNotifications?.map(async (r) => {
      if ((r.id === paymentRequestNotificationId
      ) && isApproved === "approved") {

        await editPurchaseRequest(
          { data: { isApproved: 'purchased', user } },
          purchaseRequestId,
          jwt
        );


      }
    })

    const updatedNotifications = allNotifications.map((notification) => {
      if (notification?.attributes?.purchaserequest?.data?.id === purchaseRequestId) {
        return {
          ...notification,
          attributes: {
            ...notification.attributes,
            purchaserequest: {
              ...notification.attributes.purchaserequest,
              data: {
                ...notification.attributes.purchaserequest.data,
                attributes: {
                  ...notification.attributes.purchaserequest.data.attributes,
                  isApproved: 'purchased',
                },
              },
            },
          },
        };
      } else {
        return notification;
      }
    });
    setAllNotifications(updatedNotifications);

    allNotifications?.map(async (r) => {
      console.log({ r })
      if ((r.id === paymentRequestNotificationId) && (r?.attributes?.purchaserequest?.data?.attributes?.isApproved === "purchased") && r?.attributes?.paymentrequest?.data?.attributes?.paymentType === "Pay out") {
        console.log('in if', { r });
        const newExpense = {
          data: {
            expenseAmount:
              allNotifications?.map((r) => {
                (parseInt(r?.attributes?.paymentrequest?.data?.attributes?.paymentAmount.replace(/,/g, ''))).toString(); // Remove commas and convert payment amount to a number
              }),
            paymentrequest: r?.attributes?.paymentrequest?.data?.id,
            purchaserequest: r?.attributes?.purchaserequest?.data?.id,
            payout: r?.attributes?.payout?.data?.id,
          }
        }

        console.log({ newExpense })


        await createMonthlyExpense(newExpense, jwt)
      }
      else {
        console.log('not if', { r, paymentRequestNotificationId, isApproved: r?.attributes?.purchaserequest?.data?.attributes?.isApproved, paymenttype: r?.attributes?.paymentrequest?.data?.attributes?.paymentType === "Pay out" })
      }
    })



    // response.map((r) => {
    //   if (r.id === vendorRequestId && isApproved == 'approved') {

    //     editPurchaseRequest(
    //       { data: { isApproved: 'pending payment', user } },
    //       r?.attributes?.purchaserequest?.data?.data?.[0]?.id,
    //       jwt
    //     );
    //   }

    // })

    console.log({ newBalance })


    console.log({ accountBalanceAmount })



    setBalance(newBalance);
    console.log({ accountBalanceAmount })
    await editPaymentRequest(
      { data: { isApproved, user, projectExpense } },
      paymentRequestId,
      jwt
    );

    const updatedBalance = {
      data: {
        accountBalance: newBalance.toString(),
      }
    }


    await editAccountBalance(updatedBalance, accountBalanceId, jwt)




  };

  const handleRequestVendorRequest = async (
    isApproved,
    vendorRequestId,
    requesterName,
    itemName
  ) => {
    // optimistic update
    console.log({ response });
    setButtonClickedVendorRequest(true);

    setResponse(
      response.map((r) => {
        if (r.id === vendorRequestId) {
          r.attributes.isApproved = isApproved;
          r.attributes.approvedBy = user;
        }
        return r;
      })
    );
    // setAdminResponse()
    await editVendorRequest(
      { data: { isApproved, user } },
      vendorRequestId,
      jwt
    );
    response.map((r) => {
      if (r.id === vendorRequestId && isApproved == 'approved') {

        editPurchaseRequest(
          { data: { isApproved: 'pending payment', user } },
          r?.attributes?.purchaserequest?.data?.data?.[0]?.id,
          jwt
        );
      }

    })

    // await fetchData();
  };

  const handleRequestMaterialTransfer = async (
    isApproved,
    materialTransferId,
    materialItemQuantity
  ) => {
    // set approved

    // optimistic update
    console.log({ response });
    setButtonClickedMaterialTransferRequest(true);

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

    Number(
      materialTransferRequest.data?.data?.attributes?.tag_registration
        ?.data?.attributes?.itemQuantity
    ) - Number(materialItemQuantity) < 0 ? window.alert("Item Quantity can't be less than zero") :

      await editInventory(
        {
          data: {
            // itemQuantity: String(
            //   Number(
            //     materialTransferRequest.data?.data?.attributes?.tag_registration
            //       ?.data?.attributes?.itemQuantity
            //   ) - Number(materialItemQuantity)
            // ),

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

    // await fetchData();
  };

  const handleRequestLeaveRequest = async (
    isApproved,
    leaveRequestId,
    requesterName,
    itemName
  ) => {
    // optimistic update
    console.log({ response });
    setButtonClickedLeaveRequest(true);

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
    // await fetchData();
  };



  const [refreshToken, setRefreshToken] = useState(Math.random());

  // const fetchData = async () => {
  //   const result = await readNotification(jwt);
  //   console.log(result);
  //   setResponse(result.data.data);
  // };

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
              sx={{ overflow: "auto" }}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style} >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>Notifications </Typography>
                    <Button onClick={() => setShowNotifications(false)}>Mark all as read</Button>
                  </Stack>
                  <Box height="28px" />
                  {/* <pre>{JSON.stringify({ allNotifications }, null, 2)}</pre> */}

                  {
                    showNotifications === true ?
                      (
                        allNotifications?.map((notification, index) => (
                          <>
                            {/* <Stack direction="row" alignItems="center"> */}
                            <>
                              {notification?.attributes?.type ===
                                "purchase request" ? (
                                notification?.attributes?.purchaseRequest?.data
                                  ?.attributes?.isApproved === "pending" ? (
                                  <Stack>
                                    <>
                                      <Box height="8px" />
                                      <Card
                                        sx={{ borderRadius: "10px" }}
                                      >
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          padding="8px"
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
                                              notification?.attributes?.employee?.data?.attributes?.firstName
                                            }
                                          </Typography>
                                          <Box width="5px" />
                                          <Typography>
                                            {" "}
                                            requested purchase of
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
                                          <Box width="5px" />

                                        </Box>

                                        <Box height="8px" />
                                        {userDepartment === 'admin' && (!buttonClicked) ?
                                          <>
                                            <Stack direction="row">
                                              <Box width="55px" />
                                              <Button
                                                id="accept"
                                                variant="contained"
                                                onClick={() =>
                                                  handleRequest(
                                                    "approved",
                                                    notification?.attributes?.purchaseRequest
                                                      ?.data?.id,
                                                    notification?.id,
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
                                                    notification?.attributes?.purchaseRequest
                                                      ?.data?.id,
                                                    notification?.id,

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
                                            <Box height='8px' />
                                          </>
                                          : ''
                                        }
                                      </Card>
                                    </>

                                  </Stack>
                                ) :
                                  ''
                              ) : notification?.attributes?.type ===
                                "edited purchase request" ? (

                                <Stack>
                                  <>
                                    <Card
                                      sx={{ borderRadius: "10px" }}
                                    >

                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        padding="8px"
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
                                            notification?.attributes?.employee?.data?.attributes?.firstName
                                          }'s
                                        </Typography>
                                        <Box width="5px" />
                                        <Typography>
                                          {" "}
                                          purchase request of
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
                                      <Box display="flex">
                                        <Box width="32px" />
                                        <Typography> is {
                                          notification?.attributes
                                            ?.purchaseRequest?.data?.attributes
                                            ?.isApproved
                                        }</Typography>
                                      </Box>
                                    </Card>
                                    <Box height='8px' />
                                  </>
                                </Stack>

                              )

                                : notification?.attributes?.type ===
                                  "leave request" ? (
                                  notification?.attributes?.leaverequest?.data
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
                                            notification?.attributes?.employee?.data?.attributes?.firstName
                                          }
                                        </Typography>
                                        <Box width="5px" />
                                        <Typography> requested leave for</Typography>
                                        <Box width="5px" />
                                        <Typography
                                          fontSize="14px"
                                          fontWeight="700"
                                        >
                                          {
                                            notification?.attributes?.leaverequest
                                              ?.data?.attributes?.leaveRequestType
                                          }
                                        </Typography>
                                      </Box>
                                      <Box height="8px" />
                                      {userDepartment == "admin" ?
                                        <Stack direction="row">
                                          <Box width="55px" />

                                          <Button
                                            id="accept"
                                            variant="contained"
                                            onClick={() =>
                                              handleRequestLeaveRequest(
                                                "approved",
                                                notification?.attributes?.leaverequest
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
                                                notification?.attributes?.leaverequest
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
                                        </Stack> : ''

                                      }
                                    </Stack>
                                  ) : <Stack>
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
                                        Leave Request by
                                      </Typography>
                                      <Box width="5px" />
                                      <Typography
                                        fontSize="14px"
                                        fontWeight="700"
                                      >
                                        {
                                          notification?.attributes?.employee?.data?.attributes?.firstName
                                        }
                                      </Typography>
                                      <Box width="5px" />
                                      <Typography>due to reason</Typography>
                                      <Box width="5px" />

                                      <Typography
                                        fontSize="14px"
                                        fontWeight="700"
                                      >
                                        {
                                          notification?.attributes?.leaverequest
                                            ?.data?.attributes?.leaveRequestType
                                        }
                                      </Typography>
                                    </Box>
                                    <Box height="8px" />

                                    <Typography> was {
                                      notification?.attributes
                                        ?.leaverequest?.data?.attributes
                                        ?.isApproved
                                    }</Typography>
                                  </Stack>
                                ) : notification?.attributes?.type ===
                                  "payment request" ? (
                                  notification?.attributes?.paymentrequest?.data
                                    ?.attributes?.isApproved === "pending" && (!buttonClickedPaymentRequest) ? (
                                    <>
                                      <Box height="8px" />
                                      <Card
                                        sx={{ borderRadius: "10px" }}
                                      >

                                        <Box
                                          display="flex"
                                          // alignItems="center"
                                          // justifyContent="space-between"
                                          padding="8px"
                                        >
                                          <Avatar
                                          // src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${notification?.attributes?.purchaseRequest?.data?.attributes?.vendorImage.data?.[0].attributes?.url}`}
                                          />
                                          <Box width="16px" />


                                          <Stack>

                                            <Box display="inline" >
                                              <Typography>
                                                {" "}
                                                Payment Request of amount
                                              </Typography>
                                              <Box display="flex" alignItems="center">

                                                <Typography fontSize="14px"
                                                  fontWeight="700">
                                                  {" "}
                                                  ETB {notification?.attributes?.paymentrequest?.data?.attributes?.paymentAmount}
                                                </Typography>
                                                <Box width="5px" />

                                                <Typography>
                                                  {" "}
                                                  for purchasing
                                                </Typography>
                                                <Box width="5px" />

                                                <Typography
                                                  fontSize="14px"
                                                  fontWeight="700"
                                                >
                                                  {
                                                    notification?.attributes?.purchaserequest?.data?.attributes?.itemName
                                                  }
                                                </Typography>

                                              </Box>

                                              <Box width="5px" />
                                              <Box display="flex" alignItems="center">




                                                <Typography>for project </Typography>
                                                <Box width="5px" />

                                                <Typography
                                                  fontSize="14px"
                                                  fontWeight="700"
                                                >
                                                  {
                                                    notification?.attributes?.project
                                                      ?.data?.attributes?.projectTitle
                                                  }
                                                </Typography>
                                              </Box>

                                            </Box>

                                            <Box height="16px" />
                                            {userDepartment === "admin" ?

                                              <Stack direction="row">
                                                {/* <Box width="55px" /> */}
                                                <Button
                                                  id="accept"
                                                  variant="contained"
                                                  onClick={() =>
                                                    handleRequestPaymentRequest(
                                                      "approved",
                                                      notification?.id,
                                                      notification?.attributes?.paymentrequest?.data?.id,
                                                      notification?.attributes?.purchaserequest?.data?.id
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
                                                      notification?.id,
                                                      notification?.attributes?.paymentrequest?.data?.id,
                                                      notification?.attributes?.purchaserequest?.data?.id
                                                    )
                                                  }


                                                >
                                                  <Typography
                                                    fontSize="10px"
                                                    color="#404158"
                                                  >
                                                    Reject
                                                  </Typography>
                                                </Button>
                                              </Stack>
                                              : ''

                                            }

                                          </Stack>

                                          <Box height="8px" />
                                        </Box>
                                      </Card>
                                      {/* <Stack>
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
                                            Payment Request by
                                          </Typography>
                                          <Box width="5px" />
                                          <Typography
                                            fontSize="14px"
                                            fontWeight="700"
                                          >
                                            {
                                              notification?.attributes?.employee?.data?.attributes?.firstName
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
                                              notification?.attributes?.paymentrequest
                                                ?.data?.attributes?.projectTitle
                                            }
                                          </Typography>
                                        </Box>
                                        <Box height="8px" />

                                        <Typography> is {
                                          notification?.attributes
                                            ?.paymentRequest?.data?.attributes
                                            ?.isApproved
                                        }</Typography>
                                      </Stack> */}


                                    </>
                                  ) :
                                    ''
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
                                      {userDepartment === "admin" ?

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
                                        </Stack> : ''
                                      }
                                    </>
                                  ) : (
                                    ""
                                  )
                                ) : notification?.attributes?.type === 'inbound receiving form' ? (
                                  <>
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {notification?.attributes?.inboundreceivingform?.data?.attributes?.itemQuantity} items
                                    </Typography>
                                    <Box width="5px" />
                                    <Typography>of</Typography>
                                    <Box width="5px" />

                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {notification?.attributes?.inboundreceivingform?.data?.attributes?.itemName}
                                    </Typography>
                                    <Box width="5px" />

                                    <Typography>inbound receiving form by</Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {notification?.attributes?.inboundreceivingform?.data?.attributes?.employee}
                                    </Typography>
                                  </>
                                ) : notification?.attributes?.type === 'Project' ? (
                                  <>
                                    {/* <pre>{JSON.stringify({ notification }, null, 2)}</pre> */}
                                    <Typography>You have been added to project </Typography>
                                    <Box width="5px" />

                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {notification?.attributes?.project?.data?.attributes?.projectTitle}
                                    </Typography>

                                    <Box width="5px" />
                                    <Typography> By</Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {notification?.attributes?.employee?.data?.attributes?.firstName}
                                    </Typography>
                                  </>
                                ) : notification?.attributes?.type === 'Task' ? (
                                  <>

                                    {/* <pre>{JSON.stringify({ notification }, null, 2)}</pre> */}
                                    {/* <Box display="flex"
                                      justifyContent="space-around"
                                      borderRadius="10px"


                                    > */}
                                    <Card
                                      sx={{ padding: "20px", borderRadius: "10px" }}
                                    >

                                      <Box display="flex" justifyContent="space-around">
                                        <Typography>
                                          You have been added to task

                                        </Typography>
                                        <Box width="5px" />

                                        <Typography
                                          fontSize="14px"
                                          fontWeight="700"
                                        >

                                          {notification?.attributes?.task?.data?.attributes?.title}
                                        </Typography>


                                        {/* </Box> */}
                                        <Box width="5px" />

                                        <Typography> By</Typography>
                                        <Box width="5px" />
                                        <Typography
                                          fontSize="14px"
                                          fontWeight="700"
                                        >
                                          {notification?.attributes?.employee?.data?.attributes?.firstName}
                                        </Typography>
                                      </Box>
                                    </Card>
                                    <Box height="10px" />


                                  </>
                                ) : notification?.attributes?.type === 'tag registration' ? (
                                  <>
                                    {/* <pre>{JSON.stringify({ notification }, null, 2)}</pre> */}
                                    <Box display="flex">
                                      <Typography>Tag Registration of  <Typography
                                        fontSize="14px"
                                        fontWeight="700"
                                      >
                                        {notification?.attributes?.tag_registration?.data?.attributes?.itemName}
                                      </Typography> </Typography>
                                      <Box width="5px" />

                                    </Box>


                                    <Box width="5px" />
                                    <Typography> By</Typography>
                                    <Box width="5px" />
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="700"
                                    >
                                      {notification?.attributes?.employee?.data?.attributes?.firstName}
                                    </Typography>
                                  </>
                                ) : notification?.attributes?.type ===
                                  "vendor request" ? (
                                  notification?.attributes?.vendor?.data
                                    ?.attributes?.isApproved === "pending" && (!buttonClickedVendorRequest) ? (
                                    <Stack>
                                      <>
                                        <Card
                                          sx={{ borderRadius: "10px" }}
                                        >
                                          <Box
                                            display="flex"
                                            // alignItems="center"
                                            padding="8px"

                                          // justifyContent="center"
                                          >
                                            <Avatar
                                            // src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${notification?.attributes?.purchaseRequest?.data?.attributes?.vendorImage.data?.[0].attributes?.url}`}
                                            />
                                            <Box width="16px" />
                                            <Typography
                                              fontSize="14px"
                                              fontWeight="700"
                                            // alignSelf="center"
                                            >
                                              {notification?.attributes?.employee?.data?.attributes?.firstName}

                                            </Typography>
                                            <Box width="5px" />
                                            <Box>
                                              <Typography>
                                                {" "}
                                                Requesting adding vendor
                                              </Typography>
                                              {/* <Box width="5px" /> */}
                                              <Typography
                                                fontSize="14px"
                                                fontWeight="700"
                                              >
                                                {
                                                  notification?.attributes?.vendor?.data?.attributes?.vendorName
                                                }
                                              </Typography>
                                            </Box>

                                            <Box width="5px" />

                                          </Box>
                                          <Box height="8px" />

                                          {userDepartment === 'admin' && (!buttonClickedVendorRequest) ?
                                            <>
                                              <Stack direction="row">
                                                <Box width="55px" />
                                                <Button
                                                  id="accept"
                                                  variant="contained"
                                                  onClick={() =>
                                                    handleRequestVendorRequest(
                                                      "approved",
                                                      notification?.attributes
                                                        ?.vendor?.data?.id
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
                                                    handleRequestVendorRequest(
                                                      "rejected",
                                                      notification?.attributes
                                                        ?.vendor?.data?.id
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
                                              <Box height='8px' />
                                            </>
                                            : ''
                                          }
                                        </Card>
                                        <Box height='8px' />

                                      </>
                                    </Stack>
                                  ) : <Stack>
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
                                        Vendor
                                      </Typography>
                                      <Box width="5px" />

                                      <Typography
                                        fontSize="14px"
                                        fontWeight="700"
                                      >
                                        {
                                          notification?.attributes?.vendor
                                            ?.data?.attributes?.vendorName
                                        }
                                      </Typography>
                                      <Box width="5px" />

                                      <Typography> is {
                                        notification?.attributes
                                          ?.vendor?.data?.attributes
                                          ?.isApproved
                                      }</Typography>
                                    </Box>



                                  </Stack>
                                ) : ''}
                            </>
                            {/* </Stack> */}
                          </>
                        ))



                      ) : ''

                  }

                  {/* {(userDepartment === "Finance" ||
                    userDepartment === "Purchaser") &&
                    {}} */}
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
                <ListItemButton component="a" href="/tasks/architecture">
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
                <ListItemButton component="a" href="/tasks/engineering">
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
                <List component="a" disablePadding href="/paymentlist">
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
                  <ListItemButton
                    component="a"
                    href="/payroll"
                    sx={{ pl: "80px" }}
                  >
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
                  <ListItemButton
                    component="a"
                    href="/inventory"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      primary="Item List"
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
                <ListItemButton component="a" href="/tasks/workshop">
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
          ) : userDepartment === "Finance" ? (
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
                  <ListItemButton
                    component="a"
                    href="/payroll"
                    sx={{ pl: "80px" }}
                  >
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
                  <ListItemButton component="a"
                    href="/inventorydocumentation"
                    sx={{ pl: "80px" }}>
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
          ) : userDepartment === "Architecture" ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/tasks/architecture">
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
                <ListItemButton component="a" href="/tasks/workshop">
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
          ) : userDepartment === "Inventory" ? (
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
                  <ListItemButton component="a"
                    href="/inventorydocumentation"
                    sx={{ pl: "80px" }}>
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
          ) : userDepartment === "Human Resource" ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/tasks/architecture">
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
                <ListItemButton component="a" href="/tasks/engineering">
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
                  <ListItemButton
                    component="a"
                    href="/payroll"
                    sx={{ pl: "80px" }}
                  >
                    <ListItemText
                      primary="Payroll"
                      primaryTypographyProps={{ fontSize: "11px" }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/tasks/purchaser">
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
                <ListItemButton component="a" href="/tasks/workshop">
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
          ) : userDepartment === "Engineering" ? (
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
                  <ListItemButton component="a"
                    href="/inventorydocumentation"
                    sx={{ pl: "80px" }}>
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
          ) : userDepartment === "Purchaser" ? (
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
                  <ListItemButton component="a"
                    href="/inventorydocumentation"
                    sx={{ pl: "80px" }}>
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
          ) : userDepartment === "Workshop" ? (
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
                  <ListItemButton component="a"
                    href="/inventorydocumentation"
                    sx={{ pl: "80px" }}>
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
                  <ListItemButton component="a"
                    href="/inventorydocumentation"
                    sx={{ pl: "80px" }}>
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
      </SideBox >
    </ThemeProvider >
  );
};


export default SideBar;
