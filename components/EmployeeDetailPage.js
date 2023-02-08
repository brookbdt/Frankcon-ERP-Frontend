import {
  AttachFile,
  BorderColorOutlined,
  IosShareOutlined,
} from "@mui/icons-material";
import {
  Avatar,
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
import {
  readEmployeeDetail,
  readOneEmployeeDetail,
  readProjectDetail,
} from "../pages/api";
import AttachedDocuments from "./AttachedDocuments";
import EmployeeProjects from "./EmployeeProjects";
import EmploymentInformation from "./EmploymentInformation";
import ProfileDetail from "./ProfileDetail";
import ProjectAdditionalInfo from "./ProjectAdditionalInfo";
import ProjectDetailBox from "./ProjectDetailBox";
import ProjectTasks from "./ProjectTasks";

const EmployeeDetailPage = ({ id, jwt }) => {
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

      const result = await readOneEmployeeDetail(id, jwt);
      setResponse(result.data);
      console.log("project id is:", id);
      console.log("project  is:", response);
    };
    // randomId;
    fetchData();
  }, [user]);
  return (
    <Box paddingLeft="48px" paddingTop="27px">
      <Paper
        elevation={0}
        sx={{
          borderRadius: "10px",
          paddingX: "24px",
          maxHeight: "1000px",
          overflowY: "auto",
          // paddingTop: "22px",
          //   paddingRight: "60px",
        }}
      >
        <Stack direction="column" width="100%" height="100%">
          <Box height="24px" />
          <Stack justifyContent="space-between" direction="row">
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  width: "56px",
                  height: "56px",
                }}
                src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${response?.data?.attributes?.employeeImage.data?.attributes?.url}`}
              />
              <Box width="25px" />
              <Stack justifyContent="center">
                <Typography fontWeight="700" fontSize="24px">
                  {response?.data?.attributes?.firstName}{" "}
                  {response?.data?.attributes?.lastName}
                </Typography>
                <Typography fontWeight="500" fontSize="14px" color="#22B07D">
                  ACTIVE ON DUTY
                </Typography>
              </Stack>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4339F2",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            >
              <AttachFile sx={{ width: "24px", height: "24px" }} />
              <Box width="12px" />
              Export Employee Information
            </Button>
          </Stack>
          <Box height="22px" />
          <Divider width="100%" sx={{ borderBottomWidth: "2px" }} />
          <Box height="26px" />

          <Grid container>
            <Grid item xs>
              <ProfileDetail response={response} />
            </Grid>

            <Divider orientation="vertical" flexItem variant="middle" />
            <Grid item xs>
              <EmploymentInformation response={response} />
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              height="269px"
              variant="middle"
            />
            <Grid item xs>
              <AttachedDocuments response={response} />
            </Grid>
          </Grid>
          <Box height="41px" />
          <EmployeeProjects jwt={jwt} response={{ response }} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmployeeDetailPage;
