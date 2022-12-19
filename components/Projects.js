import { InsertPhotoOutlined } from "@mui/icons-material";
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
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../layout/employees";
import { createNewProject, readProject } from "../pages/api";
import Dropdown from "./Projects/dropdown";
import DateSelector from "./shared/datePicker";

const Projects = ({ onMenuClick }) => {
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const sendProject = () => {
    const newProject = {
      // Title: name,
      // data: { faq },
      // title: title,
      // description: description,
      // comment: comment,
      // title: data.title,
      data: {
        // tasks: {

        projectImage,
        projectTitle,
        projectId,
        projectPriority,
        projectStatus,
        projectTeam,
        projectDepartment,
        projectLead,
        projectStartDate,
        projectEndDate,
        projectDocument,
        projectDescription,

        // },
      },
    };
    createNewProject(newProject);
    console.log(newProject);
  };

  const [response, setResponse] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await readProject();
  //       setResponse(result.data);
  //     };
  //     fetchData();
  //   }, []);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState("");
  const [prioritySelectedIndex, setPrioritySelectedIndex] = useState(0);
  const [departmentSelectedIndex, setDepartmentSelectedIndex] = useState(0);
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(0);
  const [projectLeadSelectedIndex, setProjectLeadSelectedIndex] = useState(0);
  const projectRandomNumber = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

  const [projectDetail, setProjectDetail] = useState({
    projectImage: "",
    projectTitle: "",
    projectId: projectRandomNumber,
    projectPriority: "",
    projectStatus: "",
    projectTeam: "",
    projectDepartment: "",
    projectLead: "",
    projectStartDate: "",
    projectEndDate: "",
    projectDocument: "",
    projectDescription: "",
  });

  const [checked, setChecked] = React.useState(false);
  const handleFileUploadError = (error) => {
    // Do something...
  };

  const handleFilesChange = (files) => {
    // Do something...
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
          height: "680px",
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
            <IconButton
              component="label"
              width="52px"
              height="52px"
              sx={{ backgroundColor: "#E8E7FD" }}
            >
              <InsertPhotoOutlined sx={{ color: "#4339F2" }} />
              <input
                value={projectDetail.projectImage}
                hidden
                accept="image/*"
                type="file"
                onChange={(e) =>
                  setProjectDetail({
                    ...projectDetail,
                    projectImage: e.target.value,
                  })
                }
              />
            </IconButton>
            <TextField
              //   variant="filled"
              defaultValue="Enter Project Title"
              value={projectDetail.projectTitle}
              onChange={(e) =>
                setProjectDetail({
                  ...projectDetail,
                  projectTitle: e.target.value,
                })
              }
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
                <Typography>
                  FC- {new Date().getFullYear()}- {projectRandomNumber}
                </Typography>
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
                        setProjectDetail({
                          ...projectDetail,
                          projectPriority: index,
                        });
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
                      value={projectDetail.projectStatus}
                      //   disabled={index === 2}
                      selected={index === statusSelectedIndex}
                      onClick={() => {
                        setStatusSelectedIndex(index);
                        setProjectDetail({
                          ...projectDetail,
                          projectStatus: index,
                        });
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
                  value={projectDetail.projectTeam}
                  onChange={(e) =>
                    setprojectDetail({
                      ...projectDetail,
                      projectTeam: e.target.value,
                    })
                  }
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
                    value={projectDetail.projectDepartment}
                    //   disabled={index === 2}
                    selected={index === departmentSelectedIndex}
                    onClick={() => {
                      setDepartmentSelectedIndex(index);
                      setProjectDetail({
                        ...projectDetail,
                        projectDepartment: index,
                      });
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
                    value={projectDetail.projectLead}
                    //   value={selectedIndex.priority}
                    //   disabled={index === 2}
                    selected={index === projectLeadSelectedIndex}
                    onClick={() => {
                      setProjectLeadSelectedIndex(index);
                      setProjectDetail({
                        ...projectDetail,
                        projectLead: index,
                      });
                    }}
                  >
                    {projectLeadOption}
                  </MenuItem>
                ))}
              </Dropdown>
            </Grid>
            <Grid item xs={6}>
              <DateSelector
                datePickerColor="#F6F6F6"
                datePickerLabel="Project Start Date"
                value={projectDetail.projectStartDate}
                onChange={(e) =>
                  setProjectDetail({
                    ...projectDetail,
                    projectStartDate: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <DateSelector
                datePickerColor="#F6F6F6"
                datePickerLabel="Project End Date"
                value={projectDetail.projectEndDate}
                onChange={(e) =>
                  setProjectDetail({
                    ...projectDetail,
                    projectEndDate: e.target.value,
                  })
                }
              />
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
          <Box>
            <input
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              value={projectDetail.projectDocument}
              onChange={(e) =>
                setProjectDetail({
                  ...projectDetail,
                  projectDocument: e.target.value,
                })
              }
            />
            <Button
              variant="filled"
              sx={{
                backgroundColor: "#F6F6F6",
                width: "248px",
                height: "46px",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography color="#6F7082" fontWeight="600px" fontSize="12px">
                  Attach Project Documents
                </Typography>
                {/* <IconButton
                component="label"
                width="16px"
                height="16px"
                sx={{ backgroundColor: "#E8E7FD" }}
              > */}
                <NoteAddOutlinedIcon
                  sx={{ width: "16px", height: "16px", color: "#6F7082" }}
                />
                {/* </IconButton> */}
              </Stack>
              {/* <input hidden accept="image/*" width="100%" type="file" /> */}
            </Button>
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
          value={projectDetail.projectDescription}
          onChange={(e) =>
            setProjectDetail({
              ...projectDetail,
              projectDescription: e.target.value,
            })
          }
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
      <EmployeesLayout metric={`Filter`} list="Grid" sortBy="Years" />
      <Box height="24px" />
      <Stack direction="row">
        <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
          {addProject}
        </Slide>
        <Typography>Ongoing Projects - 2022</Typography>
      </Stack>
    </Stack>
  );
};

export default Projects;
