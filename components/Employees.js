import AddIcon from "@mui/icons-material/Add";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../layout/employees";
import {
  createEmployee,
  createPayroll,
  getEmployeeId,
  readEmployee,
  readEmployeeByDepartment,
} from "../lib";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import EmployeesTable from "./Employees/EmployeesTable";

const Employees = ({ jwt }) => {
  dayjs.extend(relativeTime);
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };

  const [activity, setActivity] = useState("ONLINE");

  const [checked, setChecked] = React.useState(false);

  const [value, setValue] = React.useState(dayjs(new Date()));
  const [selected, setSelected] = useState([]);

  const [firstName, setFirstname] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [employeeGrossSalary, setEmployeeGrossSalary] = useState("");
  const [employeeNetSalary, setEmployeeNetSalary] = useState("");
  const [employeeImage, setEmployeeImage] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [previewImage, setPreviewImage] = useState();
  // const [vendorImage, setVendorImage] = useState([]);

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  console.log("the user is", user);
  console.log("the user department is", userDepartment);

  const sendEmployee = () => {
    const formData = new FormData();
    setChecked((prev) => !prev);
    formData.append("files.employeeImage", employeeImage);
    formData.append(
      "data",
      JSON.stringify({
        firstName,
        lastName,
        employeeId,
        email,
        phone,
        dateOfBirth,
        address,
        employmentDate,
        department,
        position,
        employmentType,
        employeeGrossSalary,
        employeeNetSalary,
      })
    );
    setAlertOpen(true);

    createEmployee(formData, jwt);
    createPayroll(formData, jwt);
    console.log("the jwt is", jwt);
  };
  const handleImage = (e) => {
    setEmployeeImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortByDepartment = async () => {};
  const openOptions = Boolean(anchorEl);
  const id = openOptions ? "simple-popover" : undefined;

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readEmployee(jwt);
      const financeDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Finance"
      );
      const architectureDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Architecture"
      );
      const humanResourceDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Human Resource"
      );
      const InventoryDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Inventory"
      );
      const engineeringDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Engineering"
      );
      const purchaserDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Purchaser"
      );
      const workshopDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Workshop"
      );

      setResponse(result.data);
      console.log(response);

      const lastEmployee = await getEmployeeId(jwt);
      const lastEmployeeId = lastEmployee?.data?.data?.[0]?.id || 1;
      setEmployeeId(`EM - ${new Date().getFullYear()} - ${lastEmployeeId + 1}`);
      console.log({ lastEmployee });
    };
    fetchData();
  }, [user]);

  const columns = [
    { id: "employee name", label: "Employee Name", minWidth: 170 },
    {
      id: "department",
      label: "Department",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "contact",
      label: "Contact",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "activity",
      label: "Activity",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  const addEmployee = (
    <Paper sx={{ m: 1, zIndex: 1, height: "670px" }} elevation={4}>
      <Box
        sx={{
          width: "568px",
          height: "639px",
          paddingX: "24px",
          paddingTop: "15px",
        }}
      >
        <Stack direction="column">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="700" fontSize="20px" marginBottom="11px">
              Add New Employee
            </Typography>
            <IconButton onClick={handleSlide}>
              <CloseOutlined />
            </IconButton>
          </Box>

          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap="24px" alignItems="center">
              <IconButton
                // sx={{ width: 0, height: 0, padding: 0, margin: 0 }}
                component="label"
                width="56px"
                height="56px"
                // sx={previewImage ? "" : { backgroundColor: "#E8E7FD" }}
                // style={{
                //   // backgroundColor: "red",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   // padding: "12px",
                //   width: "100%",
                //   height: "100%",
                // }}
              >
                <input
                  id="file"
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
                  <Avatar sx={{ width: "52px", height: "52px" }} />
                )}
              </IconButton>
              <Stack>
                <Typography sx={{ color: "#4339F2" }}>
                  Image Upload - 98%
                </Typography>
                <Typography sx={{ color: "#6F7082", fontWeight: "400" }}>
                  Select avatar or upload image
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{ textAlign: "right" }}>
              <Typography
                sx={{ color: "#3F4158", fontSize: "14px", fontWeight: "700" }}
              >
                Employee ID
              </Typography>
              <Typography sx={{ color: "#6F7082", fontSize: "14px" }}>
                {employeeId}
              </Typography>
            </Stack>
          </Stack>
          <Box height="16px"></Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{ fontSize: "14px", fontWeight: "500", color: "#3F4158" }}
            >
              Employee Detail
            </Typography>
            <Divider sx={{ width: "400px", alignSelf: "center" }} />
          </Stack>
          <Box height="15px"></Box>
          <Stack direction="column" gap="16px">
            <Stack direction="row" gap="24px">
              <FormControl variant="filled">
                <TextField
                  value={firstName}
                  htmlFor="component-filled"
                  label="First Name"
                  size="small"
                  sx={{
                    width: "248px",
                    "& .MuiInputBase-root": {
                      height: "46px",
                    },
                  }}
                  defaultValue="Employee first name"
                  variant="filled"
                  onChange={(e) => setFirstname(e.target.value)}
                ></TextField>
              </FormControl>
              <FormControl variant="filled">
                <TextField
                  value={lastName}
                  htmlFor="component-filled"
                  label="Last Name"
                  sx={{
                    width: "248px",
                    "& .MuiInputBase-root": {
                      height: "46px",
                    },
                  }}
                  defaultValue="Employee last name"
                  size="small"
                  variant="filled"
                  onChange={(e) => setLastname(e.target.value)}
                ></TextField>
              </FormControl>
            </Stack>
            <Stack direction="row" gap="24px">
              <FormControl variant="filled">
                <TextField
                  value={email}
                  htmlFor="component-filled"
                  label="Email Address"
                  sx={{
                    width: "248px",
                    "& .MuiInputBase-root": {
                      height: "46px",
                    },
                  }}
                  size="small"
                  defaultValue="Employee email address"
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </FormControl>
              <FormControl variant="filled">
                <TextField
                  value={phone}
                  htmlFor="component-filled"
                  label="Phone Number"
                  size="small"
                  sx={{
                    width: "248px",
                    "& .MuiInputBase-root": {
                      height: "46px",
                    },
                  }}
                  defaultValue="00 112 233"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+251 9</InputAdornment>
                    ),
                  }}
                  onChange={(e) => setPhone(e.target.value)}
                ></TextField>
              </FormControl>
            </Stack>
            <Stack direction="row" gap="24px">
              <Box sx={{ width: "248px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="MM/DD/YYYY"
                    label="Date of Birth"
                    value={dateOfBirth}
                    // value={parseISO(salesPage.dateAt)}
                    onChange={(newValue) => {
                      setDateOfBirth(newValue);
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
              </Box>
              <FormControl variant="filled">
                <TextField
                  value={address}
                  htmlFor="component-filled"
                  label="Employee Address"
                  sx={{
                    width: "248px",
                    "& .MuiInputBase-root": {
                      height: "46px",
                    },
                  }}
                  defaultValue="Enter Employee Address"
                  variant="filled"
                  size="small"
                  onChange={(e) => setAddress(e.target.value)}
                ></TextField>
              </FormControl>
            </Stack>
          </Stack>
          <Box height="16px"></Box>
          <Stack direction="row" gap="12px">
            <Typography>Employment Detail</Typography>
            <Divider sx={{ width: "368px", alignSelf: "center" }} />
          </Stack>
          <Box height="19px" />
          <Stack direction="row" gap="24px">
            <FormControl
              variant="filled"
              sx={{
                width: "248px",
                "& .MuiInputBase-root": {
                  height: "46px",
                },
              }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                defaultValue="Enter Employee Address"
                id="demo-simple-select-filled"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value={"Inventory"}>Inventory</MenuItem>
                <MenuItem value={"Finance"}>Finance</MenuItem>
                <MenuItem value={"Human Resource"}>Human Resource</MenuItem>
                <MenuItem value={"Workshop"}>Workshop</MenuItem>
                <MenuItem value={"Architect"}>Architect</MenuItem>
                <MenuItem value={"Purchaser"}>Purchaser</MenuItem>
                <MenuItem value={"Engineering"}>Engineering</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              sx={{
                width: "248px",
                "& .MuiInputBase-root": {
                  height: "46px",
                },
              }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Position
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                defaultValue="Enter Employee Address"
                id="demo-simple-select-filled"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <MenuItem value={"Glass Works"}>Glass Works</MenuItem>
                <MenuItem value={"Metal Works"}>Metal Works</MenuItem>
                <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                <MenuItem value={"Woodworks"}>Woodworks</MenuItem>
                <MenuItem value={"Electrician"}>Electrician</MenuItem>
                <MenuItem value={"Finance Manager"}>Finance Manager</MenuItem>
                <MenuItem value={"HR Manager"}>HR Manager</MenuItem>
                <MenuItem value={"Project Manager"}>Project Manager</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Box height="16px" />
          <Stack direction="row" gap="24px">
            <Box sx={{ width: "248px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Employment Date"
                  value={employmentDate}
                  // value={parseISO(salesPage.dateAt)}
                  onChange={(newValue) => {
                    setEmploymentDate(newValue);
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
            </Box>
            <FormControl
              variant="filled"
              sx={{
                width: "248px",
                "& .MuiInputBase-root": {
                  height: "46px",
                },
              }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Employment Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                defaultValue="Enter Employee Address"
                id="demo-simple-select-filled"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <MenuItem value={"Full Time"}>Full Time</MenuItem>
                <MenuItem value={"Part Tim"}>Part Time</MenuItem>
                <MenuItem value={"Contractual"}>Contractual</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Box height="16px" />
          <Stack direction="row" gap="24px">
            <FormControl variant="filled">
              <TextField
                value={employeeGrossSalary}
                htmlFor="component-filled"
                label="Employee Gross Salary"
                size="small"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
                defaultValue="00 112 233"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">ETB</InputAdornment>
                  ),
                }}
                onChange={(e) => setEmployeeGrossSalary(e.target.value)}
              ></TextField>
            </FormControl>
            <FormControl variant="filled">
              <TextField
                value={employeeNetSalary}
                htmlFor="component-filled"
                label="Employee Net Salary"
                size="small"
                sx={{
                  width: "248px",
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                }}
                defaultValue="00 112 233"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">ETB</InputAdornment>
                  ),
                }}
                onChange={(e) => setEmployeeNetSalary(e.target.value)}
              ></TextField>
            </FormControl>
          </Stack>
          <Box height="24px" />

          <Stack direction="row" justifyContent="space-between">
            <Button variant="text">Reset</Button>
            <Box>
              <Button
                variant="contained"
                onClick={sendEmployee}
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
                  <AddIcon />
                  <Box width="12px"></Box>
                  <Typography fontWeight="600" fontSize="12px">
                    Add Employee
                  </Typography>
                </Stack>
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
  return (
    <>
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
              <CloseOutlined fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Request Created Successfully
        </Alert>
      </Collapse>
      <Stack
        paddingRight="55px"
        direction="column"
        width="100%"
        height="100%"
        overflowY="auto"
      >
        <Box height="24px"></Box>
        <Stack justifyContent="space-between" direction="row">
          <Typography fontWeight="700" fontSize="32px">
            Employees
          </Typography>
          <Button
            onClick={handleSlide}
            sx={{
              marginTop: "3px",
              backgroundColor: "#E1E0F6",
              color: "#4339F2",
              borderRadius: "10px",
              paddingX: "16px",
              paddingY: "12px",
            }}
          >
            <AddIcon />
            <Typography variant="p" fontSize="12px" fontWeight="600">
              Add Employee
            </Typography>
          </Button>
        </Stack>
        <EmployeesLayout />
        <Stack
          marginTop="11px"
          marginBottom="8px"
          direction="row"
          justifyContent="space-between"
        >
          <Typography fontWeight="700" fontSize="20px">
            All Employees ({response?.data?.length})
          </Typography>

          <Button component="a" href="/employees/sortbydepartment">
            {" "}
            Sort By Department
          </Button>
        </Stack>

        {open ? (
          <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
            {addEmployee}
          </Slide>
        ) : null}
        <EmployeesTable jwt={jwt} />
      </Stack>
    </>
  );
};

export default Employees;
