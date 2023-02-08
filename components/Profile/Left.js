import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useFetchUser } from "../../lib/authContext";
import {
  readEmployee,
  readEmployeeDetail,
  readEmployeeUnresolvedTask,
  readUser,
} from "../../pages/api";

const Left = ({ jwt }) => {
  dayjs.extend(relativeTime);
  const theme = createTheme({
    components: {
      MuiTypography: {
        variants: [
          {
            props: {
              variant: "h6",
            },
            style: {
              fontSize: 14,
              fontWeight: 400,
              color: "#6F7082",
            },
          },
          {
            props: {
              variant: "h6B",
            },
            style: {
              fontSize: 14,
              fontWeight: 500,
              color: "#0F112E",
            },
          },
        ],
      },
    },
  });
  const { user, loading } = useFetchUser();
  const [response, setResponse] = useState([]);
  const [unresolvedTaskResponse, setUnresolvedTaskResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }

      const result = await readEmployeeDetail(jwt, user);
      const unresolvedTask = await readEmployeeUnresolvedTask(jwt, user);
      setResponse(result.data);
      setUnresolvedTaskResponse(unresolvedTask.data);
      console.log({ jwt });
    };
    // randomId;
    fetchData();
  }, [user]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box paddingLeft="4px" paddingRight="50px">
          <Box height="27px" />
          <Typography variant="h4">My Profile</Typography>
          <Box
            width="464px"
            paddingTop="36px"
            display="flex"
            alignItems="center"
          >
            {response?.data?.map((employee, index) => (
              <Stack>
                <Stack direction="row" gap="71px">
                  <Stack direction="row" alignItems="center">
                    <Avatar width="56px" height="56px"></Avatar>
                    <Box width="25px" />
                    <Stack>
                      <Box display="flex" gap="5px">
                        <Typography>
                          {employee?.attributes?.FirstName}
                        </Typography>
                        <Typography>
                          {employee?.attributes?.LastName}
                        </Typography>
                      </Box>
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        {employee?.attributes?.Position}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Typography
                      fontWeight="400"
                      fontSize="14px"
                      color="#6F7082"
                    >
                      Employee ID Number
                    </Typography>
                    <Typography
                      fontWeight="600"
                      fontSize="16px"
                      color="#0F112E"
                    >
                      EM -{employee?.id}
                    </Typography>
                  </Stack>
                </Stack>
                <Box height="32px" />
                <Stack direction="row" gap="10px" alignItems="center">
                  <Typography fontWeight="400" fontSize="16px">
                    Profile Detail
                  </Typography>
                  <Divider width="322px" />
                </Stack>
                <Box height="20px" />
                <Grid container>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Email Address
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {employee?.attributes?.Email}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {employee?.attributes?.Phone}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box height="20px" />
                <Grid container>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Address
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {employee?.attributes?.Address}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Date Of Birth
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {employee?.attributes?.DateOfBirth}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box height="32px" />
                <Stack direction="row" gap="10px" alignItems="center">
                  <Typography fontWeight="400" fontSize="16px">
                    Profile Activity
                  </Typography>
                  <Divider width="322px" />
                </Stack>
                <Grid container>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Department
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {employee?.attributes?.Department}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Position
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {employee?.attributes?.Position}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box height="20px" />
                <Grid container>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Active Since
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {dayjs(employee?.attributes?.createdAt).format(
                          "DD MMMM, YYYY"
                        )}
                        {/* {employee?.attributes?.createdAt} */}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack justifyContent="center">
                      <Typography
                        fontWeight="400"
                        fontSize="14px"
                        color="#6F7082"
                      >
                        Days Active
                      </Typography>
                      <Typography
                        fontWeight="500"
                        fontSize="14px"
                        color="#0F112E"
                      >
                        {dayjs(employee?.attributes?.createdAt).fromNow(true)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box height="36px" />
                <Paper
                  sx={{
                    backgroundColor: "white",
                    width: "464px",
                    borderColor: "#DADADD",
                    borderRadius: "10px",
                    padding: "32px",
                  }}
                  variant="outlined"
                >
                  <Stack>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "19px",
                        color: "#101010",
                      }}
                    >
                      Unresolved Tasks
                    </Typography>
                    <Box height="36px" />
                    {unresolvedTaskResponse?.data?.map((unresolvedTask) => (
                      <Stack>
                        <Typography
                          fontSize="14px"
                          fontWeight="600"
                          color="#101010"
                        >
                          {unresolvedTask?.attributes?.title}
                          <Box height="18px" />
                          <Divider width="100%" sx={{ padding: 0 }} />
                          <Box height="20px" />
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            ))}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Left;
