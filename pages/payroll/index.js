import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import EmployeesLayout from "../../layout/employees";

const Payroll = () => {
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };

  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor="#F6F6F6"
        height="100vh"
      >
        <SideBar />
        <Stack
          paddingRight="55px"
          direction="column"
          width="80%"
          height="100vh"
        >
          <>
            <Navbar />
            <Box height="28px" />
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="700" fontSize="32px" color="#141522">
                Employee Payroll 2022
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
                  Add Pay Month
                </Typography>
              </Button>
            </Stack>
            <EmployeesLayout metric="Status" list="list" sortBy="Decline" />
            <Box height="11px" />
            <Typography fontWeight={700} fontSize={20}>
              {" "}
              Payroll List
            </Typography>
            <Box height="18px" />
          </>
        </Stack>
      </Stack>
    </>
  );
};

export default Payroll;
