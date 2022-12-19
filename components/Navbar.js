import {
  AddIcCallOutlined,
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
  styled,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { borderRadius } from "@mui/system";
import React, { useState } from "react";
import LeaveRequest from "./LeaveRequest";
import CloseIcon from "@mui/icons-material/Close";

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
import { createLeaveRequest, createPurchaseRequest } from "../pages/api";
import ButtonGroups from "./ButtonGroups";
import { useFetchUser, useFetchUserDepartment } from "./lib/authContext";

const Navbar = () => {
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
  const [checked, setChecked] = React.useState(false);

  const [value, setValue] = React.useState(dayjs(new Date()));
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [close, setClose] = useState(false);

  const [leaveRequestType, setLeaveRequestType] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [additionalDetail, setAdditionalDetail] = useState("");
  const [itemName, setItemName] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDuration, setLeaveDuration] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");

  const buttons = ["Forms", "Requests", "Help Center"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    setOpen(true);
  };
  const handlePurchaseClick = () => {
    setPurchaseOpen(true);
  };

  const handleClose = () => {
    setClose(true);
  };

  const sendLeaveRequest = () => {
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
    createLeaveRequest(newLeaveRequest);
    console.log(newLeaveRequest);
  };

  const sendPurchaseRequest = () => {
    setAlertOpen(true);
    const newPurchaseRequest = {
      data: {
        // tasks: {
        itemName,
        additionalDetail,
        requestDate,
        requesterName,
        itemQuantity,
        itemType,
        user,

        // },
      },
    };
    createPurchaseRequest(newPurchaseRequest);
    console.log(newPurchaseRequest);
  };

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    // 	backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing("4px"),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // margin:0,
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
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
      <Popover
        id="1"
        open={open}
        // anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Paper sx={{ m: 1, zIndex: 1 }} elevation={4}>
            <Box
              sx={{
                width: "568px",
                height: "591px",
                paddingX: "24px",
                paddingTop: "15px",
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
      </Popover>
      <Popover
        id="1"
        open={purchaseOpen}
        // anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Paper sx={{ m: 1, zIndex: 1 }} elevation={4}>
            <Box
              sx={{
                width: "568px",
                height: "591px",
                paddingX: "24px",
                paddingTop: "15px",
              }}
            >
              <Stack direction="column">
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    fontWeight="700"
                    fontSize="20px"
                    marginBottom="11px"
                  >
                    Purchase Order
                  </Typography>
                  <CancelIcon />
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
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
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
      </Popover>
      {/* <AppBar position="sticky" elevation="0"> */}
      <Box display="flex" justifyContent="flex-end">
        <StyledToolbar>
          <ButtonGroup
            variant="plain"
            aria-label="outlined primary button group"
          >
            <Button font onClick={handlePurchaseClick}>
              Purchase Order
            </Button>
            <Button onClick={handleClick}>Requests</Button>
            <Button>Status</Button>
            <Button>Help Center</Button>
          </ButtonGroup>
        </StyledToolbar>
      </Box>
      {/* </AppBar> */}
    </Box>
  );
};

export default Navbar;
