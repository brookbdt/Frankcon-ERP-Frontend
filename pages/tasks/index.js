import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  Fade,
  FilledInput,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Popper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import React, { useEffect, useState } from "react";
import ChangingButton from "../../components/ChangingButton";
import Layout from "../../components/Layout";
// import PriorityButton from "../../components/ChangingButton";
import ButtonGroups from "../../components/ButtonGroups";
import TasksTable from "../../components/Tasks/TasksTable";
import Workshop from "../../components/Workshop/Workshop";
import EmployeesLayout from "../../layout/employees";
import {
  createComment,
  createTask,
  readEmployee,
  readEmployeeTask,
  readNotification,
  readProject,
  readTaskEmployee,
} from "../../lib";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import Dropdown from "../../components/Projects/dropdown";
// import { convertToLocalTime } from "date-fns-timezone";
// import { format } from "date-fns";

const high = require("../../public/static/high.png");
const low = require("../../public/static/low.png");
const normal = require("../../public/static/normal.png");
const inprogress = require("../../public/static/normal.png");

// const priority = [high, low, normal];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Tasks = () => {
  const [selected, setSelected] = useState([]);

  const changeImage = (value) => {
    setSelected(priority[value] + 1);
    if (priority[value] == "high") {
      setSelected(priority[0]);
    }
  };

  const buttons = ["Description", "Files"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [value, setValue] = React.useState(dayjs(new Date()));

  const handleEmployee = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [employeeChecked, setEmployeeChecked] = React.useState([]);
  const [assignedEmployees, setAssignedEmployees] = React.useState([{}]);

  const handleToggle = (value) => () => {
    const currentIndex = employeeChecked
      .map((i) => JSON.stringify(i))
      .indexOf(JSON.stringify(value));
    console.log({ currentIndex });

    const newChecked = [...employeeChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setEmployeeChecked(newChecked);
    console.log({ newChecked });
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState([]);

  const [projects, setProject] = React.useState([]);
  const [projectIds, setProjectIds] = React.useState([]);
  const [projectSelected, setProjectSelected] = React.useState([]);

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;

    setProjectIds(value);

    setProjectSelected();
  };

  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const currentDate = value == null ? "" : value.toString();
  console.log(currentDate);

  const [addEmployee, setAddEmployee] = useState(false);

  // const [question, setQuestions] = useState({});

  const addEmployeeToTask = () => setAddEmployee(true);

  const [response, setResponse] = useState([]);
  const [notificationResponse, setNotificationResponse] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  // const [employeeResponse, setEmployeeResponse] = useState([]);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [jwt, setJwt] = useState(null);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: "12px",
      },
    },
  };

  useEffect(() => {
    const jwt = getTokenFromLocalCookie();

    setJwt(jwt);

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setNotificationResponse(r.data?.data);
    });

    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const employee = await readTaskEmployee(jwt, user);

      setCurrentEmployee(employee);
      const result = await readEmployeeTask(jwt, user);
      const employeeList = await readEmployee(jwt, user);
      const projectList = await readProject(jwt, user);
      setResponse(result.data);
      setEmployees(employeeList.data);
      setProject(projectList.data.data);
    };
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);
    console.log("relation is:", response);
  }, [user]);

  const [taskFiles, setTaskFiles] = useState([]);

  const sendTask = async () => {
    const formData = new FormData();
    for (const files of taskFiles) {
      formData.append("files.taskFiles", files);
    }

    const employee = await readTaskEmployee(jwt, user);
    console.log("emp is", employee);

    formData.append(
      "data",
      JSON.stringify({
        title,
        department: userDepartment,
        projects: projectIds,
        description,
        // comment,
        priority,
        status,
        date: currentDate,
        jwt: jwt,
        employee: employee.data?.data?.[0]?.id,
        employee_checkeds: employeeChecked?.map((emp) => emp?.id),
      })
    );

    console.log({ employeeChecked: employeeChecked?.map((emp) => emp?.id) });
    const task = await createTask(formData, jwt);

    const newComment = {
      data: {
        text: comment,
        employee: employee.data?.data?.[0]?.id,
        projects: projectIds,
        task: task?.data?.data?.id,
      },
    };

    createComment(newComment, jwt);
    // {
    //   userDepartment === "workshop" ? createWorkshopTask(newTask, jwt) : "";
    // }
    console.log("The task is:", formData);
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontSize="14px" fontWeight="500">
                  Assignee
                </Typography>
                <AvatarGroup max={20}>
                  <Avatar
                    sx={{ width: "24px", height: "24px" }}
                    alt="Employee Image"
                    src={
                      currentEmployee?.data?.data[0]?.attributes?.employeeImage
                        ?.data?.attributes?.url
                    }
                  />
                  {employeeChecked.map((employee) => (
                    <Avatar
                      sx={{ width: "24px", height: "24px" }}
                      alt="Employee Image"
                      src={
                        employee?.attributes?.employeeImage?.data?.attributes
                          ?.url
                      }
                    />
                  ))}
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
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
                                  width: "13px",
                                  height: "13px",
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
                                    <List
                                      sx={{
                                        width: "100%",
                                        maxWidth: 360,
                                        bgcolor: "background.paper",
                                      }}
                                    >
                                      {employees?.data?.map((employee) => {
                                        const labelId = `${employee?.id}`;
                                        // console.log({ labelId });
                                        return (
                                          <ListItem
                                            // key={employee}
                                            disablePadding
                                          >
                                            <ListItemButton
                                              role={undefined}
                                              onClick={handleToggle(employee)}
                                              dense
                                            >
                                              <ListItemIcon>
                                                <Checkbox
                                                  edge="start"
                                                  checked={
                                                    employeeChecked.indexOf(
                                                      employee
                                                    ) !== -1
                                                  }
                                                  tabIndex={-1}
                                                  disableRipple
                                                  inputProps={{
                                                    "aria-labelledby": labelId,
                                                  }}
                                                />
                                                <Avatar
                                                  sx={{
                                                    width: "24px",
                                                    height: "24px",
                                                  }}
                                                  src={`${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                                                />
                                              </ListItemIcon>
                                              <ListItemText
                                                id={labelId}
                                                primary={
                                                  employee?.attributes
                                                    ?.firstName
                                                }
                                              />
                                            </ListItemButton>
                                          </ListItem>
                                        );
                                      })}
                                    </List>
                                    {/* {employees?.data?.map((employee) => (
                                      <>
                                        <Stack>
                                          <Box height="6px" />

                                          <Box
                                            display="flex"
                                            alignItems="center"
                                            // justifyContent="center"
                                          >
                                            <Box width="6px" />
                                          </Box>
                                        </Stack>
                                      </>
                                    ))} */}
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
              </Box>

              <Box width="18px" />

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography fontSize="14px" fontWeight="500">
                  Priority:
                </Typography>
                <Box width="8px" />
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
              <Box width="11px" />
              <Box display="flex" alignItems="center">
                <Typography fontSize="14px" fontWeight="500">
                  Status:{" "}
                </Typography>
                <Box width="8px" />
                <ChangingButton
                  color={
                    status === "INPROGRESS"
                      ? "#CFCFD6"
                      : status === "TO DO"
                      ? "#FFBA2E"
                      : status === "INREVIEW"
                      ? "#24B07D"
                      : status === "DONE"
                      ? "#24B07D"
                      : "gray"
                  }
                  values={["INPROGRESS", "TO DO", "INREVIEW", "DONE"]}
                  selectedValue={status}
                  onChange={setStatus}
                />
              </Box>

              <Box display="flex" alignItems="center">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    sx={{ margin: "-12px 0px" }}
                  >
                    Assign Projects
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={projectIds}
                    onChange={handleSelect}
                    input={
                      <OutlinedInput
                        sx={{ width: "185px", height: "24px" }}
                        label="Assign Projects"
                      />
                    }
                    renderValue={(selectedIds) =>
                      projects
                        .filter((p) => selectedIds.includes(p.id))
                        .map((p) => p.attributes.projectTitle)
                        .join(", ")
                    }
                    MenuProps={MenuProps}
                  >
                    {projects.map((projectTitle) => (
                      <MenuItem key={projectTitle?.id} value={projectTitle?.id}>
                        <Checkbox
                          checked={projectIds.indexOf(projectTitle?.id) > -1}
                        />
                        <ListItemText
                          primary={projectTitle?.attributes?.projectTitle}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

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
            {selectedIndex === 0 ? (
              <>
                <Box height="15px" width="100%"></Box>
                <Box>
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    bgcolor="yellow"
                    sx={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </>
            ) : selectedIndex === 1 ? (
              <>
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
                      onChange={(e) => setTaskFiles(e.target.files)}
                    />
                    <Typography
                      color="#6F7082"
                      fontWeight="600px"
                      fontSize="12px"
                    >
                      Attach Files
                    </Typography>

                    <NoteAddOutlinedIcon
                      sx={{ width: "16px", height: "16px", color: "#6F7082" }}
                    />
                  </label>
                </Button>
              </>
            ) : (
              ""("")
            )}
          </Stack>

          <Box height="6px"></Box>
          <Typography>Comments</Typography>
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

export default Tasks;
