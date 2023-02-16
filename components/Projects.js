import { InsertPhotoOutlined } from "@mui/icons-material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import {
  Box,
  ButtonGroup,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
  Card,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../layout/employees";
import {
  createNewProject,
  getProjectId,
  readProject,
  readTaskEmployee,
} from "../lib";
import Dropdown from "./Projects/dropdown";
import DateSelector from "./shared/datePicker";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";

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

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [response, setResponse] = useState([]);
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

      const result = await readProject(jwt, user);
      setResponse(result.data);
      console.log("relation is:", response);
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
      sx={{ m: 1, zIndex: 1, borderColor: "#4339F2", borderRadius: "10px" }}
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
                <Typography fontSize="12px" fontWeight="400" color="#6F7082">
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
                  sx={{ color: "#FFFFFF", width: "13.09px", height: "13.09px" }}
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
                selectedItemText={departmentOptions[departmentSelectedIndex]}
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
              <Typography color="#6F7082" fontWeight="600px" fontSize="12px">
                Attach Project Documents
              </Typography>

              <NoteAddOutlinedIcon
                sx={{ width: "16px", height: "16px", color: "#6F7082" }}
              />
            </label>
          </Button>
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
              <Typography fontSize="12px">Create New Project</Typography>
              <AddIcon />
            </Stack>
          </Button>
        </Stack>
        {/* </Stack> */}
      </Box>
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
              Total Inventory
            </Typography>
            <Typography fontWeight="700" fontSize="16px" color="#141522">
              433 Items
            </Typography>
          </Stack>
          <Box width="32px" />
          <Button
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
            {/* <AddIcon /> */}
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
          </Button>
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
          Ongoing Projects - 2022
        </Typography>
      </Stack>
      <Box height="16px" />
      <Stack direction="row">
        <Grid container gap="32px">
          {response?.data?.map((project, index) => (
            <Grid item>
              <Card sx={{ paddingX: "24px", paddingY: "19px", width: "345px" }}>
                <Stack justifyContent="flex-start" alignItems="flex-start">
                  <Stack direction="row">
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${project?.attributes?.projectImage.data?.[0].attributes?.url}`}
                      alt="project image"
                      sx={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                    <Box width="8px" />
                    <Stack>
                      <Typography fontWeight="700" fontSize="16px">
                        {project.attributes?.projectTitle}
                      </Typography>
                      <Typography fontWeight="400" fontSize="12px">
                        Created by:
                        {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
                      </Typography>
                      <Box height="12px" />
                    </Stack>
                  </Stack>
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
          ))}
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

export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const projectResponse = await fetcher(
    `https://frankconerp.herokuapp.com/api/projects`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (projectResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        projectResponse: projectResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: projectResponse.error.message,
      },
    };
  }
}

export default Projects;
