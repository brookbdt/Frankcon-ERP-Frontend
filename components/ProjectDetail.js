import {
  BorderColorOutlined,
  InsertPhotoOutlined,
  IosShareOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Fade,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EmployeesLayout from "../layout/employees";
import { readNotification, readProjectDetail, readTaskEmployee } from "../lib";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import ProjectAdditionalInfo from "./ProjectAdditionalInfo";
import ProjectDetailBox from "./ProjectDetailBox";
import Dropdown from "./Projects/dropdown";
import ProjectTasks from "./ProjectTasks";
import { getTokenFromLocalCookie } from "../lib/auth";

const ProjectDetailPage = ({ id }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);

  const [checked, setChecked] = useState(false);

  const [prioritySelectedIndex, setPrioritySelectedIndex] = useState(0);
  const [projectLeadSelectedIndex, setProjectLeadSelectedIndex] = useState(0);

  const [departmentSelectedIndex, setDepartmentSelectedIndex] = useState(0);
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState();
  const [projectImage, setProjectImage] = useState();
  const [projectTitle, setProjectTitle] = useState("");
  // const [projectId, setProjectId] = useState("");
  const [projectPriority, setProjectPriority] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectResponsibleDepartment, setProjectResponsibleDepartment] =
    useState("");
  const [projectLead, setProjectLead] = useState("");
  const [projectTeam, setProjectTeam] = useState();
  const [projectStartDate, setProjectStartDate] = useState(dayjs());
  const [projectEndDate, setProjectEndDate] = useState(dayjs());
  const [projectCreatedBy, setProjectCreatedBy] = useState("");
  const [projectTask, setProjectTask] = useState("");
  const [projectDocuments, setProjectDocuments] = useState([]);
  const [projectDescription, setProjectDescription] = useState();
  const [descriptionButtonClicked, setDescriptionButtonClicked] =
    useState(true);
  const [filesButtonClicked, setFilesButtonClicked] = useState(false);
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

  const handleImage = (e) => {
    setProjectImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
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
    p: 4,
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => setOpen(false);

  const sendProject = async () => {
    const employee = await readTaskEmployee(jwt, user);
    console.log({ employee });

    const formData = new FormData();
    formData.append("files.projectImage", projectImage);
    for (const doc of projectDocuments) {
      formData.append("files.projectDocument", doc);
    }
    formData.append(
      "data",
      JSON.stringify({
        projectTitle,
        projectId,
        projectPriority,
        projectStatus,
        // projectTeam,
        projectResponsibleDepartment,
        projectLead,
        projectStartDate: projectStartDate?.toISOString(),
        projectEndDate: projectEndDate?.toISOString(),
        employees: employee?.data?.data?.[0]?.id,

        // projectDocument: projectDocuments,
        projectDescription,
      })
    );

    createNewProject(formData, jwt);
    console.log("the project is", formData);
  };

  const [taskResultResponse, setTaskResultResponse] = useState("");
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    const jwt = getTokenFromLocalCookie();
    if (!id) return;

    setJwt(jwt);
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }

      const result = await readProjectDetail(id, jwt, user);
      const taskResult = await readTaskEmployee(jwt, user);
      setResponse(result.data);

      // const taskResult = await readEmployeeTask(jwt, user);

      setPreviewImage(
        response?.data?.attributes?.projectImage?.data[0].attributes?.url
      );

      console.log("edit project:", { response });
    };
    // randomId;
    fetchData();

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });
  }, [user, id]);
  return (
    <Stack
      direction="column"
      paddingLeft="48px"
      paddingRight="60px"
      width="100%"
      height="100vh"
    >
      <Box height="24px" />
      <Stack justifyContent="space-between" direction="row">
        <Stack>
          <Typography fontWeight="700" fontSize="32px">
            Frankcon Projects
          </Typography>
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Manage Ongoing Frankcon Projects
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap="16px">
          <Button
            onClick={handleSlide}
            sx={{
              marginTop: "3px",
              backgroundColor: "white",
              color: "#4339F2",
              borderRadius: "10px",

              width: "220px",
              height: "48px",
            }}
          >
            {/* <AddIcon /> */}
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="7px"
              alignItems="center"
            >
              <Typography fontWeight="400" fontSize="12px" color="#6F7082">
                Edit Project Details
              </Typography>
              <Box>
                <BorderColorOutlined
                  sx={{ width: "16px", height: "16px", color: "#6F7082" }}
                />
              </Box>
            </Stack>
          </Button>
          <Button
            onClick={handleSlide}
            sx={{
              marginTop: "3px",
              backgroundColor: "#4339F2",
              color: "#4339F2",
              borderRadius: "10px",

              width: "220px",
              height: "48px",
            }}
          >
            {/* <AddIcon /> */}
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="7px"
              alignItems="center"
            >
              <Typography fontWeight="400" fontSize="12px" color="white">
                Export Project Info
              </Typography>
              <Box>
                <IosShareOutlined
                  sx={{ width: "16px", height: "16px", color: "white" }}
                />
              </Box>
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <EmployeesLayout />
      <Box height="24px" />

      {/* {response?.data?.map(project)} */}
      {/* <pre>{JSON.stringify({ readEmployeeTask }, null, 2)}</pre> */}
      <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            m: 1,
            zIndex: 1,
            // height: "500px",
            borderColor: "#4339F2",
            borderRadius: "10px",
            width: "55%",
            overflow: "visible",
          }}
          elevation={4}
          variant="outlined"
        >
          <Box
            sx={{
              width: "566px",
              height: "750px",
              paddingX: "22px",
              paddingTop: "16px",
              //   bgcolor: "white",
              borderRadius: "10px",
            }}
          >
            <Stack direction="column">
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="700" fontSize="20px">
                  Update Project
                </Typography>
                <Button onClick={handleSlide}>
                  <Stack
                    direction="row"
                    gap="8px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      color="#9FA0AB"
                      fontSize="12px"
                      fontWeight="400px"
                    >
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
                  {/* <pre>{JSON.stringify({ previewImage }, null, 2)}</pre> */}
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
                  // value={response.data.attributes.projectTitle}
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
                {/* <pre>{JSON.stringify({ response }, null, 2)}</pre>
                <pre>{JSON.stringify({ readEmployeeTask }, null, 2)}</pre> */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="15.94px"
                  //   alignItems="center"
                >
                  <Stack>
                    <Typography
                      fontSize="12px"
                      fontWeight="400"
                      color="#6F7082"
                    >
                      Project Id:
                    </Typography>
                    <Typography>
                      {" "}
                      {/* {response.data.attributes.projectId} */}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      fontSize="12px"
                      fontWeight="400"
                      color="#6F7082"
                    >
                      Priority:
                    </Typography>
                    <Dropdown
                      selectedItemText={priorityOptions[prioritySelectedIndex]}
                      //   value={projectDetail.projectPriority}
                      dropDownWidth="112px"
                      dropDownColor="#6F7082"
                      dropDownBorderRadius="10px"
                      dropDownBackgroundColor="#F6F6F6"
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
                    <Typography
                      fontSize="12px"
                      fontWeight="400"
                      color="#6F7082"
                    >
                      Status:
                    </Typography>
                    <Dropdown
                      selectedItemText={statusOptions[statusSelectedIndex]}
                      dropDownWidth="112px"
                      dropDownColor="#6F7082"
                      dropDownBorderRadius="10px"
                      dropDownBackgroundColor="#F6F6F6"
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
                  <IconButton
                    component="label"
                    sx={{
                      width: "25px",
                      height: "24px",
                      backgroundColor: "#4339F2",
                    }}
                  >
                    <AddIcon
                      sx={{
                        color: "#FFFFFF",
                        width: "13.09px",
                        height: "13.09px",
                      }}
                    />
                    <input
                      // value={projectTeam}
                      onChange={(e) => setProjectTeam(e.target.files[0])}
                      hidden
                      accept="image/*"
                      type="file"
                    />
                  </IconButton>
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
                    selectedItemText={
                      departmentOptions[departmentSelectedIndex]
                    }
                    dropDownWidth="248px"
                    dropDownColor="#6F7082"
                    // dropDownBorderRadius="10px"
                    dropDownBackgroundColor="#F6F6F6"
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
                        // value={
                        //   response.data.attributes.projectResponsibleDepartment
                        // }
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
                    selectedItemText={
                      projectLeadOptions[projectLeadSelectedIndex]
                    }
                    dropDownWidth="248px"
                    dropDownColor="#6F7082"
                    // dropDownBorderRadius="10px"
                    dropDownBackgroundColor="#F6F6F6"
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
              <Box
                display="flex"
                // justifyContent="space-between"
                alignItems="center"
              >
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
                      onChange={(e) => setProjectDocuments(e.target.files)}
                    />
                    <Typography
                      color="#6F7082"
                      fontWeight="600px"
                      fontSize="12px"
                    >
                      Attach Project Documents
                    </Typography>

                    <NoteAddOutlinedIcon
                      sx={{
                        width: "16px",
                        height: "16px",
                        color: "#6F7082",
                      }}
                    />
                  </label>
                </Button>
                <Button onClick={handleClick}>
                  <Box display="flex" alignItems="center">
                    <AddIcon sx={{ color: "#4339F2" }} />
                    <Typography color="#4339F2">Add Task to Project</Typography>
                  </Box>
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <Stack>
                        <Typography fontWeight="700" fontSize="16px">
                          Select Project Files
                        </Typography>
                      </Stack>
                    </Box>
                  </Fade>
                </Modal>
              </Box>

              <Box height="24px" />
              {/* <Stack direction="row"> */}
              <ButtonGroup>
                <Button
                  id="description"
                  sx={{ width: "150px", height: "38px", p: 0 }}
                  variant="text"
                  onClick={isButtonClicked}
                >
                  <Stack>
                    <Box
                      sx={{
                        // width: "79px",
                        height: "38px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize="14px" color="#0F112E">
                        Description
                      </Typography>
                    </Box>
                    {descriptionButtonClicked && (
                      <Divider width="150px" color="#4339F2" />
                    )}
                  </Stack>
                </Button>
                <Button
                  id="files"
                  sx={{ width: "150px", height: "38px", p: 0 }}
                  variant="text"
                  onClick={isButtonClicked}
                >
                  <Stack>
                    <Box
                      sx={{
                        // width: "79px",
                        height: "38px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize="14px" color="#0F112E">
                        Files (0)
                      </Typography>
                    </Box>
                    {filesButtonClicked && (
                      <Divider width="150px" color="#4339F2" />
                    )}
                  </Stack>
                </Button>
              </ButtonGroup>
            </Stack>
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
            <Box height="24px" />
            <Stack direction="row" justifyContent="space-between">
              <Button variant="text">Reset</Button>
              <Button
                variant="contained"
                onClick={sendProject}
                sx={{
                  bgcolor: "#4339F2",
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
                  <Typography fontSize="12px">Update Project</Typography>
                  <AddIcon />
                </Stack>
              </Button>
            </Stack>
            {/* </Stack> */}
          </Box>
          {/* {response?.data?.map((project) => (
         ))} */}
        </Paper>
      </Slide>
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <Box height="24px" />

        <Grid container paddingLeft="24px">
          <Grid item xs>
            <ProjectDetailBox response={response} />
          </Grid>

          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item xs>
            <ProjectAdditionalInfo response={response} />
          </Grid>
        </Grid>

        <ProjectTasks response={response} id={id} />
      </Paper>
    </Stack>
  );
};

export default ProjectDetailPage;
