import { InsertPhotoOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";

import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../layout/employees";
import {
  createNewProject,
  createNotification,
  createTask,
  getProjectId,
  readAllProjects,
  readEmployee,
  readEmployeeTask,
  readProject,
  readTaskEmployee,
} from "../lib";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import Dropdown from "./Projects/dropdown";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import AddTaskButton from "./AddTaskButton";
import ButtonGroups from "./ButtonGroups";

const Projects = ({ jwt }) => {
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const [prioritySelectedIndex, setPrioritySelectedIndex] = useState(0);
  const [departmentSelectedIndex, setDepartmentSelectedIndex] = useState(0);
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(0);
  const [projectLeadSelectedIndex, setProjectLeadSelectedIndex] = useState(0);
  const projectRandomNumber = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

  const [projectImage, setProjectImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  const [projectTitle, setProjectTitle] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  // const [projectId, setProjectId] = useState("");
  const [projectPriority, setProjectPriority] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectResponsibleDepartment, setProjectResponsibleDepartment] =
    useState("");
  const [projectLead, setProjectLead] = useState("");
  const [projectTeam, setProjectTeam] = useState();
  const [projectStartDate, setProjectStartDate] = useState(dayjs());
  const [projectEndDate, setProjectEndDate] = useState(dayjs());
  const [projectCreatedBy, setProjectCreatedBy] = useState([]);
  const [projectTask, setProjectTask] = useState("");
  const [projectDocuments, setProjectDocuments] = useState([]);
  const [projectDescription, setProjectDescription] = useState();
  const [fileNames, setFileNames] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [employeeChecked, setEmployeeChecked] = React.useState([]);

  const [tasks, setTasks] = useState([]);

  const buttons = ["Description", "Files", "Tasks"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newProjectDocuments = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newProjectDocuments.push({
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file),
      });
    }

    setProjectDocuments(newProjectDocuments);
  };

  // handle file selection
  const handleFileSelect = (event) => {
    const files = event.target.files;
    setProjectDocuments(files);
    // get file names and extensions
    const names = [];
    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
    }
    setFileNames(names);
  };
  const FileNamesWrapper = styled("div")({
    marginTop: "10px",
    "& div": {
      marginTop: "5px",
      fontSize: "14px",
      fontWeight: "500",
      backgroundColor: "#F9F9F9",
      padding: "8px",
      borderRadius: "4px",
    },
  });

  const handleAddTask = (task) => {
    console.log({ tasks })
    setTasks([...tasks, task]);
  };


  const handleToggle = (value) => () => {
    const currentIndex = employeeChecked
      .map((i) => JSON.stringify(i))
      .indexOf(JSON.stringify(value));
    console.log({ currentIndex });
    setEmployeeChecked(...employeeChecked)
    // setProjectCreatedBy(...projectCreatedBy, currentEmployee.data?.data[0])
    console.log({ employeeChecked })

    const newChecked = [...employeeChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setEmployeeChecked(newChecked);
    console.log({ employeeChecked });
  };

  const sendProject = async () => {
    const employee = await readTaskEmployee(jwt, user);
    setChecked((prev) => !prev)
    console.log({ employee });

    const formData = new FormData();
    formData.append("files.projectImage", projectImage);
    for (const doc of projectDocuments) {
      formData.append("files.projectDocument", doc);
    }
    console.log({ currentEmployee })
    formData.append(
      "data",
      JSON.stringify({
        projectTitle,
        projectBudget,
        projectId,
        projectPriority,
        projectStatus,
        // projectTeam,
        projectResponsibleDepartment,
        projectLead,
        projectStartDate: projectStartDate?.toISOString(),
        projectEndDate: projectEndDate?.toISOString(),
        // employee: [currentEmployee?.data?.data[0]?.id, ...projectCreatedBy],
        employee: employee?.data?.data[0]?.id,
        employees: [currentEmployee?.data?.data[0]?.id, ...employeeChecked?.map((emp) => emp?.id)],

        // projectDocument: projectDocuments,
        projectDescription,
      })
    );
    const projectRequest = await createNewProject(formData, jwt);


    const handleCreateTasks = async () => {
      const promises = tasks.map(async (task) => {
        const taskData = new FormData();
        taskData.append("data", JSON.stringify({
          title: task,
          employee: employee?.data?.data[0]?.id,
          employee_checkeds: [currentEmployee?.data?.data[0]?.id, ...employeeChecked?.map((emp) => emp?.id)],
          status: 'INPROGRESS',
          priority: "HIGH",
          projects: projectRequest?.data?.data?.id,

        }))

        const createTaskResponse = await createTask(taskData, jwt);

        const newTaskNotification = {
          data: {
            date: new Date().toISOString(),
            type: "Task",
            task: createTaskResponse?.data?.data?.id,
            employees: [currentEmployee?.data?.data[0]?.id, ...employeeChecked?.map((emp) => emp?.id)],
            employee: [currentEmployee?.data?.data[0]?.id],
          },
        };

        await createNotification(newTaskNotification, jwt);

        return createTaskResponse;
      });

      await Promise.all(promises);
    };

    handleCreateTasks();





    const newNotification = {
      data: {
        date: new Date().toISOString(),
        type: "Project",
        project: projectRequest?.data?.data?.id,
        employees: [currentEmployee?.data?.data[0]?.id, ...employeeChecked?.map((emp) => emp?.id)],
        employee: [currentEmployee?.data?.data[0]?.id, ...projectCreatedBy],
      },
    };
    // employee: employee.data?.data?.[0]?.id,

    await createNotification(newNotification, jwt);
    // await createNotification(newTaskNotification, jwt);
    console.log("the project is", formData);
  };

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [response, setResponse] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [employeeResponse, setEmployeeResponse] = useState([]);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }

      const lastProject = await getProjectId(jwt);
      const lastProjectId = lastProject?.data?.data?.[0]?.id || 1;
      setProjectId(`FC - ${new Date().getFullYear()} - ${lastProjectId + 1}`);
      console.log({ lastProject });

      const employee = await readTaskEmployee(jwt, user);


      setCurrentEmployee(employee);


      const employeeResult = await readEmployeeTask(jwt, user);
      const employeeList = await readEmployee(jwt, user);

      const result = await readProject(jwt, user);
      const employeeResults = await readProject(jwt, user);
      const allResults = await readAllProjects(jwt, user);
      setResponse(result.data);
      setAllProjects(allResults.data);
      setEmployeeResponse(employeeResult.data);
      setEmployees(employeeList.data);
      console.log({ ce: currentEmployee?.data });
    };
    // randomId;
    fetchData();
  }, [user]);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState("");

  const [checked, setChecked] = React.useState(false);
  const handleFileUploadError = (error) => {
    // Do something...
  };

  const handleFilesChange = (files) => {
    // Do something...
  };

  const handleImage = (e) => {
    setProjectImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const [showButtonBorder, setShowButtonBorder] = useState(false);

  const [descriptionButtonClicked, setDescriptionButtonClicked] =
    useState(true);
  const [filesButtonClicked, setFilesButtonClicked] = useState(false);

  const isButtonClicked = (event) => {
    const id = event.target.id;
    console.log("button clicked is: ", event.target.id);
    switch (id) {
      case "description":
        console.log("button clicked is: ", id);
        setDescriptionButtonClicked(true);
        setFilesButtonClicked(false);

      case "files":
        console.log("button clicked is: ", id);
        setFilesButtonClicked(true);
        setDescriptionButtonClicked(false);
    }
  };

  const statusOptions = ["Ongoing", "Paused", "Delayed", "Completed"];
  const departmentOptions = [
    "Inventory",
    "Finance",
    "Human Resource",
    "Project",
    "Workshop",
  ];
  const projectLeadOptions = ["Abebe", "Kebede"];
  const priorityOptions = ["Low", "Medium", "High"];

  const addProject = (
    <Paper
      sx={{ m: 1, zIndex: 1, overflow: "auto", borderColor: "#4339F2", borderRadius: "10px" }}
      elevation={4}
      variant="outlined"


    >
      <Box
        sx={{
          width: "566px",
          height: "800px",
          paddingX: "22px",
          paddingTop: "16px",
          // paddingBottom: "16px",
          //   bgcolor: "white",
          borderRadius: "10px",
        }}
      >
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight="700" fontSize="20px">
              Create New Project
            </Typography>
            <Button onClick={handleSlide}>
              <Stack
                direction="row"
                gap="8px"
                justifyContent="center"
                alignItems="center"
              >
                <Typography color="#9FA0AB" fontSize="12px" fontWeight="400px">
                  Close
                </Typography>
                <Box
                  bgcolor="#F6F6F6"
                  width="24px"
                  height="24px"
                  borderRadius="50%"
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                >
                  <CloseIcon
                    sx={{
                      color: "#9FA0AB",
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </Box>
              </Stack>
            </Button>
          </Stack>
          <Box height="20px" />
          <Stack
            direction="row"
            gap="7.97px"
            justifyContent="center"
            alignItems="center"
          >
            {/* <input
              id="file"
              value={projectImage}
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => setProjectImage(e.target.files[0])} */}

            <IconButton
              component="label"
              width="52px"
              height="52px"
              sx={previewImage ? "" : { backgroundColor: "#E8E7FD" }}
            >
              <input
                id="file"
                // value={projectImage}
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
            {/* </input> */}
            <TextField
              //   variant="filled"
              defaultValue="Enter Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              sx={{
                width: "480.15px",
                "& .MuiInputBase-root": {
                  height: 32,
                },
              }}
            />
          </Stack>
          <Box height="24px" />
          <Stack direction="row" justifyContent="space-between">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap="15.94px"
            //   alignItems="center"
            >
              <Stack>
                <Typography fontSize="12px" fontWeight="400" color="#6F7082">
                  Project Id:
                </Typography>
                <Typography> {projectId}</Typography>
              </Stack>
              <Stack>
                <Typography fontSize="12px" fontWeight="400" color="#6F7082">
                  Priority:
                </Typography>
                <Dropdown
                  selectedItemText={priorityOptions[prioritySelectedIndex]}
                  //   value={projectDetail.projectPriority}
                  // style={{ backgroundColor: "#F6F6F6", flexDirection: "column" }}
                  dropDownWidth="112px"
                  dropDownColor="#6F7082 !important"
                  dropDownBackgroundColor="#F6F6F6 !important"
                  dropDownBorderRadius="10px"
                  dropDownHeight="24px"
                  dropDownFontSize="12px"
                >
                  {priorityOptions.map((priorityOption, index) => (
                    <MenuItem
                      id={priorityOption}
                      key={priorityOption}
                      //   value={selectedIndex.priority}
                      //   disabled={index === 2}
                      selected={index === prioritySelectedIndex}
                      onClick={() => {
                        setPrioritySelectedIndex(index);
                        prioritySelectedIndex === 0
                          ? setProjectPriority("Low")
                          : prioritySelectedIndex === 1
                            ? setProjectPriority("Medium")
                            : prioritySelectedIndex === 2
                              ? setProjectPriority("High")
                              : "";
                      }}
                    >
                      {priorityOption}
                    </MenuItem>
                  ))}
                </Dropdown>
              </Stack>

              <Stack>
                <Typography fontSize="12px" fontWeight="400" color="#6F7082">
                  Status:
                </Typography>
                <Dropdown
                  selectedItemText={statusOptions[statusSelectedIndex]}
                  dropDownWidth="112px"
                  dropDownColor="#6F7082 !important"
                  dropDownBackgroundColor="#F6F6F6 !important"
                  dropDownBorderRadius="10px"
                  dropDownHeight="24px"
                  dropDownFontSize="12px"
                >
                  {statusOptions.map((statusOption, index) => (
                    <MenuItem
                      id={statusOption}
                      key={statusOption}
                      value={projectStatus}
                      //   disabled={index === 2}
                      selected={index === statusSelectedIndex}
                      onClick={() => {
                        setStatusSelectedIndex(index);
                        statusSelectedIndex === 0
                          ? setProjectStatus("Ongoing")
                          : prioritySelectedIndex === 1
                            ? setProjectStatus("Paused")
                            : prioritySelectedIndex === 2
                              ? setProjectStatus("Delayed")
                              : prioritySelectedIndex === 3
                                ? setProjectStatus("Completed")
                                : "";
                      }}
                    >
                      {statusOption}
                    </MenuItem>
                  ))}
                </Dropdown>
              </Stack>
            </Stack>
            <Stack alignItems="center">
              <Typography>Project Team:</Typography>

              <AvatarGroup max={20}>
                <Avatar
                  sx={{ width: "24px", height: "24px" }}
                  alt="Employee Image"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${currentEmployee?.data?.data[0]?.attributes?.employeeImage
                    ?.data?.attributes?.url}`}

                />


                {employeeChecked.map((employee) => (
                  <Avatar
                    sx={{ width: "24px", height: "24px" }}
                    alt="Employee Image"
                    src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url
                      }`}
                  />
                ))}
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
                                width: "13px",
                                height: "13px",
                                color: "white",
                              }}
                            />
                          </Button>
                          <Popper
                            {...bindPopper(popupState)}
                            transition
                            sx={{ zIndex: 1 }}
                          >
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
                                            sx={{ alignItems: 'center' }}
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

                                              <Box display="flex" alignItems="center">
                                                <Avatar
                                                  sx={{
                                                    width: "24px",
                                                    height: "24px",
                                                  }}
                                                  src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                                                />
                                              </Box>
                                            </ListItemIcon>
                                            <ListItemText
                                              id={labelId}
                                              primary={
                                                employee?.attributes?.firstName
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
            </Stack>
          </Stack>
          <Box height="26px" />
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="14px" color="#3F4158">
                Project Information
              </Typography>
              <Divider sx={{ width: "384px", alignSelf: "center" }} />
            </Stack>
          </Stack>
          <Box height="20px" />
          <Grid container spacing="24px">
            <Grid item xs={6}>
              <Dropdown
                selectedItemText={departmentOptions[departmentSelectedIndex]}
                dropDownWidth="248px"
                dropDownColor="#6F7082 !important"
                dropDownBackgroundColor="#F6F6F6 !important"
                dropDownHeight="46px"
                dropDownFontSize="12px"
                buttonTitle="Responsible Department"
                buttonTitleColor="#6F7082"
                buttonTitleFontSize="12px"
                buttonTitleFontWeight={600}
              >
                {departmentOptions.map((departmentOption, index) => (
                  <MenuItem
                    id={departmentOption}
                    key={departmentOption}
                    value={projectResponsibleDepartment}
                    //   disabled={index === 2}
                    selected={index === departmentSelectedIndex}
                    onClick={() => {
                      setDepartmentSelectedIndex(index);
                      departmentSelectedIndex === 0
                        ? setProjectResponsibleDepartment("Inventory")
                        : departmentSelectedIndex === 1
                          ? setProjectResponsibleDepartment("Finance")
                          : departmentSelectedIndex === 2
                            ? setProjectResponsibleDepartment("Human Resource")
                            : departmentSelectedIndex === 3
                              ? setProjectResponsibleDepartment("Project")
                              : departmentSelectedIndex === 4
                                ? setProjectResponsibleDepartment("Workshop")
                                : "";
                    }}
                  >
                    {departmentOption}
                  </MenuItem>
                ))}
              </Dropdown>
            </Grid>
            <Grid item xs={6}>
              <Dropdown
                selectedItemText={projectLeadOptions[projectLeadSelectedIndex]}
                dropDownWidth="248px"
                dropDownColor="#6F7082 !important"
                dropDownBackgroundColor="#F6F6F6 !important"
                dropDownHeight="46px"
                dropDownFontSize="12px"
                buttonTitle="Project Lead"
                buttonTitleColor="#6F7082"
                buttonTitleFontSize="12px"
                buttonTitleFontWeight={600}
              >
                {projectLeadOptions.map((projectLeadOption, index) => (
                  <MenuItem
                    id={projectLeadOption}
                    key={projectLeadOption}
                    value={projectLead}
                    //   value={selectedIndex.priority}
                    //   disabled={index === 2}
                    selected={index === projectLeadSelectedIndex}
                    onClick={() => {
                      setProjectLeadSelectedIndex(index);
                      projectLeadSelectedIndex === 0
                        ? setProjectLead("Abebe")
                        : projectLeadSelectedIndex === 1
                          ? setProjectLead("Kebede")
                          : "";
                    }}
                  >
                    {projectLeadOption}
                  </MenuItem>
                ))}
              </Dropdown>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  datePickerColor="#F6F6F6"
                  datePickerLabel="Project Start Date"
                  renderInput={(params) => <TextField {...params} />}
                  value={projectStartDate}
                  onChange={(newValue) => {
                    setProjectStartDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  datePickerColor="#F6F6F6"
                  datePickerLabel="Project End Date"
                  renderInput={(params) => <TextField {...params} />}
                  value={projectEndDate}
                  onChange={(newValue) => {
                    setProjectEndDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Box height="24px" />
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize="14px" color="#3F4158">
              Additional Details
            </Typography>

            <Divider sx={{ width: "384px", alignSelf: "center" }} />
          </Stack>
          <Box height="20px" />
          <Box display="flex" justifyContent="space-around">

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
                  onChange={handleFileSelect}
                />
                <Typography color="#6F7082" fontWeight="600px" fontSize="12px">
                  Attach Project Documents
                </Typography>

                <NoteAddOutlinedIcon
                  sx={{ width: "16px", height: "16px", color: "#6F7082" }}
                />
              </label>
            </Button>

            <TextField value={projectBudget} onChange={(e) => setProjectBudget(e.target.value)} sx={{
              width: "248px", "& .MuiInputBase-root": {
                height: "48px",
              },
            }} placeholder="Project Budget in ETB" />
          </Box>
          {/* <Box display="flex" flexWrap="wrap" justifyContent="flex-start"> */}
          <Box height='8px' />
          <AddTaskButton onAdd={handleAddTask} />

          {/* </Box> */}


          <Box height="24px" />
          <>
            <Stack>
              <ButtonGroups
                buttons={buttons}
                selectedIndex={selectedIndex}
                clickedButtonColor="#4339F1 !important"
                unClickedButtonColor="#9FA0AB !important"
                onClick={(i) => {
                  setSelectedIndex(i);
                }}
              />
              {selectedIndex === 0 ? (
                <>
                  <Box height="12px" />
                  <TextField
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    sx={{
                      width: "520px",
                      "& .MuiInputBase-root": {
                        height: "48px",
                      },
                    }}
                  ></TextField>
                </>
              ) : selectedIndex === 1 ? (
                <Paper elevation={0} sx={{ overflow: "auto", maxHeight: "80px", padding: "8px" }}>
                  {fileNames.length > 0 ? (

                    <FileNamesWrapper>

                      {fileNames.map((fileName) => (
                        <div key={fileName}>{fileName}</div>
                      ))}
                    </FileNamesWrapper>
                  ) : <>
                    <Typography>No added files</Typography>

                    <Box height="50px" />
                  </>}
                </Paper>
              ) : selectedIndex === 2 ? (
                <>{
                  tasks?.length > 0 ? (
                    <Paper elevation={0} sx={{ overflow: "auto", maxHeight: "80px", padding: "8px" }}>
                      <Box display="flex">
                        {tasks.map((task) => (
                          <Box key={task} display="flex">

                            <Chip key={task} label={task} sx={{ margin: "5px", backgroundColor: "#F6F6F6", color: '#6F7081' }} />
                            <Box width="5px" />
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  ) : <>
                    <Typography>No added tasks</Typography>

                    <Box height="50px" />
                  </>
                }

                </>
              ) : ''}
            </Stack>

          </>
        </Stack>


        <Box height="24px" />
        <Stack direction="row" justifyContent="space-between">
          <Button variant="text">Reset</Button>
          <Button
            variant="contained"
            onClick={sendProject}
            sx={{
              bgcolor: "#4339F2 !important",
              width: "190px",
              height: "48px",
              borderRadius: "10px",
              p: 0,
              m: 0,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="12px">Create New Project</Typography>
              <AddIcon sx={{ width: "16px", height: "16px" }} />
            </Stack>
          </Button>

        </Stack>
        {/* </Stack> */}
      </Box>
      <Box height="16px" />
    </Paper>
  );
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column">
          <Typography fontWeight="700" fontSize="32px" color="#141522">
            FrankCon Projects
          </Typography>
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Manage and View active FrankCon projects
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="column"
            alignItems="space-between"
            justifyContent="flex-end"
          //   gap="10px"
          >
            <Typography fontWeight="400" fontSize="12px" color="#6F7082">
              Total Projects
            </Typography>
            <Typography fontWeight="700" fontSize="16px" color="#141522">
              {response?.data?.length}
            </Typography>
          </Stack>
          <Box width="32px" />
          {/* <Button
            onClick={handleSlide}
            sx={{
              marginTop: "3px",
              backgroundColor: "white",
              color: "#4339F2",
              borderRadius: "10px",
              width: "178px",
              height: "48px",
              // paddingX: "16px",
              // paddingY: "15px",
            }}
          >
            
            <Typography
              // variant="h1"
              fontSize="14px"
              fontWeight="400"
              color="#6F7082"
            >
              Generate Report
            </Typography>

            <AttachFileIcon
              sx={{ color: "#6F7082", width: "16px", height: "16px" }}
            />
          </Button> */}
          <Box width="16px" />
          <Button
            onClick={handleSlide}
            sx={{
              marginTop: "3px",
              backgroundColor: "#E1E0F6",
              bgcolor: "#4339F2",
              color: "white",
              borderRadius: "10px",
              paddingX: "16px",
              paddingY: "12px",
            }}
          >
            <Typography variant="p" fontSize="14px" fontWeight="400">
              Create New Project
            </Typography>
            <AddIcon />
          </Button>
        </Stack>
      </Stack>
      <Box height="24px" />
      <EmployeesLayout jwt={jwt} metric={`Filter`} list="Grid" sortBy="Years" />
      <Box height="24px" />
      <Stack direction="row">
        <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
          {addProject}
        </Slide>
        <Typography fontWeight="700" fontSize="20px">
          Ongoing Projects - 2023
        </Typography>
      </Stack>
      <Box height="16px" />
      <Stack direction="row">

        <Grid container gap="32px">

          {userDepartment === 'admin' ? allProjects?.data?.map((project, index) => (
            <Grid item>
              <Card sx={{ paddingX: "24px", paddingY: "19px", width: "345px", boxShadow: "0", borderRadius: "10px" }}>
                <Stack justifyContent="flex-start" alignItems="flex-start">
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={`${project?.attributes?.projectImage?.data?.[0]?.attributes?.url}`}
                      alt="Project Image"
                      width="32px" height="32px">
                    </Avatar>
                    <Box width="8px" />
                    <Stack>
                      <Typography sx={{ fontWeight: "700", fontSize: "16px", color: "#0F112E" }}>{project?.attributes?.projectTitle}</Typography>
                      <Typography sx={{ fontWeight: "400", fontSize: "12px", color: "#3F4158" }}>Created By: {project?.attributes?.employee?.data?.attributes?.firstName}</Typography>
                    </Stack>
                  </Box>

                  <Stack direction="row" justifyContent="space-between">
                    <Stack>
                      {project.attributes?.projectStatus === "Delayed" ? (
                        <Typography
                          fontWeight="700"
                          fontSize="16px"
                          color="#F44336"
                        >
                          {project.attributes?.projectStatus}
                        </Typography>
                      ) : (
                        <Typography
                          fontWeight="700"
                          fontSize="16px"
                          color="#24B07D"
                        >
                          {project.attributes?.projectStatus}
                        </Typography>
                      )}
                      <Typography fontWeight="400" fontSize="12px">
                        Status
                      </Typography>
                    </Stack>
                    <Box width="20px" />
                    <Divider orientation="vertical" flexItem variant="middle" />
                    <Box width="20px" />
                    <Stack>
                      {project.attributes?.projectStatus === "Delayed" ? (
                        <Typography
                          fontWeight="700"
                          fontSize="16px"
                          color="#F44336"
                        >
                          {dayjs(project?.attributes?.projectStartDate).format(
                            "DD MMM"
                          )}
                        </Typography>
                      ) : (
                        <Typography
                          fontWeight="700"
                          fontSize="16px"
                          color="#24B07D"
                        >
                          {dayjs(project?.attributes?.projectStartDate).format(
                            "DD MMM"
                          )}
                        </Typography>
                      )}
                      <Typography fontWeight="400" fontSize="12px">
                        Date Created
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box height="10px" />
                  <Link href="/projects/[id]" as={`/projects/${project.id}`}>
                    <Button
                      sx={{
                        color: "#6F7082",
                        fontSize: "12px",
                        fontWeight: "400",
                        paddingX: 0,
                        paddingBottom: 0,
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </Stack>
              </Card>
            </Grid>
          )) : response?.data?.map((project, index) => (
            <>

              <Grid item>
                <Card sx={{ paddingX: "24px", boxShadow: 0, paddingY: "19px", width: "345px" }}>
                  <Stack justifyContent="flex-start" alignItems="flex-start">
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={`${project?.attributes?.projectImage?.data?.[0]?.attributes?.url}`}
                        alt="Project Image"
                        width="32px" height="32px">
                      </Avatar>
                      <Box width="8px" />
                      <Stack>
                        <Typography sx={{ fontWeight: "700", fontSize: "16px", color: "#0F112E" }}>{project?.attributes?.projectTitle}</Typography>
                        <Typography sx={{ fontWeight: "400", fontSize: "12px", color: "#3F4158" }}>Created By: {project?.attributes?.employee?.data?.attributes?.firstName}</Typography>
                      </Stack>
                    </Box>

                    <Stack direction="row" justifyContent="space-between">

                      <Stack>
                        {project.attributes?.projectStatus === "Delayed" ? (
                          <Typography
                            fontWeight="700"
                            fontSize="16px"
                            color="#F44336"
                          >
                            {project.attributes?.projectStatus}
                          </Typography>
                        ) : (
                          <Typography
                            fontWeight="700"
                            fontSize="16px"
                            color="#24B07D"
                          >
                            {project.attributes?.projectStatus}
                          </Typography>
                        )}
                        <Typography fontWeight="400" fontSize="12px">
                          Status
                        </Typography>
                      </Stack>
                      <Box width="20px" />
                      <Divider orientation="vertical" flexItem variant="middle" />
                      <Box width="20px" />
                      <Stack>
                        {project.attributes?.projectStatus === "Delayed" ? (
                          <Typography
                            fontWeight="700"
                            fontSize="16px"
                            color="#F44336"
                          >
                            {dayjs(project?.attributes?.projectStartDate).format(
                              "DD MMM"
                            )}
                          </Typography>
                        ) : (
                          <Typography
                            fontWeight="700"
                            fontSize="16px"
                            color="#24B07D"
                          >
                            {dayjs(project?.attributes?.projectStartDate).format(
                              "DD MMM"
                            )}
                          </Typography>
                        )}
                        <Typography fontWeight="400" fontSize="12px">
                          Date Created
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box height="10px" />
                    <Link href="/projects/[id]" as={`/projects/${project.id}`}>
                      <Button
                        sx={{
                          color: "#6F7082",
                          fontSize: "12px",
                          fontWeight: "400",
                          paddingX: 0,
                          paddingBottom: 0,
                        }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </Stack>
                </Card>
              </Grid>
            </>
          ))
          }

          <Divider sx={{ width: "100%" }} />
        </Grid>
      </Stack>
      <Box height="24px" />
      <Typography fontWeight="700" fontSize="20px">
        Archived Projects
      </Typography>
      <Box height="24px" />
      <Stack direction="row">
        <Grid container gap="32px">
          {response?.data?.map((project) => (
            // archived projects
            <></>
          ))}
          <Divider sx={{ width: "100%" }} />
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Projects;
