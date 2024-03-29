import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AttachFileOutlined } from "@mui/icons-material";

const ProjectAdditionalInfo = ({ response }) => {
  dayjs.extend(relativeTime);

  function handleDownloadClick() {
    const fileUrl = response?.data?.attributes?.projectdocument?.data?.[0]?.attributes?.url;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = ''; // This will set the default filename to the file's original name
    link.target = '_blank'; // This will open the link in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Box paddingLeft="52px" paddingRight="15px">
      <Stack direction="row" gap="20px">
        <Stack>
          {response?.data?.attributes?.projectStatus === "Delayed" ? (
            <Typography fontWeight="700" fontSize="20px" color="#F44336">
              {response?.data?.attributes?.projectStatus}
            </Typography>
          ) : (
            <Typography fontWeight="700" fontSize="20px" color="#22B07D">
              {response?.data?.attributes?.projectStatus}
            </Typography>
          )}

          <Typography fontWeight="400" fontSize="12px" color="#3F4158">
            Status
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Stack justifyContent="center">
          <Typography fontWeight="400" fontSize="12px" color="#3F4158">
            Elapsed Time
          </Typography>
          <Typography>
            {/* <pre>{JSON.stringify({ response }, null, 2)}</pre> */}
            {dayjs(response?.data?.attributes?.createdAt).fromNow(true)}
          </Typography>
        </Stack>
      </Stack>
      <Box height="20px" />
      <Divider width="100%" />
      <Box height="20px" />
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack>
            <Typography fontWeight="700" fontSize="16px" color="#050505">
              Project Additional Details
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography fontWeight="300" fontSize="12px" color="#6F7081">
                Last Updated:
              </Typography>
              <Box width="5px" />
              <Typography fontWeight="400" fontSize="12px" color="#3F4158">
                {dayjs(response?.data?.attributes?.updatedAt).fromNow(true)}
              </Typography>
            </Box>
          </Stack>
          {/* <Button sx={{ color: "#4339F2", fontSize: "14px", padding: 0 }}>
            View Tasks
          </Button> */}
        </Stack>
        <Box height="32px" />
        <Stack gap="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="400" fontSize="14px" color="#050505">
              Project Dependent Tasks
            </Typography>
            <Typography color="#6F7082" fontWeight="400" fontSize="14px">
              {response?.data?.attributes?.tasks?.data?.length}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="400" fontSize="14px" color="#050505">
              Active Project Personnel
            </Typography>
            <Typography color="#6F7082" fontWeight="400" fontSize="14px">
              {response?.data?.attributes?.employees?.data?.length}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="400" fontSize="14px" color="#050505">
              Project Overall Cost
            </Typography>
            <Typography color="#6F7082" fontWeight="400" fontSize="14px">
              {response?.data?.attributes?.projectBudget}

            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="400" fontSize="14px" color="#050505">
              Project Location
            </Typography>
            <Typography color="#6F7082" fontWeight="400" fontSize="14px">
              Addis Ababa
            </Typography>
          </Box>
          <Box height="24px" />
          <Button
            variant="contained"
            sx={{
              width: "247px",
              height: "48px",
              fontSize: "10px",
              backgroundColor: "#F6F6F6",
              color: "black",
              borderRadius: "10px",
              padding: 0,
              boxShadow: "none",
            }}
            onClick={handleDownloadClick}
          >
            <AttachFileOutlined />
            <Box width="12px" />
            Download Attached Document
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectAdditionalInfo;
