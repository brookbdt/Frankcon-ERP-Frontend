import {
  AddIcCallOutlined,
  InsertPhotoOutlined,
  Mail,
  Notifications,
  Pets,
  YouTube,
} from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Badge,
  ButtonGroup,
  Collapse,
  Grid,
  Icon,
  IconButton,
  InputBase,
  Menu,
  Popover,
  Slide,
  styled,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { borderRadius } from "@mui/system";
import React, { useEffect, useState } from "react";
import LeaveRequest from "./LeaveRequest";
import CloseIcon from "@mui/icons-material/Close";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  createInboundReceivingForm,
  createLeaveRequest,
  createMaterialTransferRequest,
  createNotification,
  createPaymentRequest,
  createPurchaseRequest,
  createTagRegistration,
  getInboundReceivingId,
  getMaterialId,
  getPaymentId,
  getPurchaseId,
  getTagRegistrationId,
  getVendorId,
  readAllProjects,
  readInventory,
  readProject,
  readTaskEmployee,
} from "../lib";
import ButtonGroups from "./ButtonGroups";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { fetcher } from "../lib/api";
import Dropdown from "./Projects/dropdown";

const Navbar = ({ jwt }) => {
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "0",
    marginRight: "0px",
    background: " #F6F6F6",
    color: "black",
    boxShadow: "none",
    border: "0px",
  });

  const [value, setValue] = React.useState(dayjs(new Date()));
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const formOptions = [
    "Material Transfer",
    "Inbound Receiving Form",
    "Tag Registration",
    "Leave Request",
  ];
  const [formSelectedIndex, setFormSelectedIndex] = useState();
  // const [prioritySelectedIndex, setPrioritySelectedIndex] = useState(0);

  const [leaveRequestType, setLeaveRequestType] = useState("");
  const [itemType, setItemType] = useState("");
  const [selectedInventoryId, setSelectedInventoryId] = useState("");
  const [inboundItemType, setInboundItemType] = useState("");
  const [
    materialTransferRequesterQuantity,
    setMaterialTransferRequesterQuantity,
  ] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [paymentPaidTo, setPaymentPaidTo] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [tagRegistrationID, setTagRegistrationID] = useState("");
  const [paymentInformation, setPaymentInformation] = useState("");
  const [paymentRequesterName, setPaymentRequesterName] = useState("");
  const [paymentProjectTitle, setPaymentProjectTitle] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentRequestDate, setPaymentRequestDate] = useState("");
  const [paymentPriorityLevel, setPaymentPriorityLevel] = useState("");
  const [paymentReason, setPaymentReason] = useState("");
  const [paymentInvoice, setPaymentInvoice] = useState("");

  const [itemAmount, setItemAmount] = useState("");
  const [tagQuantity, setTagQuantity] = useState("");
  const [itemInformation, setItemInformation] = useState("");
  const [inboundItemQuantity, setInboundItemQuantity] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const [materialItemQuantity, setMaterialItemQuantity] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [materialRequesterName, setMaterialRequesterName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [materialRequestDate, setMaterialRequestDate] = useState("");
  const [materialTransferLocation, setMaterialTransferLocation] = useState("");
  const [inboundRequestDate, setInboundRequestDate] = useState("");
  const [additionalDetail, setAdditionalDetail] = useState("");
  const [materialAdditionalDetail, setMaterialAdditionalDetail] = useState("");
  const [inboundItemDescription, setInboundItemDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [inboundItemName, setInboundItemName] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDuration, setLeaveDuration] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [vendorImage, setVendorImage] = useState([]);
  const [tagImage, setTagImage] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [purchaseId, setPurchaseId] = useState("");
  const [materialTransferId, setMaterialTransferId] = useState("");
  const [inboundReceivingFormId, setInboundReceivingFormId] = useState("");
  const [tagName, setTagName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [inboundVendorPhoneNumber, setVendorInboundPhoneNumber] = useState("");
  const [itemUnitPrice, setItemPrice] = useState("");
  const [itemTotalPrice, setItemTotalPrice] = useState("");
  const [attachedProforma, setAttachedProforma] = useState([]);
  const [projectAttachedProforma, setProjectAttachedProforma] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [checkedTR, setCheckedTR] = React.useState(false);
  const [checkedIRF, setCheckedIRF] = React.useState(false);
  const [checkedAMT, setCheckedAMT] = React.useState(false);
  const [checkedPayment, setCheckedPayment] = React.useState(false);
  const [checkedLeaveRequest, setCheckedLeaveRequest] = React.useState(false);

  const [previewImage, setPreviewImage] = useState();
  const [previewImageTR, setPreviewImageTR] = useState();

  const buttons = ["Forms", "Requests", "Help Center"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    setOpen(true);
  };
  const handlePurchaseClick = () => {
    setPurchaseOpen(true);
  };
  const handleSlide = () => {
    setChecked((prev) => !prev);
    setCheckedPayment(false);
    setCheckedAMT(false);
    setCheckedLeaveRequest(false);
    setCheckedTR(false);
    setCheckedIRF(false);
  };

  const handleClose = () => {
    setChecked((prev) => !prev);
  };
  const handleClosePayment = () => {
    setCheckedPayment((prev) => !prev);
  };
  const handleCloseAMT = () => {
    setCheckedAMT((prev) => !prev);
  };
  const handleCloseLeaveRequest = () => {
    setCheckedLeaveRequest((prev) => !prev);
  };
  const handleCloseIRF = () => {
    setCheckedIRF((prev) => !prev);
  };
  const handleCloseTR = () => {
    setCheckedTR((prev) => !prev);
  };

  const sendPurchaseRequest = async () => {
    const formData = new FormData();

    for (const doc of attachedProforma) {
      formData.append("files.attachedProforma", doc);
    }
    for (const img of vendorImage) {
      formData.append("files.vendorImage", img);
    }
    formData.append(
      "data",
      JSON.stringify({
        itemName,
        additionalDetail,
        requestDate: requestDate?.toISOString(),
        requesterName,
        purchaseId,
        approvedBy: user,
        responsibleDepartment: userDepartment,
        itemQuantity,
        vendorId,
        itemType,
        // employee_name: user,
        // user,
        // jwt: jwt,
        vendorName,
        vendorAddress,
        vendorEmail,
        vendorPhone,
        itemUnitPrice,
        itemTotalPrice,
        isApproved: "pending",
      })
    );
    setAlertOpen(true);
    // const newPurchaseRequest = {
    //   data: {
    //     // tasks: {
    //     itemName,
    //     additionalDetail,
    //     requestDate,
    //     requesterName,
    //     itemQuantity,
    //     itemType,
    //     jwt: jwt,
    //     employee_name: user,

    //     // },
    //   },
    // };
    const purchaseRequest = await createPurchaseRequest(formData, jwt);
    // const newNotification = await createNotification(
    //   {
    //     data: {
    //       date: new Date().toISOString(),
    //       type: "purchase request",
    //       purchaseRequest: purchaseRequest?.data?.data?.id,
    //     },
    //   },
    //   jwt
    // );
    const newNotification = {
      data: {
        date: new Date().toISOString(),
        type: "purchase request",
        purchaseRequest: purchaseRequest.data?.data?.id,
      },
    };
    // employee: employee.data?.data?.[0]?.id,

    await createNotification(newNotification, jwt);
    console.log({ purchaseRequest });
    console.log({ newNotification });
    console.log(formData, jwt);
  };

  const sendPaymentRequest = async () => {
    const formData = new FormData();
    const employee = await readTaskEmployee(jwt, user);

    formData.append(
      "data",
      JSON.stringify({
        paymentRequestId: paymentId,
        paidTo: paymentPaidTo,
        projectTitle: paymentProjectTitle,
        paymentType,
        paymentAmount,
        requestDate: paymentRequestDate,
        paymentPriorityLevel,
        paymentReason,
        paymentInformation,
        employee: employee.data?.data?.[0]?.id,
        department: userDepartment,
        isApproved: "pending",
      })
    );
    setAlertOpen(true);

    const paymentRequest = await createPaymentRequest(formData, jwt);
    const newNotification = {
      data: {
        date: new Date().toISOString(),
        type: "payment request",
        paymentRequest: paymentRequest.data?.data?.id,
      },
    };
    // employee: employee.data?.data?.[0]?.id,

    await createNotification(newNotification, jwt);
    // const newNotification = await createNotification(
    //   {
    //     data: {
    //       date: new Date().toISOString(),
    //       type: "purchase request",
    //       purchaseRequest: purchaseRequest?.data?.data?.id,
    //     },
    //   },
    //   jwt
    // );
    // const newNotification = {
    //   data: {
    //     date: new Date().toISOString(),
    //     type: "purchase request",
    //     purchaseRequest: purchaseRequest.data?.data?.id,
    //   },
    // };
    // employee: employee.data?.data?.[0]?.id,

    // await createNotification(newNotification, jwt);
    // console.log({ purchaseRequest });
    // console.log({ newNotification });
    // console.log(formData, jwt);
  };
  const sendInboundReceivingForm = async () => {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        tagRegistrationID,
        itemName: tagName,
        leaveEndDate: inboundRequestDate,
        itemQuantity: inboundItemQuantity,
        vendorPhoneNumber: inboundVendorPhoneNumber,
        description: inboundItemDescription,
        // vendorinboundItemTypeId,
      })
    );
    setAlertOpen(true);

    // const inboundReceivingForm =
    createInboundReceivingForm(formData, jwt);
    //  (
    //   formData,
    //   jwt
    // );
    // const inboundReceivingForm = await createInboundReceivingForm(
    //   formData,
    //   jwt
    // );

    // const newNotification = {
    //   data: {
    //     date: new Date().toISOString(),
    //     type: "inbound receiving form",
    //     inboundReceivingForm: inboundReceivingForm.data?.data?.id,
    //   },
    // };
    // employee: employee.data?.data?.[0]?.id,

    // await createNotification(newNotification, jwt);
    // console.log({ purchaseRequest });
    // console.log({ newNotification });
    // console.log(formData, jwt);
  };
  const sendTagRegistration = async () => {
    const formData = new FormData();

    for (const img of tagImage) {
      formData.append("files.tagImage", img);
    }

    formData.append(
      "data",
      JSON.stringify({
        tagRegistrationID,
        requestType: inboundItemType,
        receivingFormId: inboundReceivingFormId,
        itemName: tagName,
        originalItemQuantity: tagQuantity,
        itemQuantity: tagQuantity,
        itemStorageLocation: storageLocation,
        itemAmount,
        itemInformation,
        // vendorinboundItemTypeId,
      })
    );

    setAlertOpen(true);

    // const inboundReceivingForm =
    createTagRegistration(formData, jwt);
    //  (
    //   formData,
    //   jwt
    // );
    // const inboundReceivingForm = await createInboundReceivingForm(
    //   formData,
    //   jwt
    // );

    // const newNotification = {
    //   data: {
    //     date: new Date().toISOString(),
    //     type: "inbound receiving form",
    //     inboundReceivingForm: inboundReceivingForm.data?.data?.id,
    //   },
    // };
    // employee: employee.data?.data?.[0]?.id,

    // await createNotification(newNotification, jwt);
    // console.log({ purchaseRequest });
    // console.log({ newNotification });
    // console.log(formData, jwt);
  };
  const sendMaterialTransfer = async () => {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        materialTransferId,
        requesterName: materialRequesterName,
        itemType: inventoryResponse.find((i) => i.id === selectedInventoryId)
          ?.attributes?.itemName,
        itemQuantity: materialItemQuantity,
        requestDate: materialRequestDate,
        transferLocation: materialTransferLocation,
        additionalDetail: materialAdditionalDetail,
        isApproved: "pending",
        tag_registration: selectedInventoryId,

        // vendorinboundItemTypeId,
      })
    );
    setAlertOpen(true);

    // const inboundReceivingForm =
    const materialRequest = await createMaterialTransferRequest(formData, jwt);
    const newNotification = {
      data: {
        date: new Date().toISOString(),
        type: "material request",
        materialtransferrequest: materialRequest.data?.data?.id,
      },
    };
    // employee: employee.data?.data?.[0]?.id,

    await createNotification(newNotification, jwt);
  };
  const handleImage = (e) => {
    setVendorImage(e.target.files);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleImageTR = (e) => {
    setTagImage(e.target.files);
    setPreviewImageTR(URL.createObjectURL(e.target.files[0]));
  };

  const addPurchaseRequest = (
    <Paper
      sx={{
        width: "566px",
        height: "100%",
        m: 1,
        zIndex: 1,
        borderColor: "#4339F2",
        borderRadius: "10px",
      }}
      elevation={4}
      variant="outlined"
    >
      <Box
        sx={{
          width: "566px",
          height: "100%",
          paddingX: "22px",
          paddingTop: "16px",
          //   bgcolor: "white",
          borderRadius: "10px",
        }}
      >
        <Stack direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="700" fontSize="20px" marginBottom="11px">
              Purchase Order
            </Typography>

            <IconButton
              onClick={handleClose}
              sx={{
                backgroundColor: "#F6F6F6",
                width: "24px",
                height: "24px",
                alignSelf: "flex-start",
              }}
            >
              <CloseIcon sx={{ width: "15px", height: "15px" }} />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <TextField
              placeholder="Item Name"
              defaultValue="Type requester name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              variant="filled"
              sx={{
                width: "248px",
                "& .MuiInputBase-root": {
                  height: "46px",
                },
              }}
            >
              Type Requester Name
            </TextField>

            <Stack>
              <Typography
                sx={{
                  color: "#3F4158",
                  fontWeight: "700",
                  fontSize: "12px",
                }}
              >
                Purchase ID
              </Typography>
              <Typography
                sx={{
                  color: "#6F7082",
                  fontWeight: "400",
                  fontSize: "14px",
                  alignSelf: "flex-end",
                }}
              >
                {purchaseId}
              </Typography>
            </Stack>
          </Stack>
          <Box height="25px" />
          <Stack direction="row">
            <Typography
              sx={{
                color: "#3F4158",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Item Detail
            </Typography>
            <Box width="12px" />
            <Divider sx={{ width: "400px", alignSelf: "center" }} />
          </Stack>
          <Box height="15px" />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                <InputLabel>Item Type</InputLabel>

                <Select
                  labelId="demo-simple-select-filled-label"
                  // defaultValue="Select leave request type"
                  id="demo-simple-select-filled"
                  value={inboundItemType}
                  onChange={(e) => setInboundItemType(e.target.value)}
                >
                  <MenuItem value={"Type 1"}>Type 1 </MenuItem>
                  <MenuItem value={"Type 2"}>Type 2 </MenuItem>
                  <MenuItem value={"Type 3"}>Type 3 </MenuItem>
                  <MenuItem value={"Type 4"}>Type 4 </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                <InputLabel>Item Quantity</InputLabel>

                <Select
                  labelId="demo-simple-select-filled-label"
                  // defaultValue="Select leave request type"
                  id="demo-simple-select-filled"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                >
                  <MenuItem value={" 1"}> 1 </MenuItem>
                  <MenuItem value={" 2"}> 2 </MenuItem>
                  <MenuItem value={" 3"}> 3 </MenuItem>
                  <MenuItem value={" 4"}> 4 </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Request Date"
                  value={requestDate}
                  // value={parseISO(salesPage.dateAt)}
                  onChange={(newValue) => {
                    setRequestDate(newValue);
                  }}
                  // onChange={handleDateAtOnChange}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      sx={{
                        "& .MuiInputBase-input": {
                          height: "13px", // Set your height here.
                          width: "185px",
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Requester Name"
                defaultValue="Type requester name"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                Type Requester Name
              </TextField>
            </Grid>
          </Grid>
          <Box height="16px" />
          <Stack direction="row">
            <Typography
              sx={{
                color: "#3F4158",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Additional Detail
            </Typography>
            <Box width="12px" />
            <Divider sx={{ width: "400px", alignSelf: "center" }} />
          </Stack>
          <Box height="12px" />
          <TextField
            width="100%"
            value={additionalDetail}
            onChange={(e) => setAdditionalDetail(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                height: "96px", // Set your height here.
              },
            }}
          />
          <Box height="11px" />

          <Typography color="#0F112E" fontWeight="700" fontSize="20px">
            Vendor Detail
          </Typography>
          <Box height="9px" />
          <Stack direction="row" justifyContent="space-between">
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="17px"
              alignItems="center"
            >
              <Box>
                <IconButton
                  component="label"
                  width="56px"
                  height="56px"
                  sx={previewImage ? "" : { backgroundColor: "#E8E7FD" }}
                >
                  <input
                    id="file"
                    multiple
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImage}
                  />
                  {previewImage ? (
                    <Avatar
                      width="52px"
                      height="52px"
                      sx={{ padding: 0, margin: 0 }}
                      // borderRadius="50%"
                      src={previewImage}
                    />
                  ) : (
                    <InsertPhotoOutlined sx={{ color: "#4339F2" }} />
                  )}
                </IconButton>
              </Box>
              <Stack justifyContent="center">
                <Typography fontSize="16px" fontWeight="500" color="#4339F2">
                  Add Vendors
                </Typography>
                <Typography fontWeight="400" fontSize="14px" color="#6F7082">
                  Add vendors to the list
                </Typography>
              </Stack>
            </Stack>
            <Stack alignItems="flex-end">
              <Typography fontWeight="400" fontSize="14px" color="#3F4158">
                Vendor ID
              </Typography>
              <Typography fontWeight="400" fontSize="14px" color="#6F7082">
                {vendorId}
              </Typography>
            </Stack>
          </Stack>
          <Box height="16px" />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight="500" fontSize="14px" color="#3F4158">
              Vendor Detail
            </Typography>
            <Divider width="400px" />
          </Stack>
          <Box height="15px" />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                placeholder="Vendor Name"
                defaultValue="Type vendor name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                variant="filled"
                sx={{ width: "248px", height: "46px" }}
              >
                Type Vendor Name
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Physical Address"
                defaultValue="Enter vendor address"
                value={vendorAddress}
                onChange={(e) => setVendorAddress(e.target.value)}
                variant="filled"
                sx={{ width: "248px", height: "46px" }}
              >
                Type Vendor Name
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Email Address"
                defaultValue="Enter vendor email address"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                variant="filled"
                sx={{ width: "248px", height: "46px" }}
              >
                Type Vendor email Address
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Vendor Phone Number"
                defaultValue="Enter vendor phone number"
                value={vendorPhone}
                onChange={(e) => setVendorPhone(e.target.value)}
                variant="filled"
                sx={{ width: "248px", height: "46px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+2519</InputAdornment>
                  ),
                }}
              >
                Type Vendor Phone Number
              </TextField>
            </Grid>
          </Grid>
          <Box height="16px" />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Item Detail</Typography>
            <Divider width="400" px />
          </Stack>
          <Box height="19px" />
          <Grid container>
            <Grid item xs={6}>
              <TextField
                placeholder="Item Unit Price"
                defaultValue="Enter item unit price"
                value={itemUnitPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                variant="filled"
                sx={{ width: "248px", height: "46px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">ETB</InputAdornment>
                  ),
                }}
              >
                Item Unit Price
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Item Total Price"
                defaultValue="Enter item total price"
                value={itemTotalPrice}
                onChange={(e) => setItemTotalPrice(e.target.value)}
                variant="filled"
                sx={{ width: "248px", height: "46px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">ETB</InputAdornment>
                  ),
                }}
              >
                Item Total Price
              </TextField>
            </Grid>
          </Grid>
          <Box height="23px" />
          <Grid conatiner>
            <Grid item>
              <Button
                variant="filled"
                sx={{
                  backgroundColor: "#F6F6F6",
                  padding: 0,
                  width: "248px",
                  height: "46px",
                }}
              >
                <label
                  style={{
                    // backgroundColor: "red",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <input
                    id="file"
                    hidden
                    multiple
                    type="file"
                    onChange={(e) => setAttachedProforma(e.target.files)}
                  />
                  <Typography
                    color="#6F7082"
                    fontWeight="600px"
                    fontSize="12px"
                  >
                    Attach Proforma
                  </Typography>

                  <NoteAddOutlinedIcon
                    sx={{ width: "16px", height: "16px", color: "#6F7082" }}
                  />
                </label>
              </Button>
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="space-between">
            <Button variant="text">Reset</Button>
            <Box>
              <Button
                variant="contained"
                onClick={sendPurchaseRequest}
                sx={{
                  backgroundColor: "#4339F2",
                  borderRadius: "10px",
                  width: "192px",
                  height: "48px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <AddIcon /> */}
                  {/* <Box width="12px"></Box> */}
                  <Typography fontWeight="600" fontSize="12px">
                    Send for Approval
                  </Typography>
                  <ArrowForwardIcon
                    fontWeight="600"
                    width="24px"
                    height="24px"
                  />
                </Stack>
              </Button>
            </Box>
          </Stack>
          <Box height="17px" />
        </Stack>
      </Box>
    </Paper>
  );
  const addTagRegistration = (
    <Paper
      sx={{
        width: "566px",
        height: "100%",
        m: 1,
        zIndex: 1,
        borderColor: "#4339F2",
        borderRadius: "10px",
      }}
      elevation={4}
      variant="outlined"
    >
      <Box
        sx={{
          width: "566px",
          height: "100%",
          paddingX: "22px",
          paddingTop: "16px",
          //   bgcolor: "white",
          borderRadius: "10px",
        }}
      >
        <Stack direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="700" fontSize="20px" marginBottom="11px">
              Tag Registration
            </Typography>

            <IconButton
              onClick={handleCloseTR}
              sx={{
                backgroundColor: "#F6F6F6",
                width: "24px",
                height: "24px",
                alignSelf: "flex-start",
              }}
            >
              <CloseIcon sx={{ width: "15px", height: "15px" }} />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <IconButton
                component="label"
                width="56px"
                height="56px"
                sx={previewImageTR ? "" : { backgroundColor: "#E8E7FD" }}
              >
                <input
                  id="file"
                  multiple
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageTR}
                />
                {previewImageTR ? (
                  <Avatar
                    width="52px"
                    height="52px"
                    sx={{ padding: 0, margin: 0 }}
                    // borderRadius="50%"
                    src={previewImageTR}
                  />
                ) : (
                  <InsertPhotoOutlined sx={{ color: "#4339F2" }} />
                )}
              </IconButton>
              <Box width="18px" />
              <Stack>
                <Typography fontWeight="500" fontSize="16px" color="#4339F2">
                  Upload Image
                </Typography>
                <Typography fontWeight="400" fontSize="14px" color="#6F7082">
                  Add image for tag registration
                </Typography>
              </Stack>
            </Box>
            <Stack>
              <Typography
                sx={{
                  color: "#3F4158",
                  fontWeight: "700",
                  fontSize: "12px",
                }}
              >
                Item Tag ID
              </Typography>
              <Typography
                sx={{
                  color: "#6F7082",
                  fontWeight: "400",
                  fontSize: "14px",
                  alignSelf: "flex-end",
                }}
              >
                {tagRegistrationID}
              </Typography>
            </Stack>
          </Stack>
          <Box height="25px" />
          <Stack direction="row">
            <Typography
              sx={{
                color: "#3F4158",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Item Detail
            </Typography>
            <Box width="12px" />
            <Divider sx={{ width: "400px", alignSelf: "center" }} />
          </Stack>
          <Box height="15px" />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                placeholder="Item Name"
                defaultValue="Type requester name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                Item Name
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Tag Quantity"
                defaultValue="Type requester name"
                value={tagQuantity}
                onChange={(e) => setTagQuantity(e.target.value)}
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                Tag Quantity
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Item Storage Location"
                defaultValue="Type requester name"
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value)}
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                Item Storage Location
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Item Amount
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={itemAmount}
                  label="Age"
                  onChange={(e) => setItemAmount(e.target.value)}
                  // sx={{
                  //   width: "248px",
                  //   "& .MuiInputBase-root": {
                  //     height: "30px",
                  //   },
                  // }}
                >
                  <MenuItem value="0">0%</MenuItem>
                  <MenuItem value="25">25%</MenuItem>
                  <MenuItem value="50">50%</MenuItem>
                  <MenuItem value="75">75%</MenuItem>
                  <MenuItem value="100">100%</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box height="16px" />
          <Stack direction="row">
            <Typography
              sx={{
                color: "#3F4158",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Item Information
            </Typography>
            <Box width="12px" />
            <Divider sx={{ width: "400px", alignSelf: "center" }} />
          </Stack>
          <Box height="12px" />
          <TextField
            width="100%"
            value={itemInformation}
            onChange={(e) => setItemInformation(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                height: "96px", // Set your height here.
              },
            }}
          />
          <Box height="11px" />

          <Stack direction="row" justifyContent="space-between">
            <Button variant="text">Reset</Button>
            <Box>
              <Button
                disableElevation
                variant="contained"
                onClick={sendTagRegistration}
                sx={{
                  backgroundColor: "#4339F2",
                  borderRadius: "10px",
                  // width: "192px",
                  height: "48px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <AddIcon /> */}
                  {/* <Box width="12px"></Box> */}
                  <Typography fontWeight="600" fontSize="12px">
                    Generate Item Tag
                  </Typography>
                  <Box width="14px" />
                  <ArrowForwardIcon
                    fontWeight="600"
                    width="24px"
                    height="24px"
                  />
                </Stack>
              </Button>
            </Box>
          </Stack>
          <Box height="17px" />
        </Stack>
      </Box>
    </Paper>
  );
  const addInboundReceivingForm = (
    <Paper
      sx={{
        width: "568px",
        height: "100%",
        m: 1,
        zIndex: 1,
        borderColor: "#4339F2",
        borderRadius: "10px",
      }}
      elevation={4}
      variant="outlined"
    >
      <Box
        sx={{
          width: "568px",
          height: "100%",
          paddingX: "22px",
          paddingTop: "16px",
          //   bgcolor: "white",
          borderRadius: "10px",
        }}
      >
        <Stack direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="700" fontSize="20px" marginBottom="11px">
              Inbound Receiving Form
            </Typography>

            <IconButton
              onClick={handleCloseIRF}
              sx={{
                backgroundColor: "#F6F6F6",
                width: "24px",
                height: "24px",
                alignSelf: "flex-start",
              }}
            >
              <CloseIcon sx={{ width: "15px", height: "15px" }} />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <FormControl
              variant="filled"
              sx={{
                width: "248px",
                "& .MuiInputBase-root": {
                  height: "46px",
                },
              }}
            >
              <InputLabel>Request Type</InputLabel>

              <Select
                labelId="demo-simple-select-filled-label"
                // defaultValue="Select leave request type"
                id="demo-simple-select-filled"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
              >
                <MenuItem value={"Type 1"}>Type 1 </MenuItem>
                <MenuItem value={"Type 2"}>Type 2 </MenuItem>
                <MenuItem value={"Type 3"}>Type 3 </MenuItem>
                <MenuItem value={"Type 4"}>Type 4 </MenuItem>
              </Select>
            </FormControl>

            <Stack>
              <Typography
                sx={{
                  color: "#3F4158",
                  fontWeight: "700",
                  fontSize: "12px",
                }}
              >
                Receiving Form Id
              </Typography>
              <Typography
                sx={{
                  color: "#6F7082",
                  fontWeight: "400",
                  fontSize: "14px",
                  alignSelf: "flex-end",
                }}
              >
                {inboundReceivingFormId}
              </Typography>
            </Stack>
          </Stack>
          <Box height="25px" />
          <Stack direction="row">
            <Typography
              sx={{
                color: "#3F4158",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Receiving Form
            </Typography>
            <Box width="12px" />
            <Divider sx={{ width: "400px", alignSelf: "center" }} />
          </Stack>
          <Box height="15px" />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                placeholder="Item Name"
                defaultValue="Type requester name"
                value={inboundItemName}
                onChange={(e) => setInboundItemName(e.target.value)}
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                Type Item Name
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Leave End Date"
                  value={inboundRequestDate}
                  // value={parseISO(salesPage.dateAt)}
                  onChange={(newValue) => {
                    setInboundRequestDate(newValue);
                  }}
                  // onChange={handleDateAtOnChange}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      sx={{
                        "& .MuiInputBase-input": {
                          height: "13px", // Set your height here.
                          width: "185px",
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
              >
                <InputLabel>Item Quantity</InputLabel>

                <Select
                  labelId="demo-simple-select-filled-label"
                  // defaultValue="Select leave request type"
                  id="demo-simple-select-filled"
                  value={inboundItemQuantity}
                  onChange={(e) => setInboundItemQuantity(e.target.value)}
                >
                  <MenuItem value={" 1"}> 1 </MenuItem>
                  <MenuItem value={" 2"}> 2 </MenuItem>
                  <MenuItem value={" 3"}> 3 </MenuItem>
                  <MenuItem value={" 4"}> 4 </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder="Vendor Phone Number"
                defaultValue="Enter vendor phone number"
                value={inboundVendorPhoneNumber}
                onChange={(e) => setVendorInboundPhoneNumber(e.target.value)}
                variant="filled"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+2519</InputAdornment>
                  ),
                }}
              >
                Type Vendor Phone Number
              </TextField>
            </Grid>
          </Grid>
          <Box height="16px" />
          <Stack direction="row">
            <Typography
              sx={{
                color: "#3F4158",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Description
            </Typography>
            <Box width="12px" />
            <Divider sx={{ width: "400px", alignSelf: "center" }} />
          </Stack>
          <Box height="12px" />
          <TextField
            width="100%"
            value={inboundItemDescription}
            onChange={(e) => setInboundItemDescription(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                height: "96px", // Set your height here.
              },
            }}
          />
          <Box height="11px" />

          <Stack direction="row" justifyContent="space-between">
            <Button variant="text">Reset</Button>
            <Box>
              <Button
                variant="contained"
                onClick={sendInboundReceivingForm}
                sx={{
                  backgroundColor: "#4339F2",
                  borderRadius: "10px",
                  width: "192px",
                  height: "48px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <AddIcon /> */}
                  {/* <Box width="12px"></Box> */}
                  <Typography fontWeight="600" fontSize="12px">
                    Save Item Form
                  </Typography>
                  <ArrowForwardIcon
                    fontWeight="600"
                    width="24px"
                    height="24px"
                  />
                </Stack>
              </Button>
            </Box>
          </Stack>
          <Box height="17px" />
        </Stack>
      </Box>
    </Paper>
  );
  // const AddMaterialTransfer = () => (

  // );

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [projectsResponse, setProjectsResponse] = useState([]);
  const [inventoryResponse, setInventoryResponse] = useState([]);
  const [inventoryTest, setTestInventory] = useState([]);

  let res = [];

  useEffect(() => {
    const fetchData = async () => {
      const lastPurchase = await getPurchaseId(jwt);
      const lastTR = await getTagRegistrationId(jwt);

      const lastMaterial = await getMaterialId(jwt);
      const lastPurchaseId = lastPurchase?.data?.data?.[0]?.id || 1;
      const lastTRID = lastTR?.data?.data?.[0]?.id || 1;

      const lastMaterialId = lastMaterial?.data?.data?.[0]?.id || 1;

      const lastInboundReceivingForm = await getInboundReceivingId(jwt);
      const lastInboundReceivingId =
        lastInboundReceivingForm?.data?.data?.[0]?.id || 1;

      setPurchaseId(`PR - ${new Date().getFullYear()} - ${lastPurchaseId + 1}`);

      setTagRegistrationID(
        `TR - ${new Date().getFullYear()} - ${lastTRID + 1}`
      );

      setMaterialTransferId(
        `MR - ${new Date().getFullYear()} - ${lastMaterialId + 1}`
      );
      setInboundReceivingFormId(
        `RF - ${new Date().getFullYear()} - ${lastInboundReceivingId + 1}`
      );
      const lastVendor = await getVendorId(jwt);
      const lastPayment = await getPaymentId(jwt);
      const lastVendorId = lastVendor?.data?.data?.[0]?.id || 1;
      const lastPaymentId = lastPayment?.data?.data?.[0]?.id || 1;
      setVendorId(`#VD${new Date().getFullYear()}-${lastVendorId + 1}`);
      setPaymentId(`#PR${new Date().getFullYear()}-${lastPaymentId + 1}`);

      const result = await readAllProjects(jwt, user);
      setProjectsResponse(result?.data?.data);

      const inventoryResult = await readInventory(jwt);
      console.log({ ir: inventoryResult });

      res = inventoryResult.data.data;

      console.log({ res });
      setInventoryResponse(inventoryResult.data.data);

      // console.log("the projects are: ", { projectsResponse });
    };

    fetchData();
  }, [user]);

  const sendLeaveRequest = async () => {
    const newLeaveRequest = {
      data: {
        // tasks: {
        leaveRequestType,
        requesterName,
        leaveDuration,
        leaveStartDate,
        leaveEndDate,
        leaveReason,

        // },
      },
    };
    const leaveRequest = await createLeaveRequest(newLeaveRequest, jwt);
    const newNotification = {
      data: {
        date: new Date().toISOString(),
        type: "leave request",
        leaverequest: leaveRequest.data?.data?.id,
      },
    };
    // employee: employee.data?.data?.[0]?.id,

    await createNotification(newNotification, jwt);
    console.log(newLeaveRequest);
  };

  const sendVendorDetail = () => {
    setAlertOpen(true);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1 }} width="100%">
        <Collapse in={alertOpen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Request Created Successfully
          </Alert>
        </Collapse>

        {/* <Box sx={{ p: 2 }}> */}

        {/* </Box> */}
        {/* <AppBar position="sticky" elevation="0"> */}
        <Box display="flex" justifyContent="flex-end">
          <StyledToolbar>
            <ButtonGroup
              variant="plain"
              aria-label="outlined primary button group"
            >
              <Button font onClick={handleSlide}>
                Purchase Order
              </Button>
              <Button
                font
                onClick={() => {
                  setCheckedPayment(true);
                  setCheckedAMT(false);
                  setCheckedLeaveRequest(false);
                  setChecked(false);
                  setCheckedTR(false);
                  setCheckedIRF(false);
                }}
              >
                Payment Request
              </Button>
              <Dropdown
                selectedItemText={formOptions[formSelectedIndex]}
                dropDownWidth="112px"
                dropDownColor="#6F7082"
                dropDownBorderRadius="10px"
                dropDownBackgroundColor="#F6F6F6"
                dropDownHeight="24px"
                dropDownFontSize="12px"
              >
                {formOptions.map((formOption, index) => (
                  <MenuItem
                    id={formOption}
                    key={formOption}
                    value={formStatus}
                    //   disabled={index === 2}
                    selected={index === formSelectedIndex}
                    onClick={() => {
                      setFormSelectedIndex(index);
                      formSelectedIndex === 0
                        ? (setCheckedAMT(true),
                          setFormStatus("Material Transfer"),
                          setCheckedLeaveRequest(false),
                          setCheckedPayment(false),
                          setChecked(false),
                          setCheckedTR(false),
                          setCheckedIRF(false))
                        : formSelectedIndex === 1
                        ? (setFormStatus("Inbound Receiving Form"),
                          console.log(formSelectedIndex),
                          setCheckedIRF(true),
                          setChecked(false),
                          setCheckedAMT(false),
                          setCheckedPayment(false),
                          setCheckedLeaveRequest(false),
                          setCheckedTR(false))
                        : formSelectedIndex === 2
                        ? (setFormStatus("Tag Registration"),
                          setChecked(false),
                          setCheckedTR(true),
                          setCheckedIRF(false),
                          setCheckedPayment(false),
                          setCheckedAMT(false),
                          setCheckedLeaveRequest(false))
                        : formSelectedIndex === 3
                        ? (setFormStatus("Leave Request"),
                          setCheckedLeaveRequest(true),
                          setChecked(false),
                          setCheckedPayment(false),
                          setCheckedTR(false),
                          setCheckedIRF(false),
                          setCheckedAMT(false))
                        : "";
                    }}
                  >
                    {formOption}
                  </MenuItem>
                ))}
              </Dropdown>
              {/* <Button onClick={handleClick}>Requests</Button> */}
              <Button>Status</Button>
              {/* <pre>{JSON.stringify({ projectsResponse }, null, 2)}</pre> */}
              <Button>Help Center</Button>
            </ButtonGroup>
            {/* <pre>{JSON.stringify({ projectsResponse }, null, 2)}</pre> */}
          </StyledToolbar>
        </Box>
        {/* </AppBar> */}
      </Box>
      <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        {addPurchaseRequest}
      </Slide>

      <Slide direction="right" in={checkedTR} mountOnEnter unmountOnExit>
        {addTagRegistration}
      </Slide>

      <Slide direction="right" in={checkedIRF} mountOnEnter unmountOnExit>
        {addInboundReceivingForm}
      </Slide>
      <Slide direction="right" in={checkedAMT} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            width: "568px",
            height: "100%",
            m: 1,
            zIndex: 1,
            borderColor: "#4339F2",
            borderRadius: "10px",
          }}
          elevation={4}
          variant="outlined"
        >
          <Box
            sx={{
              width: "568px",
              height: "100%",
              paddingX: "22px",
              paddingTop: "16px",
              //   bgcolor: "white",
              borderRadius: "10px",
            }}
          >
            <Stack direction="column">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  fontWeight="700"
                  fontSize="20px"
                  marginBottom="11px"
                >
                  Material Transfer
                </Typography>

                <IconButton
                  onClick={handleCloseAMT}
                  sx={{
                    backgroundColor: "#F6F6F6",
                    width: "24px",
                    height: "24px",
                    alignSelf: "flex-start",
                  }}
                >
                  <CloseIcon sx={{ width: "15px", height: "15px" }} />
                </IconButton>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <TextField
                  placeholder="Item Name"
                  defaultValue="Type requester name"
                  value={materialRequesterName}
                  onChange={(e) => setMaterialRequesterName(e.target.value)}
                  variant="filled"
                  sx={{
                    width: "248px",
                    "& .MuiInputBase-root": {
                      height: "46px",
                    },
                  }}
                >
                  RequesterName
                </TextField>

                <Stack>
                  <Typography
                    sx={{
                      color: "#3F4158",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    Material Transfer Id
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6F7082",
                      fontWeight: "400",
                      fontSize: "14px",
                      alignSelf: "flex-end",
                    }}
                  >
                    {materialTransferId}
                  </Typography>
                </Stack>
              </Stack>
              <Box height="25px" />
              <Stack direction="row">
                <Typography
                  sx={{
                    color: "#3F4158",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Item Detail
                </Typography>
                <Box width="12px" />
                <Divider sx={{ width: "400px", alignSelf: "center" }} />
              </Stack>
              <Box height="15px" />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "46px",
                      },
                    }}
                  >
                    <InputLabel>Item Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      defaultValue="Select leave request type"
                      id="demo-simple-select-filled"
                      value={selectedInventoryId}
                      onChange={(e) => setSelectedInventoryId(e.target.value)}
                    >
                      {inventoryResponse?.map((i) => (
                        <MenuItem value={i?.id}>
                          {i.attributes?.itemName}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "46px",
                      },
                    }}
                  >
                    <InputLabel>Item Quantity</InputLabel>

                    <Select
                      labelId="demo-simple-select-filled-label"
                      // defaultValue="Select leave request type"
                      id="demo-simple-select-filled"
                      value={materialItemQuantity}
                      onChange={(e) => setMaterialItemQuantity(e.target.value)}
                    >
                      {/* {inventoryResponse?.map((i) => (
                        TODO
                        <MenuItem value={i?.id}>
                          {i.attributes?.itemQuantity}{" "}
                        </MenuItem>
                      ))} */}
                      <MenuItem value={" 1"}> 1 </MenuItem>
                      <MenuItem value={" 2"}> 2 </MenuItem>
                      <MenuItem value={" 3"}> 3 </MenuItem>
                      <MenuItem value={" 4"}> 4 </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Request Date"
                      value={materialRequestDate}
                      // value={parseISO(salesPage.dateAt)}
                      onChange={(newValue) => {
                        setMaterialRequestDate(newValue);
                      }}
                      // onChange={handleDateAtOnChange}
                      renderInput={(params) => (
                        <TextField
                          variant="filled"
                          sx={{
                            "& .MuiInputBase-input": {
                              height: "13px", // Set your height here.
                              width: "225px",
                            },
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Transfer Location"
                    defaultValue="Transfer Location"
                    value={materialTransferLocation}
                    onChange={(e) =>
                      setMaterialTransferLocation(e.target.value)
                    }
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "46px",
                      },
                    }}
                  >
                    Transfer Location
                  </TextField>
                </Grid>
              </Grid>
              <Box height="16px" />
              <Stack direction="row">
                <Typography
                  sx={{
                    color: "#3F4158",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Additional Detail
                </Typography>
                <Box width="12px" />
                <Divider sx={{ width: "400px", alignSelf: "center" }} />
              </Stack>
              <Box height="12px" />
              <TextField
                width="100%"
                value={materialAdditionalDetail}
                onChange={(e) => setMaterialAdditionalDetail(e.target.value)}
                sx={{
                  "& .MuiInputBase-input": {
                    height: "96px", // Set your height here.
                  },
                }}
              />
              <Box height="11px" />

              <Stack direction="row" justifyContent="space-between">
                <Button variant="text">Reset</Button>
                <Box>
                  <Button
                    variant="contained"
                    onClick={sendMaterialTransfer}
                    sx={{
                      backgroundColor: "#4339F2",
                      borderRadius: "10px",
                      width: "192px",
                      height: "48px",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {/* <AddIcon /> */}
                      {/* <Box width="12px"></Box> */}
                      <Typography fontWeight="600" fontSize="12px">
                        Send For Approval
                      </Typography>
                      <ArrowForwardIcon
                        fontWeight="600"
                        width="24px"
                        height="24px"
                      />
                    </Stack>
                  </Button>
                </Box>
              </Stack>
              <Box height="17px" />
            </Stack>
          </Box>
        </Paper>
      </Slide>
      <Slide direction="right" in={checkedPayment} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            width: "566px",
            height: "100%",
            m: 1,
            zIndex: 1,
            borderColor: "#4339F2",
            borderRadius: "10px",
          }}
          elevation={4}
          variant="outlined"
        >
          <Box
            sx={{
              width: "566px",
              height: "100%",
              paddingX: "22px",
              paddingTop: "16px",
              borderColor: "#4339F2",

              //   bgcolor: "white",
              borderRadius: "10px",
            }}
          >
            <Stack direction="column">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  fontWeight="700"
                  fontSize="20px"
                  marginBottom="11px"
                >
                  Payment Request
                </Typography>

                <IconButton
                  onClick={handleClosePayment}
                  sx={{
                    backgroundColor: "#F6F6F6",
                    width: "24px",
                    height: "24px",
                    alignSelf: "flex-start",
                  }}
                >
                  <CloseIcon sx={{ width: "15px", height: "15px" }} />
                </IconButton>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  gap="17px"
                  alignItems="center"
                >
                  <Box>
                    <IconButton
                      component="label"
                      width="56px"
                      height="56px"
                      sx={previewImage ? "" : { backgroundColor: "#E8E7FD" }}
                    >
                      <Avatar
                        width="52px"
                        height="52px"
                        sx={{ padding: 0, margin: 0 }}
                        // borderRadius="50%"
                        src=""
                      />
                    </IconButton>
                  </Box>
                  <Stack>
                    <Typography
                      fontWeight="400"
                      fontSize="14px"
                      color="#6F7082"
                    >
                      Finance Department
                    </Typography>
                  </Stack>
                  <Stack justifyContent="center">
                    <Typography
                      fontSize="16px"
                      fontWeight="500"
                      color="#4339F2"
                    >
                      {/* {user} */}
                    </Typography>
                    <Typography
                      fontWeight="400"
                      fontSize="14px"
                      color="#6F7082"
                    >
                      {/* {userDepartment} */}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-end">
                  <Typography fontWeight="400" fontSize="14px" color="#3F4158">
                    Payment Request ID
                  </Typography>
                  <Typography fontWeight="400" fontSize="14px" color="#6F7082">
                    {paymentId}
                  </Typography>
                </Stack>
              </Stack>
              <Box height="25px" />
              <Stack direction="row">
                <Typography
                  sx={{
                    color: "#3F4158",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Payment Detail
                </Typography>
                <Box width="12px" />
                <Divider sx={{ width: "400px", alignSelf: "center" }} />
              </Stack>
              <Box height="15px" />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Paid To"
                    defaultValue="Type vendor name"
                    value={paymentPaidTo}
                    onChange={(e) => setPaymentPaidTo(e.target.value)}
                    variant="filled"
                    sx={{ width: "248px", height: "46px" }}
                  >
                    Paid To
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "46px",
                      },
                    }}
                  >
                    <InputLabel>Project Title</InputLabel>

                    <Select
                      labelId="demo-simple-select-filled-label"
                      defaultValue="Select leave request type"
                      id="demo-simple-select-filled"
                      value={paymentProjectTitle}
                      onChange={(e) => setPaymentProjectTitle(e.target.value)}
                    >
                      {projectsResponse?.map((i) => (
                        <MenuItem value={i.attributes?.projectTitle}>
                          {i.attributes?.projectTitle}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Payment Amount"
                    defaultValue="Type vendor name"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    variant="filled"
                    sx={{ width: "248px", height: "46px" }}
                  >
                    Payment Amount
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Request Date"
                      value={paymentRequestDate}
                      // value={parseISO(salesPage.dateAt)}
                      onChange={(newValue) => {
                        setPaymentRequestDate(newValue);
                      }}
                      // onChange={handleDateAtOnChange}
                      renderInput={(params) => (
                        <TextField
                          variant="filled"
                          sx={{
                            "& .MuiInputBase-input": {
                              height: "24px", // Set your height here.
                              width: "185px",
                            },
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "46px",
                      },
                    }}
                  >
                    <InputLabel>Payment Priority Level</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      // defaultValue="Select leave request type"
                      id="demo-simple-select-filled"
                      value={paymentPriorityLevel}
                      onChange={(e) => setPaymentPriorityLevel(e.target.value)}
                    >
                      <MenuItem value={"HIGH"}>HIGH </MenuItem>
                      <MenuItem value={"NORMAL"}>NORMAL </MenuItem>
                      <MenuItem value={"LOW"}>LOW </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "46px",
                      },
                    }}
                  >
                    <InputLabel>Payment Reason</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      // defaultValue="Select leave request type"
                      id="demo-simple-select-filled"
                      value={paymentReason}
                      onChange={(e) => setPaymentReason(e.target.value)}
                    >
                      <MenuItem value={"Type 1"}>Type 1 </MenuItem>
                      <MenuItem value={"Type 2"}>Type 2 </MenuItem>
                      <MenuItem value={"Type 3"}>Type 3 </MenuItem>
                      <MenuItem value={"Type 4"}>Type 4 </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box height="16px" />
              <Grid container>
                <Grid item xs={6}>
                  <Button
                    variant="filled"
                    sx={{
                      backgroundColor: "#F6F6F6",
                      padding: 0,
                      width: "248px",
                      height: "46px",
                    }}
                  >
                    <label
                      style={{
                        // backgroundColor: "red",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <input
                        id="file"
                        hidden
                        multiple
                        type="file"
                        onChange={(e) => setPaymentInvoice(e.target.files)}
                      />
                      <Typography
                        color="#6F7082"
                        fontWeight="600px"
                        fontSize="12px"
                      >
                        Attach Payment Invoice
                      </Typography>

                      <NoteAddOutlinedIcon
                        sx={{ width: "16px", height: "16px", color: "#6F7082" }}
                      />
                    </label>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "46px",
                      },
                    }}
                  >
                    <InputLabel>Payment Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      // defaultValue="Select leave request type"
                      id="demo-simple-select-filled"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <MenuItem value={"Pay out"}>Pay out </MenuItem>
                      <MenuItem value={"Pay in"}>Pay in </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box height="16px" />
              <Stack direction="row">
                <Typography
                  sx={{
                    color: "#3F4158",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Payment Information
                </Typography>
                <Box width="12px" />
                <Divider sx={{ width: "368px", alignSelf: "center" }} />
              </Stack>
              <Box height="12px" />
              <TextField
                width="100%"
                value={paymentInformation}
                onChange={(e) => setPaymentInformation(e.target.value)}
                sx={{
                  "& .MuiInputBase-input": {
                    height: "96px", // Set your height here.
                  },
                }}
              />
              <Box height="16px" />

              <Stack direction="row" justifyContent="space-between">
                <Button variant="text">Reset</Button>
                <Box>
                  <Button
                    variant="contained"
                    onClick={sendPaymentRequest}
                    sx={{
                      backgroundColor: "#4339F2",
                      borderRadius: "10px",
                      width: "192px",
                      height: "48px",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {/* <AddIcon /> */}
                      {/* <Box width="12px"></Box> */}
                      <Typography fontWeight="600" fontSize="12px">
                        Send for Approval
                      </Typography>
                      <ArrowForwardIcon
                        fontWeight="600"
                        width="24px"
                        height="24px"
                      />
                    </Stack>
                  </Button>
                </Box>
              </Stack>
              <Box height="17px" />
            </Stack>
          </Box>
        </Paper>
      </Slide>
      <Slide
        direction="right"
        in={checkedLeaveRequest}
        mountOnEnter
        unmountOnExit
      >
        <Box sx={{ p: 2 }}>
          <Paper
            sx={{
              m: 1,
              zIndex: 1,
              borderColor: "#4339F2",
              borderRadius: "10px",
            }}
            elevation={4}
            variant="outlined"
          >
            <Box
              sx={{
                width: "566px",
                height: "680px",
                paddingX: "22px",
                paddingTop: "16px",
                //   bgcolor: "white",
                borderRadius: "10px",
              }}
            >
              <Stack direction="column">
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    fontWeight="700"
                    fontSize="20px"
                    marginBottom="11px"
                  >
                    Leave Request
                  </Typography>
                  <CancelIcon />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <FormControl
                    variant="filled"
                    sx={{
                      width: "248px",
                      "& .MuiInputBase-root": {
                        height: "56px",
                      },
                    }}
                  >
                    <InputLabel>Request Type</InputLabel>

                    <Select
                      labelId="demo-simple-select-filled-label"
                      defaultValue="Select leave request type"
                      id="demo-simple-select-filled"
                      value={leaveRequestType}
                      onChange={(e) => setLeaveRequestType(e.target.value)}
                    >
                      <MenuItem value={"Reason 1"}>Reason1 </MenuItem>
                      <MenuItem value={"Reason 2"}>Reason2 </MenuItem>
                      <MenuItem value={"Reason 3"}>Reason3 </MenuItem>
                      <MenuItem value={"Reason 4"}>Reason4 </MenuItem>
                    </Select>
                  </FormControl>
                  <Stack>
                    <Typography
                      sx={{
                        color: "#3F4158",
                        fontWeight: "700",
                        fontSize: "12px",
                      }}
                    >
                      Leave Request ID
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6F7082",
                        fontWeight: "400",
                        fontSize: "14px",
                        alignSelf: "flex-end",
                      }}
                    >
                      #LR965-180
                    </Typography>
                  </Stack>
                </Stack>
                <Box height="25px" />
                <Stack direction="row">
                  <Typography
                    sx={{
                      color: "#3F4158",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Request Detail
                  </Typography>
                  <Box width="12px" />
                  <Divider sx={{ width: "400px", alignSelf: "center" }} />
                </Stack>
                <Box height="15px" />
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      placeholder="Requester Name"
                      defaultValue="Type requester name"
                      value={requesterName}
                      onChange={(e) => setRequesterName(e.target.value)}
                      variant="filled"
                      sx={{ width: "248px", height: "46px" }}
                    >
                      Type Requester Name
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      variant="filled"
                      sx={{
                        width: "248px",
                        "& .MuiInputBase-root": {
                          height: "56px",
                        },
                      }}
                    >
                      <InputLabel>Leave Duration</InputLabel>

                      <Select
                        labelId="demo-simple-select-filled-label"
                        // defaultValue="Select leave request type"
                        id="demo-simple-select-filled"
                        value={leaveDuration}
                        onChange={(e) => setLeaveDuration(e.target.value)}
                      >
                        <MenuItem value={"1 Day"}>1 Day </MenuItem>
                        <MenuItem value={"2 Days"}>2 Days </MenuItem>
                        <MenuItem value={"3 Days"}>3 Days </MenuItem>
                        <MenuItem value={"4 Days"}>4 Days </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Leave Start Date"
                        value={leaveStartDate}
                        // value={parseISO(salesPage.dateAt)}
                        onChange={(newValue) => {
                          setLeaveStartDate(newValue);
                        }}
                        // onChange={handleDateAtOnChange}
                        renderInput={(params) => (
                          <TextField
                            variant="filled"
                            sx={{
                              "& .MuiInputBase-input": {
                                height: "13px", // Set your height here.
                                width: "185px",
                              },
                            }}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Leave End Date"
                        value={leaveEndDate}
                        // value={parseISO(salesPage.dateAt)}
                        onChange={(newValue) => {
                          setLeaveEndDate(newValue);
                        }}
                        // onChange={handleDateAtOnChange}
                        renderInput={(params) => (
                          <TextField
                            variant="filled"
                            sx={{
                              "& .MuiInputBase-input": {
                                height: "13px", // Set your height here.
                                width: "185px",
                              },
                            }}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Box height="16px" />
                <Stack direction="row">
                  <Typography
                    sx={{
                      color: "#3F4158",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Leave Reason
                  </Typography>
                  <Box width="12px" />
                  <Divider sx={{ width: "400px", alignSelf: "center" }} />
                </Stack>
                <Box height="12px" />
                <TextField
                  width="100%"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      height: "96px", // Set your height here.
                    },
                  }}
                />
                <Box height="11px" />
                <Stack direction="row" justifyContent="space-between">
                  <Button variant="text">Reset</Button>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={sendLeaveRequest}
                      sx={{
                        backgroundColor: "#4339F2",
                        borderRadius: "10px",
                        width: "192px",
                        height: "48px",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {/* <AddIcon /> */}
                        <Box width="12px"></Box>
                        <Typography fontWeight="600" fontSize="12px">
                          Create Order
                        </Typography>
                      </Stack>
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Slide>
    </>
  );
};

export default Navbar;
