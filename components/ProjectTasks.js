
import {
  Avatar, ThemeProvider, createTheme,
  MenuItem,
  ListItemText,

  AvatarGroup, Box, Button, Checkbox, Divider, Fade, FilledInput, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, Modal, OutlinedInput, Paper, Popper, Select, Slide, Stack, TextField, Typography, Backdrop
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import {
  readEmployeeUnresolvedTask,
  readProjectBacklogTask,
  readProjectInprogressTask,
  readProjectResolvedTask,
  readProjectTodoTask,
  readTaskEmployee,
  readEmployeeTask,
  editTaskStatus,
  createComment,
  createNotification,
  readEmployee,
  readProject
} from "../lib";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getTokenFromLocalCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import styled from "@emotion/styled";
import Image from "next/image";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import MessageIcon from "@mui/icons-material/Message";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

import dayjs from "dayjs";
import ChangingButton from "./ChangingButton";
import ButtonGroups from "./ButtonGroups";

const ProjectTasks = ({ response, id }) => {
  const [resolvedTaskResponses, setResolvedTaskResponses] = useState([]);
  const [inprogressTaskResponses, setInprogressTaskResponses] = useState([]);
  const [allTaskResponse, setAllTaskResponse] = useState([]);
  const [backlogTaskResponses, setBackLogTaskResponses] = useState([]);
  const [todoTaskResponses, setTodoTaskResponses] = useState([]);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [priority, setPriority] = useState("HIGH");
  const [status, setStatus] = useState("INPROGRESS");

  const [projectSelected, setProjectSelected] = React.useState([]);
  const theme = createTheme({
    components: {
      MuiTypography: {
        variants: [
          {
            props: {
              variant: "h6",
            },
            style: {
              fontSize: 14,
              fontWeight: 400,
              color: "#6F7082",
            },
          },
          {
            props: {
              variant: "h6B",
            },
            style: {
              fontSize: 14,
              fontWeight: 500,
              color: "#0F112E",
            },
          },
        ],
      },
      palette: {
        primary: {
          main: "#2557E3",
          darker: "#053e85",
        },
        neutral: {
          main: "#4339F2",
          contrastText: "#fff",
        },
      },
    },
  });
  const StyledTypoGrey = styled(Typography)({
    color: "#6F7082",
    fontSize: "8px",
    fontWeight: "800",
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 4,
    borderColor: "#4339F2",
    m: 1,
    borderRadius: "10px",
    p: 4,
  };
  const StyledTypoBlue = styled(Typography)({
    color: "#4339F2",
    fontSize: "8px",
    fontWeight: "800",
  });
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState([]);

  const [projects, setProject] = React.useState([]);
  const [projectIds, setProjectIds] = React.useState([]);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  const [employeeChecked, setEmployeeChecked] = React.useState([]);

  const buttons = ["Description", "Files"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [taskFiles, setTaskFiles] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [jwt, setJwt] = useState(null);

  const currentDate = value == null ? "" : value.toString();


  const handleClose = () => setOpen(false);

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;

    setProjectIds(value);

    setProjectSelected();
  };

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

  useEffect(() => {
    const jwt = getTokenFromLocalCookie();
    setJwt(jwt);

    if (!id) return;

    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const employee = await readTaskEmployee(jwt, user);
      const employeeList = await readEmployee(jwt, user);
      const projectList = await readProject(jwt, user);

      setEmployees(employeeList.data);
      setProject(projectList.data.data);


      setCurrentEmployee(employee);

      const resolvedTasks = await readProjectResolvedTask(id, jwt, user);
      const inprogressTasks = await readProjectInprogressTask(id, jwt, user);
      const backlogTasks = await readProjectBacklogTask(id, jwt, user);
      const todoTasks = await readProjectTodoTask(id, jwt, user);
      const allTasks = await readEmployeeTask(jwt, user);


      setResolvedTaskResponses(resolvedTasks.data);
      setInprogressTaskResponses(inprogressTasks.data);
      setBackLogTaskResponses(backlogTasks.data);
      setTodoTaskResponses(todoTasks.data);
      setAllTaskResponse(allTasks.data);


    };
    // randomId;
    fetchData();
  }, [user, id]);

  const [taskId, setTaskId] = useState("")

  const openTaskEditor = (taskId) => {
    setOpen((prev) => !prev)
    setTaskId(taskId)
  }

  const editTask = async (taskId) => {
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
    const task = await editTaskStatus(formData, taskId, jwt);

    const newComment = {
      data: {
        text: comment,
        employee: employee.data?.data?.[0]?.id,
        projects: projectIds,
        task: task?.data?.data?.id,
      },
    };

    await createComment(newComment, jwt);

    const newNotification = {
      data: {
        date: new Date().toISOString(),
        type: "Task",
        task: task?.data?.data?.id,
        employees: [currentEmployee?.data?.data[0]?.id, ...employeeChecked?.map((emp) => emp?.id)],
        employee: [currentEmployee?.data?.data[0]?.id],

      },
    };
    // employee: employee.data?.data?.[0]?.id,

    await createNotification(newNotification, jwt);
    // {
    //   userDepartment === "workshop" ? createWorkshopTask(newTask, jwt) : "";
    // }
    console.log("The task is:", formData);
  };


  return (
    <>
      <ThemeProvider theme={theme}>


        <>
          <Box paddingX="24px">
            <Divider width="100%" sx={{ borderBottomWidth: "2px" }} />
            <Box height="20px" />
            <Typography fontWeight="500" fontSize="20px">
              Project Tasks & Activities
            </Typography>
            <Box height="20px" />
            <Divider width="100%" sx={{ borderBottomWidth: "2px" }} />
            <Box height="16px" />
            <Grid container>
              <Grid xs={3}>
                <Box display="flex">
                  <Typography fontWeight="600" fontSize="14px" color="#0F112E">
                    Resolved Tasks
                  </Typography>
                  <Box width="12px" />
                  <Box
                    width="24px"
                    height="24px"
                    borderRadius="16px"
                    bgcolor="#4339F21F"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight="800"
                      fontSize="10px"
                      color="#4339F2"
                      alignSelf="center"
                    >
                      {resolvedTaskResponses?.data?.length}
                    </Typography>
                  </Box>
                </Box>
                {resolvedTaskResponses?.data?.map((task) => (
                  <>
                    <Button onClick={() => openTaskEditor(task.id)}>

                      <Paper
                        sx={{
                          width: "264px",
                          height: "136px",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0px 1px 3px rgba(96, 108, 128, 0.05)",
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between">
                          <Box>
                            <Typography fontWeight="600" fontSize="16px" color="#0F112E">
                              {task?.attributes?.title}
                            </Typography>
                          </Box>
                          <Stack gap={1} direction="row">
                            <InsertDriveFileIcon sx={{ color: "#4339F2" }} />
                            <Typography color="#4339F2">4</Typography>
                          </Stack>
                        </Stack>
                        <Stack marginY="12px" direction="row" gap={1}>
                          <Box
                            paddingX={1}
                            paddingY="4px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="16px"
                            border="1px solid #E7E7EA"
                          >
                            <StyledTypoGrey>#UI007</StyledTypoGrey>
                          </Box>
                          <Box>
                            <Box
                              paddingX={1}
                              bgcolor="#F6F6F6"
                              paddingY="4px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              borderRadius="16px"
                            >
                              <StyledTypoBlue>Design</StyledTypoBlue>
                            </Box>
                          </Box>
                          <Box>
                            <Box
                              paddingX={1}
                              bgcolor="#E8E7FD"
                              paddingY="4px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              borderRadius="16px"
                            >
                              <StyledTypoBlue>Backlog</StyledTypoBlue>
                            </Box>
                          </Box>
                        </Stack>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          direction="row"
                        >
                          <Stack direction="row">
                            <Box
                              bgcolor="white"
                              // margin="0px -8px"
                              border="2px solid #FFFFFF"
                              borderRadius="24px"
                              width="32px"
                              height="32px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Image
                                width="32px"
                                height="32px"
                                alt="Employee Image"
                                src={
                                  task?.attributes?.employee?.data[0]?.attributes
                                    ?.employeeImage?.data?.attributes?.url
                                }
                              />
                              <Image
                                width="32px"
                                height="32px"
                                alt="Employee Image"
                                src={task?.attributes?.employee_checkeds?.data?.map(
                                  (image) =>
                                    image?.attributes?.employeeImage?.data?.attributes
                                      ?.url
                                )}
                              />
                            </Box>
                          </Stack>

                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <FilePresentIcon
                                sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                              />
                              <Box width="8px" />

                              <Typography
                                fontWeight="800"
                                fontSize="10px"
                                color="#E7E7EA"
                              >
                                {task?.attributes?.taskFiles?.data?.length}
                              </Typography>
                            </Box>
                            <Box width="8px" />

                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <MessageIcon
                                sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                              />
                              <Box width="8px" />
                              <Typography
                                fontWeight="800"
                                fontSize="10px"
                                color="#E7E7EA"
                              >
                                {task?.attributes?.comments?.data?.length}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Button>


                  </>
                ))}
              </Grid>
              <Grid xs={3}>
                <Box display="flex">
                  <Typography fontWeight="600" fontSize="14px" color="#0F112E">
                    Inprogress Tasks
                  </Typography>
                  <Box width="12px" />
                  <Box
                    width="24px"
                    height="24px"
                    borderRadius="16px"
                    bgcolor="#4339F21F"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight="800"
                      fontSize="10px"
                      color="#4339F2"
                      alignSelf="center"
                    >
                      {inprogressTaskResponses?.data?.length}
                    </Typography>
                  </Box>
                </Box>
                {inprogressTaskResponses?.data?.map((task) => (
                  <Button onClick={() => openTaskEditor(task.id)}>

                    <Paper
                      sx={{
                        width: "264px",
                        height: "136px",
                        padding: "20px",

                        borderRadius: "8px",
                        boxShadow: "0px 1px 3px rgba(96, 108, 128, 0.05)",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography fontWeight="600" fontSize="16px" color="#0F112E">
                            {task?.attributes?.title}
                          </Typography>
                        </Box>
                        <Stack gap={1} direction="row">
                          <InsertDriveFileIcon sx={{ color: "#4339F2" }} />
                          <Typography color="#4339F2">4</Typography>
                        </Stack>
                      </Stack>
                      <Stack marginY="12px" direction="row" gap={1}>
                        <Box
                          paddingX={1}
                          paddingY="4px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="16px"
                          border="1px solid #E7E7EA"
                        >
                          <StyledTypoGrey>#UI007</StyledTypoGrey>
                        </Box>
                        <Box>
                          <Box
                            paddingX={1}
                            bgcolor="#F6F6F6"
                            paddingY="4px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="16px"
                          >
                            <StyledTypoBlue>Design</StyledTypoBlue>
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            paddingX={1}
                            bgcolor="#E8E7FD"
                            paddingY="4px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="16px"
                          >
                            <StyledTypoBlue>Backlog</StyledTypoBlue>
                          </Box>
                        </Box>
                      </Stack>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        direction="row"
                      >
                        <Stack direction="row">
                          <Box
                            bgcolor="white"
                            // margin="0px -8px"
                            border="2px solid #FFFFFF"
                            borderRadius="24px"
                            width="32px"
                            height="32px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Image
                              width="32px"
                              height="32px"
                              alt="Employee Image"
                              src={
                                task?.attributes?.employee?.data[0]?.attributes
                                  ?.employeeImage?.data?.attributes?.url
                              }
                            />
                            <Image
                              width="32px"
                              height="32px"
                              alt="Employee Image"
                              src={task?.attributes?.employee_checkeds?.data?.map(
                                (image) =>
                                  image?.attributes?.employeeImage?.data?.attributes
                                    ?.url
                              )}
                            />
                          </Box>
                        </Stack>

                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <FilePresentIcon
                              sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                            />
                            <Box width="8px" />

                            <Typography
                              fontWeight="800"
                              fontSize="10px"
                              color="#E7E7EA"
                            >
                              {task?.attributes?.taskFiles?.data?.length}
                            </Typography>
                          </Box>
                          <Box width="8px" />

                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <MessageIcon
                              sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                            />
                            <Box width="8px" />
                            <Typography
                              fontWeight="800"
                              fontSize="10px"
                              color="#E7E7EA"
                            >
                              {task?.attributes?.comments?.data?.length}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Button>
                ))}
              </Grid>
              <Grid xs={3}>
                <Box display="flex">
                  <Typography fontWeight="600" fontSize="14px" color="#0F112E">
                    Backlog Tasks
                  </Typography>
                  <Box width="12px" />
                  <Box
                    width="24px"
                    height="24px"
                    borderRadius="16px"
                    bgcolor="#4339F21F"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight="800"
                      fontSize="10px"
                      color="#4339F2"
                      alignSelf="center"
                    >
                      {backlogTaskResponses?.data?.length}
                    </Typography>
                  </Box>
                </Box>
                {backlogTaskResponses?.data?.map((task) => (
                  <Button onClick={() => openTaskEditor(task.id)}>

                    <Paper
                      sx={{
                        width: "264px",
                        height: "136px",
                        padding: "20px",

                        borderRadius: "8px",
                        boxShadow: "0px 1px 3px rgba(96, 108, 128, 0.05)",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography fontWeight="600" fontSize="16px" color="#0F112E">
                            {task?.attributes?.title}
                          </Typography>
                        </Box>
                        <Stack gap={1} direction="row">
                          <InsertDriveFileIcon sx={{ color: "#4339F2" }} />
                          <Typography color="#4339F2">4</Typography>
                        </Stack>
                      </Stack>
                      <Stack marginY="12px" direction="row" gap={1}>
                        <Box
                          paddingX={1}
                          paddingY="4px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="16px"
                          border="1px solid #E7E7EA"
                        >
                          <StyledTypoGrey>#UI007</StyledTypoGrey>
                        </Box>
                        <Box>
                          <Box
                            paddingX={1}
                            bgcolor="#F6F6F6"
                            paddingY="4px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="16px"
                          >
                            <StyledTypoBlue>Design</StyledTypoBlue>
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            paddingX={1}
                            bgcolor="#E8E7FD"
                            paddingY="4px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="16px"
                          >
                            <StyledTypoBlue>Backlog</StyledTypoBlue>
                          </Box>
                        </Box>
                      </Stack>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        direction="row"
                      >
                        <Stack direction="row">
                          <Box
                            bgcolor="white"
                            // margin="0px -8px"
                            border="2px solid #FFFFFF"
                            borderRadius="24px"
                            width="32px"
                            height="32px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Image
                              width="32px"
                              height="32px"
                              alt="Employee Image"
                              src={
                                task?.attributes?.employee?.data[0]?.attributes
                                  ?.employeeImage?.data?.attributes?.url
                              }
                            />
                            <Image
                              width="32px"
                              height="32px"
                              alt="Employee Image"
                              src={task?.attributes?.employee_checkeds?.data?.map(
                                (image) =>
                                  image?.attributes?.employeeImage?.data?.attributes
                                    ?.url
                              )}
                            />
                          </Box>
                        </Stack>

                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <FilePresentIcon
                              sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                            />
                            <Box width="8px" />

                            <Typography
                              fontWeight="800"
                              fontSize="10px"
                              color="#E7E7EA"
                            >
                              {task?.attributes?.taskFiles?.data?.length}
                            </Typography>
                          </Box>
                          <Box width="8px" />

                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <MessageIcon
                              sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                            />
                            <Box width="8px" />
                            <Typography
                              fontWeight="800"
                              fontSize="10px"
                              color="#E7E7EA"
                            >
                              {task?.attributes?.comments?.data?.length}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Button>
                ))}
              </Grid>
              <Grid xs={3}>
                <Box display="flex">
                  <Typography fontWeight="600" fontSize="14px" color="#0F112E">
                    Todo Tasks
                  </Typography>
                  <Box width="12px" />
                  <Box
                    width="24px"
                    height="24px"
                    borderRadius="16px"
                    bgcolor="#4339F21F"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight="800"
                      fontSize="10px"
                      color="#4339F2"
                      alignSelf="center"
                    >
                      {todoTaskResponses?.data?.length}
                    </Typography>
                  </Box>
                </Box>
                {todoTaskResponses?.data?.map((task) => (
                  <>


                    <Button onClick={() => openTaskEditor(task.id)}>

                      <Paper
                        sx={{
                          width: "264px",
                          height: "136px",
                          padding: "20px",

                          borderRadius: "8px",
                          boxShadow: "0px 1px 3px rgba(96, 108, 128, 0.05)",
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between">
                          <Box>
                            <Typography fontWeight="600" fontSize="16px" color="#0F112E">
                              {task?.attributes?.title}
                            </Typography>
                          </Box>
                          <Stack gap={1} direction="row">
                            <InsertDriveFileIcon sx={{ color: "#4339F2" }} />
                            <Typography color="#4339F2">4</Typography>
                          </Stack>
                        </Stack>
                        <Stack marginY="12px" direction="row" gap={1}>
                          <Box
                            paddingX={1}
                            paddingY="4px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="16px"
                            border="1px solid #E7E7EA"
                          >
                            <StyledTypoGrey>#UI007</StyledTypoGrey>
                          </Box>
                          <Box>
                            <Box
                              paddingX={1}
                              bgcolor="#F6F6F6"
                              paddingY="4px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              borderRadius="16px"
                            >
                              <StyledTypoBlue>Design</StyledTypoBlue>
                            </Box>
                          </Box>
                          <Box>
                            <Box
                              paddingX={1}
                              bgcolor="#E8E7FD"
                              paddingY="4px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              borderRadius="16px"
                            >
                              <StyledTypoBlue>Backlog</StyledTypoBlue>
                            </Box>
                          </Box>
                        </Stack>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          direction="row"
                        >
                          <Stack direction="row">
                            <Box
                              bgcolor="white"
                              // margin="0px -8px"
                              border="2px solid #FFFFFF"
                              borderRadius="24px"
                              width="32px"
                              height="32px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Image
                                width="32px"
                                height="32px"
                                alt="Employee Image"
                                src={
                                  task?.attributes?.employee?.data[0]?.attributes
                                    ?.employeeImage?.data?.attributes?.url
                                }
                              />
                              <Image
                                width="32px"
                                height="32px"
                                alt="Employee Image"
                                src={task?.attributes?.employee_checkeds?.data?.map(
                                  (image) =>
                                    image?.attributes?.employeeImage?.data?.attributes
                                      ?.url
                                )}
                              />
                            </Box>
                          </Stack>

                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <FilePresentIcon
                                sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                              />
                              <Box width="8px" />

                              <Typography
                                fontWeight="800"
                                fontSize="10px"
                                color="#E7E7EA"
                              >
                                {task?.attributes?.taskFiles?.data?.length}
                              </Typography>
                            </Box>
                            <Box width="8px" />

                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <MessageIcon
                                sx={{ color: "#E7E7E9", width: "20px", height: "20px" }}
                              />
                              <Box width="8px" />
                              <Typography
                                fontWeight="800"
                                fontSize="10px"
                                color="#E7E7EA"
                              >
                                {task?.attributes?.comments?.data?.length}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Button>
                  </>
                ))}
              </Grid>
            </Grid>


          </Box>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>

              <Box sx={style} >

                {/* <Paper
                    sx={{ m: 1, width: "63%", borderColor: "#4339F2", borderRadius: "10px" }}
                    elevation={4}
                  > */}
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
                      Edit Task
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
                              // src={
                              //   currentEmployee?.data?.data[0]?.attributes?.employeeImage
                              //     ?.data?.attributes?.url
                              // }
                              src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${currentEmployee?.data?.data[0]?.attributes?.employeeImage
                                ?.data?.attributes?.url}`}
                            />
                            {employeeChecked.map((employee) => (
                              <Avatar
                                sx={{ width: "24px", height: "24px" }}
                                alt="Employee Image"
                                // src={
                                //   employee?.attributes?.employeeImage?.data?.attributes
                                //     ?.url
                                // }
                                src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url
                                  }`}
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
                                              zIndex="1px"

                                              sx={{
                                                height: "1150px",
                                                overflow: "auto",
                                                zIndex: "11111px",
                                              }}
                                            >
                                              <List
                                                sx={{
                                                  width: "100%",
                                                  maxWidth: 360,
                                                  bgcolor: "background.paper",
                                                }}
                                              >
                                                {employees?.data?.filter((employee) => (currentEmployee?.data?.data[0]?.id !== employee?.id)).map((employee) => {
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
                                                            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}

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
                          onClick={() => editTask(taskId)}
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
                              Edit Task
                            </Typography>
                          </Stack>
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
                {/* </Paper> */}
              </Box>
            </Fade>
          </Modal>
        </>





      </ThemeProvider>

    </>
  );
};

export default ProjectTasks;
