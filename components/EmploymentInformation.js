import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const EmploymentInformation = ({ response }) => {
  dayjs.extend(relativeTime);
  return (
    <Stack paddingX="18px">
      <Typography fontWeight="700" fontSize="18px">
        Employment Information
      </Typography>
      <Box height="16px" />
      <Box display="flex" justifyContent="space-between">
        <Stack>
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Department
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {response?.data?.attributes?.department}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Employment Type
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {response?.data?.attributes?.employmentType}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Active Since
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {dayjs(response?.data?.attributes?.employmentDate).format(
              "DD MMMM YYYY"
            )}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Remaining Leave Days
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            TODO
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Monthly Gross Salary
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            ETB {response?.data?.attributes?.employeeGrossSalary}
          </Typography>
        </Stack>
        <Box width="45px" />
        <Stack>
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Position
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {response?.data?.attributes?.position}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            TIN NUMBER
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            TODO
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Total Present Days
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            TODO
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Total Absent Days
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            TODO
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Monthly Net Salary
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            ETB {response?.data?.attributes?.employeeNetSalary}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default EmploymentInformation;
