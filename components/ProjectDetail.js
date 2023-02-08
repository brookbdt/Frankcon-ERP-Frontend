import { BorderColorOutlined, IosShareOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import EmployeesLayout from "../layout/employees";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import { readProjectDetail } from "../pages/api";
import ProjectAdditionalInfo from "./ProjectAdditionalInfo";
import ProjectDetailBox from "./ProjectDetailBox";
import ProjectTasks from "./ProjectTasks";

const ProjectDetailPage = ({ id, jwt }) => {
  const router = useRouter();
  const projectId = router.query.projectId;
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }

      const result = await readProjectDetail(id, jwt, user);
      setResponse(result.data);
      console.log("project id is:", id);
      console.log("project  is:", response);
    };
    // randomId;
    fetchData();
  }, [user]);
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
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
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
        <ProjectTasks response={response} />
      </Paper>
    </Stack>
  );
};

export default ProjectDetailPage;
