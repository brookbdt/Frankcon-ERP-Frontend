import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers";
import { createTask, readTask } from "../api";
import TasksLayout from "../../layout/tasks";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AttachFile, WatchLater } from "@mui/icons-material";
import FlagIcon from "@mui/icons-material/Flag";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Draggable } from "../../components/Draggable";
import { Droppable } from "../../components/Droppable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// import { convertToLocalTime } from "date-fns-timezone";
// import { format } from "date-fns";

const high = require("../../public/static/high.png");
const low = require("../../public/static/low.png");
const normal = require("../../public/static/normal.png");
const inprogress = require("../../public/static/normal.png");

const priority = [high, low, normal];

const StatusView = () => {
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

  const [parent, setParent] = useState(null);
  const sendTask = () => {
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
        description,
        comment,
        date: currentDate,
        // },
      },
    };
    createTask(newTask);
    console.log(newTask);
  };

  const [response, setResponse] = useState([]);

  const [task, setTask] = useState({
    title: "",
    date: "",
    assignee: "",
    priority: "high",
    status: "in progress",
    description: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTask();
      setResponse(result.data);
    };
    fetchData();
  }, []);

  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const currentDate = value.toString();
  console.log(currentDate);

  // const [question, setQuestions] = useState({});

  const changePriority = {
    if(high) {},
  };

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }

  console.log("response", response);
  const addTask = (
    <Paper sx={{ m: 1 }} elevation={4}>
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
                onChange={(e) => setTask({ ...task, title: e.target.value })}
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
                    setTask({ ...task, date: newValue });
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
          <Stack direction="row">
            <Typography>Assignee</Typography>
            <Stack direction="row">
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
                    <Button>
                      <AddIcon
                        sx={{
                          width: "32px",
                          height: "32px",
                          padding: "6.45px",
                          color: "white",
                        }}
                      />
                    </Button>
                  </Box>
                </Box>
              </AvatarGroup>
              <Box width="71.73px"></Box>
              <Stack direction="row">
                <Typography>Priority:</Typography>
                <Box width="16px"></Box>
                <IconButton
                  onClick={() =>
                    setSelected(
                      priority.normal && priority.low && priority.high
                    )
                  }
                >
                  <Image
                    alt="selected"
                    src={selected}
                    width={"52px"}
                    height={"24px"}
                  />
                </IconButton>
                <Box width="24px"></Box>
                <Typography>Status: </Typography>
                <Box width="24px"></Box>
                <Image
                  src="/static/inprogress.png"
                  alt="in progress"
                  width="102px"
                  height="24px"
                />
              </Stack>
              <Box height="25px"></Box>
            </Stack>
          </Stack>
          <Box height="25px"></Box>
          <Stack>
            <ButtonGroup>
              <Box sx={{ borderBottom: "2px", borderColor: "black" }}>
                <Button variant="text">
                  <Typography>Description</Typography>
                </Button>
              </Box>
              <Box sx={{ borderBottom: "2px", borderColor: "black" }}>
                <Button variant="text">
                  <Typography>Files</Typography>
                </Button>
              </Box>
              <Box sx={{ borderBottom: "2px", borderColor: "black" }}>
                <Button variant="text">
                  <Typography>Comments</Typography>
                </Button>
              </Box>
            </ButtonGroup>
          </Stack>
          <Box height="15px" width="100%"></Box>
          <Box>
            <TextField
              value={description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
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
              onChange={(e) => setTask({ ...task, comment: e.target.value })}
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
    <>
      <Stack direction="row">
        <SideBar />
        <Stack
          // paddingRight="104px"
          direction="column"
          width="80%"
          height="100vh"
        >
          <>
            <Navbar />
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
              <TasksLayout />
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

              {/* grid view */}
              <Box height="8px" />
              <Box width="1326px" overflowX="auto">
                <Stack direction="row">
                  <Slide
                    direction="right"
                    in={checked}
                    mountOnEnter
                    unmountOnExit
                  >
                    {addTask}
                  </Slide>

                  {/* <Stack gap="12px">

                          <DndContext onDragEnd={handleDragEnd}>
                            {!parent ? draggable : null}
                            <Droppable id="droppable">
                              {parent === "droppable" ? draggable : "Drop here"}
                            </Droppable>
                          </DndContext>

                        </Stack> */}

                  <DndContext onDragEnd={handleDragEnd}>
                    <Droppable id="droppable">
                      <Grid container spacing="18px">
                        <Grid item xs={6} md={3}>
                          <Paper
                            sx={{
                              paddingX: "16px",
                              borderRadius: "5px",
                            }}
                            width="318px"
                            height="816px"
                          >
                            <Stack
                              paddingY="13px"
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Typography
                                  sx={{ fontSize: "15px", fontWeight: "700" }}
                                >
                                  To do
                                </Typography>
                                <Box width="21px" />
                                <Box
                                  bgcolor="#F7F7F7"
                                  width="30px"
                                  height="30px"
                                  borderRadius="50%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Typography>3</Typography>
                                </Box>
                              </Stack>
                              <Stack direction="row">
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <Typography fontWeight="700">+</Typography>
                                  {/* </Button> */}
                                </IconButton>
                                <Box width="6px" />
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <MoreHorizIcon />
                                  {/* </Button> */}
                                </IconButton>
                              </Stack>
                            </Stack>
                            <Box height="2.5px" />
                            <Stack gap="12px">
                              {/* {response} */}
                              <DndContext onDragEnd={handleDragEnd}>
                                {!parent ? (
                                  <>
                                    <SortableContext
                                      items={[response]}
                                      strategy={verticalListSortingStrategy}
                                    >
                                      {response?.data
                                        ?.filter(
                                          (response) =>
                                            response?.attributes?.status ===
                                            "Todo"
                                        )
                                        .map((response, index) => (
                                          <Draggable
                                            key={response?.attributes?.title}
                                            id={response?.attributes?.title}
                                          >
                                            <Card>
                                              <CardContent>
                                                <Stack gap="16px">
                                                  <Typography
                                                    sx={{
                                                      fontWeight: "500",
                                                      fontSize: "15px",
                                                      color: "#3F4158",
                                                    }}
                                                  >
                                                    {response.attributes?.title}
                                                  </Typography>
                                                  <Box
                                                    sx={{
                                                      bgcolor: "#4339F2",
                                                      width: "109px",
                                                      height: "26px",
                                                      borderRadius: "5px",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Typography
                                                      sx={{
                                                        fontSize: "14px",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {/* {response.attributes?.} */}
                                                      User name
                                                    </Typography>
                                                  </Box>
                                                  <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                  >
                                                    <Stack
                                                      direction="row"
                                                      gap="12px"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                      >
                                                        <Box>
                                                          <IconButton>
                                                            <AttachFile />
                                                          </IconButton>
                                                        </Box>
                                                        {/* <Box width="8px"/> */}
                                                        <Typography
                                                          sx={{
                                                            fontWeight: "700",
                                                            fontSize: "15px",
                                                            color: "#6F7082",
                                                          }}
                                                        >
                                                          3
                                                        </Typography>
                                                      </Stack>
                                                      <FlagIcon
                                                        sx={{
                                                          color: "#F44336",
                                                        }}
                                                      />
                                                      <Stack
                                                        direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        color="#6F7082"
                                                      >
                                                        <WatchLater />
                                                        <Box width="4px" />
                                                        <Typography>
                                                          {
                                                            response.attributes
                                                              ?.date
                                                          }
                                                        </Typography>
                                                      </Stack>
                                                    </Stack>
                                                    <Box
                                                      bgcolor="white"
                                                      display="flex"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Avatar
                                                        sx={{
                                                          width: "30px",
                                                          height: "30px",
                                                        }}
                                                      />
                                                    </Box>
                                                  </Stack>
                                                </Stack>
                                              </CardContent>
                                            </Card>
                                          </Draggable>
                                        ))}
                                    </SortableContext>
                                  </>
                                ) : null}
                              </DndContext>
                            </Stack>
                          </Paper>
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Paper
                            sx={{
                              paddingY: "13px",
                              paddingX: "16px",
                              borderRadius: "5px",
                            }}
                            width="318px"
                            height="816px"
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Stack direction="row">
                                <Typography
                                  sx={{ fontSize: "15px", fontWeight: "700" }}
                                >
                                  In Progress
                                </Typography>
                                <Box width="21px" />
                                <Box
                                  bgcolor="#F7F7F7"
                                  width="30px"
                                  height="30px"
                                  borderRadius="50%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Typography>3</Typography>
                                </Box>
                              </Stack>
                              <Stack direction="row">
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <Typography fontWeight="700">+</Typography>
                                  {/* </Button> */}
                                </IconButton>
                                <Box width="6px" />
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <MoreHorizIcon />
                                  {/* </Button> */}
                                </IconButton>
                              </Stack>
                            </Stack>
                            <Box height="2.5px" />
                            <Stack gap="12px">
                              {/* {response} */}
                              <DndContext onDragEnd={handleDragEnd}>
                                {!parent ? (
                                  <>
                                    <SortableContext
                                      items={[response]}
                                      strategy={verticalListSortingStrategy}
                                    >
                                      {response?.data
                                        ?.filter(
                                          (response) =>
                                            response?.attributes?.status ===
                                            "Inprogress"
                                        )
                                        .map((response, index) => (
                                          <Draggable
                                            key={response?.attributes?.title}
                                            id={response?.attributes?.title}
                                          >
                                            <Card>
                                              <CardContent>
                                                <Stack gap="16px">
                                                  <Typography
                                                    sx={{
                                                      fontWeight: "500",
                                                      fontSize: "15px",
                                                      color: "#3F4158",
                                                    }}
                                                  >
                                                    {response.attributes?.title}
                                                  </Typography>
                                                  <Box
                                                    sx={{
                                                      bgcolor: "#4339F2",
                                                      width: "109px",
                                                      height: "26px",
                                                      borderRadius: "5px",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Typography
                                                      sx={{
                                                        fontSize: "14px",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {/* {response.attributes?.} */}
                                                      User name
                                                    </Typography>
                                                  </Box>
                                                  <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                  >
                                                    <Stack
                                                      direction="row"
                                                      gap="12px"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                      >
                                                        <Box>
                                                          <IconButton>
                                                            <AttachFile />
                                                          </IconButton>
                                                        </Box>
                                                        {/* <Box width="8px"/> */}
                                                        <Typography
                                                          sx={{
                                                            fontWeight: "700",
                                                            fontSize: "15px",
                                                            color: "#6F7082",
                                                          }}
                                                        >
                                                          3
                                                        </Typography>
                                                      </Stack>
                                                      <FlagIcon
                                                        sx={{
                                                          color: "#F44336",
                                                        }}
                                                      />
                                                      <Stack
                                                        direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        color="#6F7082"
                                                      >
                                                        <WatchLater />
                                                        <Box width="4px" />
                                                        <Typography>
                                                          {
                                                            response.attributes
                                                              ?.date
                                                          }
                                                        </Typography>
                                                      </Stack>
                                                    </Stack>
                                                    <Box
                                                      bgcolor="white"
                                                      display="flex"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Avatar
                                                        sx={{
                                                          width: "30px",
                                                          height: "30px",
                                                        }}
                                                      />
                                                    </Box>
                                                  </Stack>
                                                </Stack>
                                              </CardContent>
                                            </Card>
                                          </Draggable>
                                        ))}
                                    </SortableContext>
                                  </>
                                ) : null}
                              </DndContext>
                            </Stack>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper
                            sx={{ paddingY: "13px", paddingX: "16px" }}
                            width="318px"
                            height="816px"
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Stack direction="row">
                                <Typography
                                  sx={{ fontSize: "15px", fontWeight: "700" }}
                                >
                                  In Review
                                </Typography>
                                <Box width="21px" />
                                <Box
                                  bgcolor="#F7F7F7"
                                  width="30px"
                                  height="30px"
                                  borderRadius="50%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Typography>3</Typography>
                                </Box>
                              </Stack>
                              <Stack direction="row">
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <Typography fontWeight="700">+</Typography>
                                  {/* </Button> */}
                                </IconButton>
                                <Box width="6px" />
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <MoreHorizIcon />
                                  {/* </Button> */}
                                </IconButton>
                              </Stack>
                            </Stack>
                            <Box height="2.5px" />
                            <Stack gap="12px">
                              {/* {response} */}
                              <DndContext onDragEnd={handleDragEnd}>
                                {!parent ? (
                                  <>
                                    <SortableContext
                                      items={[response]}
                                      strategy={verticalListSortingStrategy}
                                    >
                                      {response?.data
                                        ?.filter(
                                          (response) =>
                                            response?.attributes?.status ===
                                            "InReview"
                                        )
                                        .map((response, index) => (
                                          <Draggable
                                            key={response?.attributes?.title}
                                            id={response?.attributes?.title}
                                          >
                                            <Card>
                                              <CardContent>
                                                <Stack gap="16px">
                                                  <Typography
                                                    sx={{
                                                      fontWeight: "500",
                                                      fontSize: "15px",
                                                      color: "#3F4158",
                                                    }}
                                                  >
                                                    {response.attributes?.title}
                                                  </Typography>
                                                  <Box
                                                    sx={{
                                                      bgcolor: "#4339F2",
                                                      width: "109px",
                                                      height: "26px",
                                                      borderRadius: "5px",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Typography
                                                      sx={{
                                                        fontSize: "14px",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {/* {response.attributes?.} */}
                                                      User name
                                                    </Typography>
                                                  </Box>
                                                  <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                  >
                                                    <Stack
                                                      direction="row"
                                                      gap="12px"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                      >
                                                        <Box>
                                                          <IconButton>
                                                            <AttachFile />
                                                          </IconButton>
                                                        </Box>
                                                        {/* <Box width="8px"/> */}
                                                        <Typography
                                                          sx={{
                                                            fontWeight: "700",
                                                            fontSize: "15px",
                                                            color: "#6F7082",
                                                          }}
                                                        >
                                                          3
                                                        </Typography>
                                                      </Stack>
                                                      <FlagIcon
                                                        sx={{
                                                          color: "#F44336",
                                                        }}
                                                      />
                                                      <Stack
                                                        direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        color="#6F7082"
                                                      >
                                                        <WatchLater />
                                                        <Box width="4px" />
                                                        <Typography>
                                                          {
                                                            response.attributes
                                                              ?.date
                                                          }
                                                        </Typography>
                                                      </Stack>
                                                    </Stack>
                                                    <Box
                                                      bgcolor="white"
                                                      display="flex"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Avatar
                                                        sx={{
                                                          width: "30px",
                                                          height: "30px",
                                                        }}
                                                      />
                                                    </Box>
                                                  </Stack>
                                                </Stack>
                                              </CardContent>
                                            </Card>
                                          </Draggable>
                                        ))}
                                    </SortableContext>
                                  </>
                                ) : null}
                              </DndContext>
                            </Stack>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper
                            sx={{ paddingY: "13px", paddingX: "16px" }}
                            width="318px"
                            height="816px"
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Stack direction="row">
                                <Typography>Done</Typography>
                                <Box width="21px" />
                                <Box
                                  bgcolor="#F7F7F7"
                                  width="30px"
                                  height="30px"
                                  borderRadius="50%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Typography>3</Typography>
                                </Box>
                              </Stack>
                              <Stack direction="row">
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <Typography fontWeight="700">+</Typography>
                                  {/* </Button> */}
                                </IconButton>
                                <Box width="6px" />
                                <IconButton
                                  sx={{
                                    bgcolor: "#F7F7F7",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* <Button> */}

                                  <MoreHorizIcon />
                                  {/* </Button> */}
                                </IconButton>
                              </Stack>
                            </Stack>
                            <Box height="2.5px" />
                            <Stack gap="12px">
                              {/* {response} */}
                              <DndContext onDragEnd={handleDragEnd}>
                                {!parent ? (
                                  <>
                                    <SortableContext
                                      items={[response]}
                                      strategy={verticalListSortingStrategy}
                                    >
                                      {response?.data
                                        ?.filter(
                                          (response) =>
                                            response?.attributes?.status ===
                                            "Done"
                                        )
                                        .map((response, index) => (
                                          <Draggable
                                            key={response?.attributes?.title}
                                            id={response?.attributes?.title}
                                          >
                                            <Card>
                                              <CardContent>
                                                <Stack gap="16px">
                                                  <Typography
                                                    sx={{
                                                      fontWeight: "500",
                                                      fontSize: "15px",
                                                      color: "#3F4158",
                                                    }}
                                                  >
                                                    {response.attributes?.title}
                                                  </Typography>
                                                  <Box
                                                    sx={{
                                                      bgcolor: "#4339F2",
                                                      width: "109px",
                                                      height: "26px",
                                                      borderRadius: "5px",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Typography
                                                      sx={{
                                                        fontSize: "14px",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {/* {response.attributes?.} */}
                                                      User name
                                                    </Typography>
                                                  </Box>
                                                  <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                  >
                                                    <Stack
                                                      direction="row"
                                                      gap="12px"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                      >
                                                        <Box>
                                                          <IconButton>
                                                            <AttachFile />
                                                          </IconButton>
                                                        </Box>
                                                        {/* <Box width="8px"/> */}
                                                        <Typography
                                                          sx={{
                                                            fontWeight: "700",
                                                            fontSize: "15px",
                                                            color: "#6F7082",
                                                          }}
                                                        >
                                                          3
                                                        </Typography>
                                                      </Stack>
                                                      <FlagIcon
                                                        sx={{
                                                          color: "#F44336",
                                                        }}
                                                      />
                                                      <Stack
                                                        direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        color="#6F7082"
                                                      >
                                                        <WatchLater />
                                                        <Box width="4px" />
                                                        <Typography>
                                                          {
                                                            response.attributes
                                                              ?.date
                                                          }
                                                        </Typography>
                                                      </Stack>
                                                    </Stack>
                                                    <Box
                                                      bgcolor="white"
                                                      display="flex"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                    >
                                                      <Avatar
                                                        sx={{
                                                          width: "30px",
                                                          height: "30px",
                                                        }}
                                                      />
                                                    </Box>
                                                  </Stack>
                                                </Stack>
                                              </CardContent>
                                            </Card>
                                          </Draggable>
                                        ))}
                                    </SortableContext>
                                  </>
                                ) : null}
                              </DndContext>
                            </Stack>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Droppable>
                  </DndContext>
                </Stack>
              </Box>
            </Stack>
          </>
        </Stack>
      </Stack>
    </>
  );
};

export default StatusView;
