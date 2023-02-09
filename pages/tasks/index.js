import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Fade,
  FilledInput,
  FormControl,
  IconButton,
  InputLabel,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import ChangingButton from "../../components/ChangingButton";
// import PriorityButton from "../../components/ChangingButton";
import SideBar from "../../components/SideBar";
import EmployeesLayout from "../../layout/employees";
import TasksLayout from "../../layout/tasks";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import {
  createTask,
  createWorkshopTask,
  readEmployee,
  readEmployeeTask,
  readTask,
  readTaskEmployee,
  readUser,
} from "../api";
import ButtonGroups from "../../components/ButtonGroups";
import TasksTable from "../../components/Tasks/TasksTable";
import Workshop from "../../components/Workshop/Workshop";
// import { convertToLocalTime } from "date-fns-timezone";
// import { format } from "date-fns";

const high = require("../../public/static/high.png");
const low = require("../../public/static/low.png");
const normal = require("../../public/static/normal.png");
const inprogress = require("../../public/static/normal.png");

// const priority = [high, low, normal];

const Tasks = ({ jwt }) => {
  const [selected, setSelected] = useState([]);

  const changeImage = (value) => {
    setSelected(priority[value] + 1);
    if (priority[value] == "high") {
      setSelected(priority[0]);
    }
  };

  const columns = [
    { id: "task details", label: "Task Details", minWidth: 170 },
    {
      id: "task status",
      label: "Task Status",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "date",
      label: "Date",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "priority",
      label: "Priority",
      // minWidth: 170,
      // align: "right",
      format: (value) => value.toFixed(2),
    },
  ];
  const buttons = ["Description", "Files", "Comments "];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "648px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(dayjs(new Date()));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const currentDate = value == null ? "" : value.toString();
  console.log(currentDate);

  const [addEmployee, setAddEmployee] = useState(false);

  // const [question, setQuestions] = useState({});

  const addEmployeeToTask = () => setAddEmployee(true);

  const [response, setResponse] = useState([]);
  const [employees, setEmployees] = useState([]);
  // const [employeeResponse, setEmployeeResponse] = useState([]);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const result = await readEmployeeTask(jwt, user);
      const employeeList = await readEmployee(jwt, user);
      setResponse(result.data);
      setEmployees(employeeList.data);
    };
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);
    console.log("relation is:", response);
  }, [user]);

  const sendTask = async () => {
    const employee = await readTaskEmployee(jwt, user);
    console.log("emp is", employee);

    const newTask = {
      // Title: name,
      // data: { faq },
      // title: title,
      // description: description,
      // comment: comment,
      // title: data.title,
      data: {
        // tasks: {
        title,
        department: userDepartment,
        description,
        comment,
        priority,
        status,
        date: currentDate,
        jwt: jwt,
        employee: employee.data?.data?.[0]?.id,
        // },
      },
    };
    createTask(newTask, jwt);
    // {
    //   userDepartment === "workshop" ? createWorkshopTask(newTask, jwt) : "";
    // }
    console.log("The task is:", newTask);
  };
  const [buttonName, setButtonName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [width, setWidth] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [status, setStatus] = useState("INPROGRESS");

  // console.log("response", response, jwt);
  const addTask = (
    <Paper
      sx={{ m: 1, width: "63%", borderColor: "#4339F2", borderRadius: "10px" }}
      elevation={4}
    >
      <Box
        sx={{
          width: "648px",
          height: "528px",
          paddingLeft: "24px",
          paddingTop: "15px",
        }}
      >
        <Stack paddingRight="24px" direction="column">
          <Typography fontWeight="700" fontSize="20px" marginBottom="11px">
            Add New Task
          </Typography>
          <Stack gap="24px" direction="row">
            <Box sx={{ width: "384px", height: "32px" }}>
              <TextField
                id="outlined-basic"
                value={title}
                label="Task Title"
                variant="outlined"
                inputProps={{
                  style: {
                    height: "10px",
                  },
                }}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: "384px", height: "3px" }}
              />
            </Box>
            <Box sx={{ width: "192px", height: "3px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select a Date"
                  value={value}
                  // value={parseISO(salesPage.dateAt)}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  // onChange={handleDateAtOnChange}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          height: "10px", // Set your height here.
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Stack>
          <Box height="24px"></Box>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography>Assignee</Typography>
              <AvatarGroup max={6}>
                <Avatar
                  sx={{ width: "24px", height: "24px" }}
                  alt="assignee"
                  src="/static/Avatar.png"
                />
                <Box width="4.9px"></Box>
                <Avatar
                  sx={{ width: "24px", height: "24px" }}
                  alt="Trevor Henderson"
                  src="/static/Avatar (2).png"
                />
                <Box width="4.9px"></Box>

                <Avatar
                  sx={{ width: "24px", height: "24px" }}
                  alt="Trevor Henderson"
                  src="/static/Avatar.png"
                />
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box
                    borderRadius="50%"
                    sx={{ width: "24px", height: "24px", bgcolor: "#4339F2" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <PopupState variant="popper" popupId="demo-popup-popper">
                      {(popupState) => (
                        <div>
                          <Button {...bindToggle(popupState)}>
                            <AddIcon
                              sx={{
                                width: "32px",
                                height: "32px",
                                padding: "6.45px",
                                color: "white",
                              }}
                            />
                          </Button>
                          <Popper {...bindPopper(popupState)} transition>
                            {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={350}>
                                <Paper
                                  sx={{ height: "150px", overflow: "auto" }}
                                >
                                  {employees?.data?.map((employee) => (
                                    <Stack>
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                      >
                                        <Avatar
                                          src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                                        />
                                        <Typography sx={{ p: 2 }}>
                                          {employee?.attributes?.firstName}{" "}
                                          {employee?.attributes?.lastName}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  ))}
                                </Paper>
                              </Fade>
                            )}
                          </Popper>
                        </div>
                      )}
                    </PopupState>
                  </Box>
                </Box>
              </AvatarGroup>
              <Box width="71.73px"></Box>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Priority:</Typography>
                  <Box width="16px"></Box>
                  <ChangingButton
                    color={
                      priority === "HIGH"
                        ? "#F44336"
                        : priority === "MEDIUM"
                        ? "#FFBA2E"
                        : priority === "LOW"
                        ? "#24B07D"
                        : "gray"
                    }
                    values={["HIGH", "MEDIUM", "LOW"]}
                    selectedValue={priority}
                    onChange={setPriority}
                  />
                </Stack>
                <Box width="24px"></Box>
                <Typography>Status: </Typography>
                <Box width="24px"></Box>
                <ChangingButton
                  color={
                    status === "INPROGRESS"
                      ? "#CFCFD6"
                      : status === "TO DO"
                      ? "#FFBA2E"
                      : status === "IN REVIEW"
                      ? "#24B07D"
                      : status === "DONE"
                      ? "#24B07D"
                      : "gray"
                  }
                  values={["INPROGRESS", "TO DO", "IN REVIEW", "DONE"]}
                  selectedValue={status}
                  onChange={setStatus}
                />
              </Stack>
              <Box height="25px"></Box>
            </Stack>
          </Stack>
          <Box height="25px"></Box>
          <Stack>
            <ButtonGroups
              buttons={buttons}
              selectedIndex={selectedIndex}
              clickedButtonColor="#4339F1"
              unClickedButtonColor="#9FA0AB"
              onClick={(i) => {
                setSelectedIndex(i);
              }}
            />
          </Stack>
          <Box height="15px" width="100%"></Box>
          <Box>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bgcolor="yellow"
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box height="6px"></Box>
          <Typography>Comments(0)</Typography>
          <Box height="10px"></Box>
          <FormControl variant="filled">
            <InputLabel value={comment} htmlFor="component-filled">
              Be the first to comment on the task
            </InputLabel>
            <FilledInput
              id="component-filled"
              onChange={(e) => setComment(e.target.value)}
              // value={comment}
              // onChange={handleChange}
            />
          </FormControl>
          <Box height="26px"></Box>
          <Stack direction="row" justifyContent="space-between">
            <Button variant="text">Reset</Button>
            <Box>
              <Button
                variant="contained"
                onClick={sendTask}
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
                    Add Task
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
    <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
      {/* <Stack direction="row"> */}
      {/* <SideBar /> */}
      {/* <Stack
        // paddingRight="104px"
        direction="column"
        width="80%"
        height="100vh"
      > */}
      <>
        {/* <Navbar /> */}
        <Stack
          direction="column"
          paddingLeft="48px"
          paddingRight="60px"
          width="100%"
          height="100vh"
        >
          <Box height="24px"></Box>
          <Stack justifyContent="space-between" direction="row">
            <Typography fontWeight="700" fontSize="32px">
              My Tasks
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
                Add Task
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
              All Tasks(48)
            </Typography>
            <Box display="flex" flexDirection="row">
              <ChevronLeftIcon />
              <ChevronRightIcon />
            </Box>
          </Stack>

          {/* list view */}
          {/* <Paper sx={{ width: "100%", overflow: "hidden" }}> */}
          {/* <Stack direction="row"> */}
          <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
            {addTask}
          </Slide>
          {userDepartment === "workshop" ? (
            <Workshop jwt={jwt} />
          ) : (
            <>
              <TasksTable jwt={jwt} />
              {/* </Stack> */}
              {/* {response.map((response, index) => ( */}
              {/* ))} */}
              {/* </Paper> */}
            </>
          )}
        </Stack>
      </>
      {/* </Stack> */}
      {/* </Stack> */}
    </Layout>
  );
};

export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);

  const taskResponse = await fetcher(
    `https://frankconerp.herokuapp.com/api/tasks`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  console.log(2, { taskResponse });
  if (taskResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        taskResponse: taskResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: taskResponse.error.message,
      },
    };
  }
}
export default Tasks;
