import { AttachFile, InsertPhotoOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TasksLayout from "../../layout/tasks";
import {
  createTask,
  editTaskStatus,
  readEmployeeTask,
  readNotification,
} from "../../lib";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DndContext } from "@dnd-kit/core";
import ButtonGroups from "../../components/ButtonGroups";
import Draggable from "../../components/Draggable";
import Droppable from "../../components/Droppable";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const StatusView = () => {
  const [selected, setSelected] = useState([]);
  // const priority = [high, low, normal];

  const [open, setOpen] = React.useState(false);
  const [taskFile, setTaskFile] = React.useState([]);
  const [previewTask, setPreviewTask] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(dayjs(new Date()));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleImage = (e) => {
    setTaskFile(e.target.files);
    setPreviewTask(URL.createObjectURL(e.target.files[0]));
  };

  const [checked, setChecked] = React.useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

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
    createTask(newTask, jwt);
    console.log(newTask);
  };

  const [response, setResponse] = useState([]);
  const buttons = ["Description", "Files"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [task, setTask] = useState({
    title: "",
    date: "",
    assignee: "",
    priority: "high",
    status: "in progress",
    description: "",
  });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await readTask(jwt);
  //     setResponse(result.data);
  //   };
  //   fetchData();
  // }, []);

  // const handleSlide = () => {
  //   setChecked((prev) => !prev);
  // };
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [jwt, setJwt] = useState(null);

  const [notificationResponse, setNotificationResponse] = useState([]);
  const fetchData = async () => {
    if (!user) {
      return;
    }
    const result = await readEmployeeTask(jwt, user);
    setResponse(result.data);
  };

  useEffect(() => {
    console.log(1, "params console is");

    const jwt = getTokenFromLocalCookie();

    console.log(2, "end", { jwt });

    setJwt(jwt);

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setNotificationResponse(r.data?.data);
    });

    console.log("index response is", { notificationResponse });

    fetchData();
  }, [user]);

  const currentDate = value.toString();
  console.log(currentDate);

  // const [question, setQuestions] = useState({});

  const changePriority = {
    if(high) {},
  };

  async function handleDragEnd(args) {
    const taskId = Number(args.active.id);
    const newStatus = args.over.id;

    setResponse({
      ...response,
      data: response.data.map((r) => {
        if (r.id === taskId) {
          r.attributes.status = newStatus;
        }
        return r;
      }),
    });

    await editTaskStatus(
      {
        data: { status: newStatus },
      },
      taskId,
      jwt
    );
    await fetchData();
  }
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };

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
            {selectedIndex === 0 ? (
              <TextField
                value={description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                bgcolor="yellow"
                sx={{ width: "100%", height: "100%" }}
              />
            ) : (
              ""
            )}
            {selectedIndex === 1 ? (
              <Box
                display="flex"
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  sx={{
                    width: "100%",
                    height: "100px",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                >
                  <input
                    id="file"
                    // hidden
                    multiple
                    accept="*"
                    type="file"
                    onChange={handleImage}
                  />
                  {previewTask ? (
                    <Avatar
                      width="52px"
                      height="52px"
                      sx={{ padding: 0, margin: 0 }}
                      // borderRadius="50%"
                      src={previewTask}
                    />
                  ) : (
                    <InsertPhotoOutlined sx={{ color: "#4339F2" }} />
                  )}
                </IconButton>
              </Box>
            ) : (
              ""
            )}
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
    <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
      {/* <Stack direction="row"> */}
      {/* <SideBar />
        <Stack
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
              <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
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
                <Grid container spacing="18px" gap="18px">
                  <Droppable id="TO DO">
                    <Grid item>
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
                          {/* <DndContext onDragEnd={handleDragEnd}> */}
                          <>
                            {/* <SortableContext
                                  items={[response]}
                                  strategy={verticalListSortingStrategy}
                                > */}
                            {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}

                            {response?.data
                              ?.filter(
                                (task) => task.attributes.status === "TO DO"
                              )
                              .map((task) => (
                                <Paper sx={{ padding: 0, borderRadius: "5px" }}>
                                  {/* <Box height="12px" /> */}
                                  <Draggable id={task?.id}>
                                    <Stack
                                      justifyContent="flex-start"
                                      gap="16px"
                                    >
                                      <Typography
                                        fontWeight="500"
                                        fontSize="15px"
                                        color="#3F4158"
                                      >
                                        {task?.attributes?.title}
                                      </Typography>
                                      <Box
                                        sx={{
                                          backgroundColor: "#4339F2",
                                          borderRadius: "5px",
                                          width: "109px",
                                          height: "26px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          // width: "fill",
                                        }}
                                      >
                                        Task Creator
                                      </Box>
                                      <Stack direction="row" paddingTop="12px">
                                        <AttachFile />
                                      </Stack>
                                    </Stack>
                                  </Draggable>
                                </Paper>
                              ))}
                            {/* </SortableContext> */}
                          </>
                          {/* </DndContext> */}
                        </Stack>
                      </Paper>
                    </Grid>
                  </Droppable>
                  <Droppable id="IN PROGRESS">
                    <Grid item>
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
                          {/* <DndContext onDragEnd={handleDragEnd}> */}
                          <>
                            {/* <SortableContext
                                    items={[response]}
                                    strategy={verticalListSortingStrategy}
                                  > */}
                            {response?.data
                              ?.filter(
                                (task) =>
                                  task.attributes.status === "IN PROGRESS"
                              )
                              .map((task) => (
                                <Draggable id={task?.id}>
                                  <Card>
                                    <Typography>
                                      {task?.attributes?.title}
                                    </Typography>
                                  </Card>
                                </Draggable>
                              ))}
                            {/* </SortableContext> */}
                          </>
                          {/* </DndContext> */}
                        </Stack>
                      </Paper>
                    </Grid>
                  </Droppable>
                  <Droppable id="IN REVIEW">
                    <Grid item>
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
                          {/* <DndContext onDragEnd={handleDragEnd}> */}
                          <>
                            {/* <SortableContext
                                    items={[response]}
                                    strategy={verticalListSortingStrategy}
                                  > */}
                            {response?.data
                              ?.filter(
                                (task) => task.attributes.status === "IN REVIEW"
                              )
                              .map((task) => (
                                <Draggable id={task?.id}>
                                  <Card>
                                    <Typography>
                                      {task?.attributes?.title}
                                    </Typography>
                                  </Card>
                                </Draggable>
                              ))}
                            {/* 
                                </SortableContext> */}
                          </>
                          {/* </DndContext> */}
                        </Stack>
                      </Paper>
                    </Grid>
                  </Droppable>
                  <Droppable id="DONE">
                    <Grid item>
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
                              Done
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
                          {/* <DndContext onDragEnd={handleDragEnd}> */}
                          <>
                            {/* <SortableContext
                                    items={[response]}
                                    strategy={verticalListSortingStrategy}
                                  > */}
                            {response?.data
                              ?.filter(
                                (task) => task.attributes.status === "DONE"
                              )
                              .map((task) => (
                                <Draggable id={task?.id}>
                                  <Card>
                                    <Typography>
                                      {task?.attributes?.title}
                                    </Typography>
                                  </Card>
                                </Draggable>
                              ))}
                            {/* </SortableContext> */}
                          </>
                          {/* </DndContext> */}
                        </Stack>
                      </Paper>
                    </Grid>
                  </Droppable>
                </Grid>
              </DndContext>
            </Stack>
          </Box>
        </Stack>
      </>
      {/* </Stack> */}
      {/* </Stack> */}
    </Layout>
  );
};

export default StatusView;
