import { CloseOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../layout/employees";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import {
  getEmployeeId,
  readEmployee,
  readEmployeeByDepartment,
} from "../pages/api";

const EmployeesSorted = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const [responseFinance, setResponseFinance] = useState([]);
  const [responseArchitecture, setResponseArchitecture] = useState([]);
  const [responseHR, setResponseHR] = useState([]);
  const [responseInventoryDepartment, setResponseInventoryDepartment] =
    useState([]);
  const [responseEngineeringDepartment, setResponseEngineeringDepartment] =
    useState([]);
  const [responsePurchaserDepartment, setResponsePurchaserDepartment] =
    useState([]);
  const [responseWorkshopDepartment, setResponseWorkshopDepartment] = useState(
    []
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const workshopDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Workshop"
      );
      const financeDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Finance"
      );
      const architectureDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Architecture"
      );
      const humanResourceDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Human Resource"
      );
      const inventoryDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Inventory"
      );
      const engineeringDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Engineering"
      );
      const purchaserDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Purchaser"
      );
      const result = await readEmployee(jwt);

      setResponseArchitecture(architectureDepartment.data);
      setResponseEngineeringDepartment(engineeringDepartment.data);
      setResponseFinance(financeDepartment.data);
      setResponseHR(humanResourceDepartment.data);
      setResponseInventoryDepartment(inventoryDepartment.data);
      setResponsePurchaserDepartment(purchaserDepartment.data);
      setResponseWorkshopDepartment(workshopDepartment.data);
      //   console.log(response);
      console.log({ responseArchitecture });

      const lastEmployee = await getEmployeeId(jwt);
      const lastEmployeeId = lastEmployee?.data?.data?.[0]?.id || 1;
    };
    fetchData();
  }, [user]);
  return (
    <>
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseOutlined fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Request Created Successfully
        </Alert>
      </Collapse>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#F7F7F7",
          maxHeight: "1000px",
          overflow: "auto",
        }}
      >
        <Stack
          paddingRight="55px"
          direction="column"
          width="100%"
          maxHeight="100%"
          overflowY="auto"
        >
          <Box height="24px"></Box>
          <Stack justifyContent="space-between" direction="row">
            <Typography fontWeight="700" fontSize="32px">
              Employees
            </Typography>
            <Button
              onClick={handleSlide}
              sx={{
                marginTop: "3px",
                backgroundColor: "#E1E0F6",
                color: "#4339F2",
                borderRadius: "10px",
                paddingX: "16px",
                paddingY: "12px",
              }}
            >
              <AddIcon />
              <Typography variant="p" fontSize="12px" fontWeight="600">
                Add Employee
              </Typography>
            </Button>
          </Stack>
          <EmployeesLayout />
          <Box height="11px" />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="700" fontSize="20px">
              Architecture ({responseArchitecture?.data?.length})
            </Typography>
            <Button component="a" href="/employees/">
              {" "}
              View List of Employees
            </Button>
          </Box>
          <Box height="20px" />
          <Stack direction="row" justifyContent="space-between">
            {responseArchitecture?.data?.map((employee) => (
              <Paper
                elevation={0}
                sx={{
                  paddingTop: "28px",
                  paddingX: "24px",
                  width: "328px",
                  height: "140px",
                  borderRadius: "10px",
                }}
              >
                <Stack>
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      display="flex"
                      justiyfContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        sx={{ width: "48px", height: "48px" }}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                      />
                      <Box width="8px" />
                      <Stack>
                        <Box display="flex">
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.firstName}
                          </Typography>
                          <Box width="5px" />
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.lastName}
                          </Typography>
                        </Box>
                        <Typography
                          fontWeight="400"
                          fontSize="12px"
                          color="#54577A"
                        >
                          {employee?.attributes?.position}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Box height="20px" />
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <Image
                        width="24px"
                        height="24px"
                        src="/static/tasks.png"
                      />
                      <Box width="8px" />
                      <Typography>
                        {employee?.attributes?.tasks?.data.length} Tasks
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight="500"
                      fontSize="14px"
                      color="#141522"
                    >
                      +2519 {employee?.attributes?.phone}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Box height="8px" />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="700" fontSize="20px">
              Engineering ({responseEngineeringDepartment?.data?.length})
            </Typography>
          </Box>
          <Box height="18px" />
          <Stack direction="row" justifyContent="space-between">
            {responseEngineeringDepartment?.data?.map((employee) => (
              <Paper
                elevation={0}
                sx={{
                  paddingTop: "28px",
                  paddingX: "24px",
                  width: "328px",
                  height: "140px",
                  borderRadius: "10px",
                }}
              >
                <Stack>
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      display="flex"
                      justiyfContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        sx={{ width: "48px", height: "48px" }}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                      />
                      <Box width="8px" />
                      <Stack>
                        <Box display="flex">
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.firstName}
                          </Typography>
                          <Box width="5px" />
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.lastName}
                          </Typography>
                        </Box>
                        <Typography
                          fontWeight="400"
                          fontSize="12px"
                          color="#54577A"
                        >
                          {employee?.attributes?.position}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Box height="20px" />
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <Image
                        width="24px"
                        height="24px"
                        src="/static/tasks.png"
                      />
                      <Box width="8px" />
                      <Typography>
                        {employee?.attributes?.tasks?.data.length} Tasks
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight="500"
                      fontSize="14px"
                      color="#141522"
                    >
                      +2519 {employee?.attributes?.phone}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Box height="8px" />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="700" fontSize="20px">
              Finance ({responseFinance?.data?.length})
            </Typography>
          </Box>
          <Box height="20px" />
          <Stack direction="row" justifyContent="space-between">
            {responseFinance?.data?.map((employee) => (
              <Paper
                elevation={0}
                sx={{
                  paddingTop: "28px",
                  paddingX: "24px",
                  width: "328px",
                  height: "140px",
                  borderRadius: "10px",
                }}
              >
                <Stack>
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      display="flex"
                      justiyfContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        sx={{ width: "48px", height: "48px" }}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                      />
                      <Box width="8px" />
                      <Stack>
                        <Box display="flex">
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.firstName}
                          </Typography>
                          <Box width="5px" />
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.lastName}
                          </Typography>
                        </Box>
                        <Typography
                          fontWeight="400"
                          fontSize="12px"
                          color="#54577A"
                        >
                          {employee?.attributes?.position}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Box height="20px" />
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <Image
                        width="24px"
                        height="24px"
                        src="/static/tasks.png"
                      />
                      <Box width="8px" />
                      <Typography>
                        {employee?.attributes?.tasks?.data.length} Tasks
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight="500"
                      fontSize="14px"
                      color="#141522"
                    >
                      +2519 {employee?.attributes?.phone}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Box height="8px" />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="700" fontSize="20px">
              Human Resource ({responseHR?.data?.length})
            </Typography>
          </Box>
          <Box height="20px" />
          <Stack direction="row" justifyContent="space-between">
            {responseHR?.data?.map((employee) => (
              <Paper
                elevation={0}
                sx={{
                  paddingTop: "28px",
                  paddingX: "24px",
                  width: "328px",
                  height: "140px",
                  borderRadius: "10px",
                }}
              >
                <Stack>
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      display="flex"
                      justiyfContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        sx={{ width: "48px", height: "48px" }}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                      />
                      <Box width="8px" />
                      <Stack>
                        <Box display="flex">
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.firstName}
                          </Typography>
                          <Box width="5px" />
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.lastName}
                          </Typography>
                        </Box>
                        <Typography
                          fontWeight="400"
                          fontSize="12px"
                          color="#54577A"
                        >
                          {employee?.attributes?.position}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Box height="20px" />
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <Image
                        width="24px"
                        height="24px"
                        src="/static/tasks.png"
                      />
                      <Box width="8px" />
                      <Typography>
                        {employee?.attributes?.tasks?.data.length} Tasks
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight="500"
                      fontSize="14px"
                      color="#141522"
                    >
                      +2519 {employee?.attributes?.phone}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Box height="8px" />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="700" fontSize="20px">
              Inventory ({responseInventoryDepartment?.data?.length})
            </Typography>
          </Box>
          <Box height="20px" />
          <Stack direction="row" justifyContent="space-between">
            {responseInventoryDepartment?.data?.map((employee) => (
              <Paper
                elevation={0}
                sx={{
                  paddingTop: "28px",
                  paddingX: "24px",
                  width: "328px",
                  height: "140px",
                  borderRadius: "10px",
                }}
              >
                <Stack>
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      display="flex"
                      justiyfContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        sx={{ width: "48px", height: "48px" }}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                      />
                      <Box width="8px" />
                      <Stack>
                        <Box display="flex">
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.firstName}
                          </Typography>
                          <Box width="5px" />
                          <Typography
                            fontWeight="700"
                            fontSize="14px"
                            color="#141522"
                          >
                            {employee?.attributes?.lastName}
                          </Typography>
                        </Box>
                        <Typography
                          fontWeight="400"
                          fontSize="12px"
                          color="#54577A"
                        >
                          {employee?.attributes?.position}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Box height="20px" />
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <Image
                        width="24px"
                        height="24px"
                        src="/static/tasks.png"
                      />
                      <Box width="8px" />
                      <Typography>
                        {employee?.attributes?.tasks?.data.length} Tasks
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight="500"
                      fontSize="14px"
                      color="#141522"
                    >
                      +2519 {employee?.attributes?.phone}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Box height="8px" />
        </Stack>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="700" fontSize="20px">
            Purchaser ({responsePurchaserDepartment?.data?.length})
          </Typography>
        </Box>
        <Box height="20px" />
        <Stack direction="row" justifyContent="space-between">
          {responsePurchaserDepartment?.data?.map((employee) => (
            <Paper
              elevation={0}
              sx={{
                paddingTop: "28px",
                paddingX: "24px",
                width: "328px",
                height: "140px",
                borderRadius: "10px",
              }}
            >
              <Stack>
                <Box display="flex" justifyContent="space-between">
                  <Box
                    display="flex"
                    justiyfContent="space-between"
                    alignItems="center"
                  >
                    <Avatar
                      sx={{ width: "48px", height: "48px" }}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                    />
                    <Box width="8px" />
                    <Stack>
                      <Box display="flex">
                        <Typography
                          fontWeight="700"
                          fontSize="14px"
                          color="#141522"
                        >
                          {employee?.attributes?.firstName}
                        </Typography>
                        <Box width="5px" />
                        <Typography
                          fontWeight="700"
                          fontSize="14px"
                          color="#141522"
                        >
                          {employee?.attributes?.lastName}
                        </Typography>
                      </Box>
                      <Typography
                        fontWeight="400"
                        fontSize="12px"
                        color="#54577A"
                      >
                        {employee?.attributes?.position}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
                <Box height="20px" />
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <Image width="24px" height="24px" src="/static/tasks.png" />
                    <Box width="8px" />
                    <Typography>
                      {employee?.attributes?.tasks?.data.length} Tasks
                    </Typography>
                  </Box>
                  <Typography fontWeight="500" fontSize="14px" color="#141522">
                    +2519 {employee?.attributes?.phone}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Box height="8px" />
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="700" fontSize="20px">
            Workshop ({responseWorkshopDepartment?.data?.length})
          </Typography>
        </Box>
        <Box height="20px" />
        <Stack direction="row" justifyContent="space-between">
          {responseWorkshopDepartment?.data?.map((employee) => (
            <Paper
              elevation={0}
              sx={{
                paddingTop: "28px",
                paddingX: "24px",
                width: "328px",
                height: "140px",
                borderRadius: "10px",
              }}
            >
              <Stack>
                <Box display="flex" justifyContent="space-between">
                  <Box
                    display="flex"
                    justiyfContent="space-between"
                    alignItems="center"
                  >
                    <Avatar
                      sx={{ width: "48px", height: "48px" }}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${employee?.attributes?.employeeImage?.data?.attributes?.url}`}
                    />
                    <Box width="8px" />
                    <Stack>
                      <Box display="flex">
                        <Typography
                          fontWeight="700"
                          fontSize="14px"
                          color="#141522"
                        >
                          {employee?.attributes?.firstName}
                        </Typography>
                        <Box width="5px" />
                        <Typography
                          fontWeight="700"
                          fontSize="14px"
                          color="#141522"
                        >
                          {employee?.attributes?.lastName}
                        </Typography>
                      </Box>
                      <Typography
                        fontWeight="400"
                        fontSize="12px"
                        color="#54577A"
                      >
                        {employee?.attributes?.position}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
                <Box height="20px" />
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <Image width="24px" height="24px" src="/static/tasks.png" />
                    <Box width="8px" />
                    <Typography>
                      {employee?.attributes?.tasks?.data.length} Tasks
                    </Typography>
                  </Box>
                  <Typography fontWeight="500" fontSize="14px" color="#141522">
                    +2519 {employee?.attributes?.phone}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Box height="8px" />
      </Paper>
    </>
  );
};

export default EmployeesSorted;
