import { Avatar, Box, Stack, Typography, Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Dropdown from "./Projects/dropdown";
import { PlaylistAddCheckSharp } from "@mui/icons-material";

const ProjectDetailBox = ({ response }) => {
  console.log("project detail res", response);

  const priorityOptions = ["Low", "Medium", "High"];
  const [prioritySelectedIndex, setPrioritySelectedIndex] = useState(0);
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(0);
  const [projectStatus, setProjectStatus] = useState("");

  const [projectPriority, setProjectPriority] = useState("");
  const statusOptions = ["Ongoing", "Paused", "Delayed", "Completed"];

  return (
    <>
      <Box paddingRight="52px">
        <Stack
          width="522px"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap="20px"
          >
            <Avatar
              src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${response?.data?.attributes?.projectImage.data?.[0].attributes?.url}`}
              alt="project image"
              sx={{
                width: "32px",
                height: "32px",
              }}
            />

            <Typography fontSize="20px" fontWeight="700">
              {response?.data?.attributes?.projectTitle}
            </Typography>
          </Stack>
          <Box display="flex" alignItems="center">
            <Typography fontSize="12px" fontWeight="400" color="#0F112E">
              {" "}
              Created By:
            </Typography>
            <Box width="5px" />
            <Typography fontWeight="700" fontSize="12px">
              {response?.data?.attributes?.projectCreatedBy}
            </Typography>
          </Box>
        </Stack>
        <Box height="16px" />
        <Typography color="#3F4158" fontSize="12px" fontWeight="400">
          {response?.data?.attributes?.projectDescription}
        </Typography>
        <Box height="16px" />
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography fontSize="12px" fontWeight="400" color="#6F7082">
                Project ID:
              </Typography>
              <Typography color="#0F112E" fontSize="14px" fontWeight="700">
                {response?.data?.attributes?.projectId}
              </Typography>
            </Stack>
            <Box width="16px" />
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
                    {response?.data?.attributes?.projectPriority}
                  </MenuItem>
                ))}
              </Dropdown>
            </Stack>
            <Box width="8px" />
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
                    // value={projectStatus}
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
          <Stack>
            <Typography fontSize="12px" fontWeight="400" color="#0F112E">
              Project Team:
            </Typography>
            {/* <Typography color="#0F112E" fontSize="14px" fontWeight="700">
              {response?.data?.attributes?.projectId}
            </Typography> */}
          </Stack>
        </Stack>
        <Box height="16px" />
        <Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize="14px" fontWeight="500" color="#3F4158">
              Project Information
            </Typography>
            <Divider width="384px" />
          </Stack>
          <Box height="12px" />
          <Box display="flex" paddingLeft="12px" justifyContent="space-between">
            <Stack>
              <Typography color="#6F7082" fontSize="12px" fontWeight="600">
                Responsible Department
              </Typography>
              <Typography color="#0F112E" fontWeight="500" fontSize="14px">
                {response?.data?.attributes?.projectResponsibleDepartment}
              </Typography>
            </Stack>
            <Stack>
              <Typography color="#6F7082" fontSize="12px" fontWeight="600">
                Project Lead
              </Typography>
              <Typography color="#0F112E" fontWeight="500" fontSize="14px">
                {response?.data?.attributes?.projectLead}
              </Typography>
            </Stack>
          </Box>
          <Box height="10px" />
          <Box display="flex" paddingLeft="12px" justifyContent="space-between">
            <Stack>
              <Typography color="#6F7082" fontSize="12px" fontWeight="600">
                Project Start Date
              </Typography>
              <Typography color="#0F112E" fontWeight="500" fontSize="14px">
                {response?.data?.attributes?.projectStartDate}
              </Typography>
            </Stack>
            <Stack>
              <Typography color="#6F7082" fontSize="12px" fontWeight="600">
                Project End Date
              </Typography>
              <Typography color="#0F112E" fontWeight="500" fontSize="11px">
                {response?.data?.attributes?.projectEndDate}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Box height="24px" />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="14px" fontWeight="500" color="#3F4158">
            Assigned Tasks
          </Typography>
          <Divider width="402px" />
        </Stack>
        <Box height="12px" />

        <Grid container>
          {response?.data?.attributes?.tasks?.data?.map((task) => (
            <>
              <Grid display="flex" xs={4}>
                <PlaylistAddCheckSharp />
                <Box width="9px" />
                <Typography>{task?.attributes?.title}</Typography>
              </Grid>
            </>
          ))}
        </Grid>
        {/* assigned task */}
        <Box height="64px" />
        <Box height="50px" />
      </Box>
    </>
  );
};

export default ProjectDetailBox;
