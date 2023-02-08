import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const ProfileDetail = ({ response }) => {
  dayjs.extend(relativeTime);

  return (
    <Stack>
      <Typography fontWeight="700" fontSize="18px">
        Profile Detail
      </Typography>
      <Box height="16px" />
      <Box display="flex" justifyContent="space-between" paddingRight="26px">
        <Stack>
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Email Address
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {response?.data?.attributes?.email}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Employee ID
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {response?.data?.attributes?.employeeId}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Physical Address
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {response?.data?.attributes?.address}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Woreda
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            TODO
          </Typography>
        </Stack>
        <Box width="51px" />
        <Stack>
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Phone Number
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            +2519 {response?.data?.attributes?.phone}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Date of Birth
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            {dayjs(response?.data?.attributes?.dateOfBirth).format(
              "DD MMMM YYYY"
            )}
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            Sub-City/Zone
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            TODO
          </Typography>
          <Box height="16px" />
          <Typography fontWeight="400" fontSize="14px" color="#6F7082">
            House Number
          </Typography>
          <Typography fontWeight="500" fontSize="14px">
            TODO
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileDetail;
