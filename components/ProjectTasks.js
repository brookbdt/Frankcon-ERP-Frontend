import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { readEmployeeUnresolvedTask, readProjectResolvedTask } from "../lib";
import { getTokenFromLocalCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import styled from "@emotion/styled";
import Image from "next/image";

const ProjectTasks = ({ response, id, jwt }) => {
  const [resolvedTaskResponses, setResolvedTaskResponses] = useState([]);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const StyledTypoGrey = styled(Typography)({
    color: "#6F7082",
    fontSize: "8px",
    fontWeight: "800",
  });
  const StyledTypoBlue = styled(Typography)({
    color: "#4339F2",
    fontSize: "8px",
    fontWeight: "800",
  });

  useEffect(() => {
    const jwt = getTokenFromLocalCookie();
    if (!id) return;

    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }

      const resolvedTasks = await readProjectResolvedTask(id, jwt, user);

      setResolvedTaskResponses(resolvedTasks.data);
      console.log({ resolvedTasks });
      console.log({ id });
    };
    // randomId;
    fetchData();
  }, [user, id]);

  return (
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
        <Grid>
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
                {resolvedTaskResponses?.data?.attributes?.tasks?.data?.length}
              </Typography>
            </Box>
          </Box>
          {resolvedTaskResponses?.data?.attributes?.tasks?.data?.map((task) => (
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
              <Stack direction="row">
                <Stack justifyContent="space-between" direction="row">
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
                          task?.attributes?.employee_checkeds?.data[0]
                            .attributes?.employeeImage?.data?.attributes?.url
                        }
                      />
                    </Box>
                  </Stack>
                  <Box></Box>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectTasks;
