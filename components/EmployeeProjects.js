import { InsertDriveFile } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFetchUser } from "../lib/authContext";
import { readEmployeeDetail, readEmployeeUnresolvedTask } from "../pages/api";

const EmployeeProjects = ({ jwt }) => {
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
  const { user, loading } = useFetchUser();
  const [unresolvedTaskResponse, setUnresolvedTaskResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }

      const unresolvedTask = await readEmployeeUnresolvedTask(jwt, user);
      setUnresolvedTaskResponse(unresolvedTask.data);
      console.log({ unresolvedTaskResponse });
    };
    // randomId;
    fetchData();
  }, [user]);
  return (
    <Paper sx={{ overFlowY: "auto" }} elevation={0}>
      <Divider width="100%" sx={{ borderBottomWidth: "2px" }} />
      <Box height="14px" />
      <Typography fontWeight="500" fontSize="20px">
        Employee Projects & Activities
      </Typography>
      <Box height="14px" />
      <Divider width="100%" sx={{ borderBottomWidth: "2px" }} />
      <Box height="24px" />
      <Grid container>
        <Grid item xs>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="14px" fontWeight="700" color="#050505">
              Unresolved Tasks
            </Typography>
            <Link href="#">
              <Button>View Details</Button>
            </Link>
          </Box>
          <Box height="36px" />
          {unresolvedTaskResponse?.data?.map((unresolvedTask) => (
            <>
              <Stack>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="14px" fontWeight="600" color="#050505">
                    {unresolvedTask?.attributes?.title}
                  </Typography>
                  <Box height="38px" />
                </Box>
              </Stack>
            </>
          ))}
        </Grid>
        <Box width="72px" />
        <Grid item xs>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="14px" fontWeight="700" color="#050505">
              Backlog Tasks
            </Typography>
            <Link href="#">
              <Button>View Details</Button>
            </Link>
          </Box>
          <Box height="36px" />
          {unresolvedTaskResponse?.data?.map((unresolvedTask) => (
            <>
              <Stack>
                <Paper
                  sx={{
                    padding: "20px",
                    overflowY: "auto",
                    borderRadius: "8px",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography
                        fontSize="12px"
                        fontWeight="600"
                        color="#0F112E"
                      >
                        {unresolvedTask?.attributes?.title}
                      </Typography>
                    </Box>
                    <Stack gap={1} direction="row">
                      <InsertDriveFile sx={{ color: "#4339F2" }} />
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
                        bgcolor="#F35B051A"
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
                            src="/static/Avatar.png"
                          />
                        </Box>
                        <Box
                          bgcolor="white"
                          margin="0px -8px"
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
                            src="/static/Avatar (2).png"
                          />
                        </Box>
                        <Box
                          bgcolor="#F7F7F7"
                          margin="0px"
                          // border="2px solid #FFFFFF"
                          borderRadius="24px"
                          width="32px"
                          height="32px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography fontWeight="800" fontSize="10px">
                            +5
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
                <Box height="10px" />
              </Stack>
            </>
          ))}
        </Grid>
        <Box width="24px" />
        <Grid item xs>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="14px" fontWeight="700" color="#050505">
              Backlog Tasks
            </Typography>
            <Link href="#">
              <Button>View Details</Button>
            </Link>
          </Box>
          <Box height="36px" />
          {unresolvedTaskResponse?.data?.map((unresolvedTask) => (
            <>
              <Stack>
                <Box display="flex" justifyContent="space-between"></Box>
                <Paper
                  elevation={2}
                  //   variant="outlined"
                  borderBottomWidth="2px"
                  sx={{
                    overflowY: "auto",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      fontSize="14px"
                      fontWeight="600"
                      color="#050505"
                    >
                      {unresolvedTask?.attributes?.title}
                    </Typography>
                    <Stack gap={1} direction="row">
                      <InsertDriveFile sx={{ color: "#4339F2" }} />
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
                        bgcolor="#F35B051A"
                        paddingY="4px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="16px"
                      >
                        <StyledTypoBlue>To Do Tasks</StyledTypoBlue>
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
                            src="/static/Avatar.png"
                          />
                        </Box>
                        <Box
                          bgcolor="white"
                          margin="0px -8px"
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
                            src="/static/Avatar (2).png"
                          />
                        </Box>
                        <Box
                          bgcolor="#F7F7F7"
                          margin="0px"
                          // border="2px solid #FFFFFF"
                          borderRadius="24px"
                          width="32px"
                          height="32px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography fontWeight="800" fontSize="10px">
                            +5
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
                <Box height="10px" />
              </Stack>
            </>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmployeeProjects;
