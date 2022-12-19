import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import React from "react";
import Employees from "../pages/employees";

const EmployeesLayout = ({ children, sortBy, list, metric }) => {
  //   const sortBy = props.sortBy;
  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          backgroundColor: "white",
          width: "100%",
          height: "52px",
          border: "1px solid #F5F5F7",
          marginTop: "30px",
        }}
      >
        <Stack direction="row">
          <OutlinedInput
            label="Search Task"
            sx={{ width: "455px", height: "52px" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <Image src="/static/search.png" width="20px" height="20px" />
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>

          <Stack direction="row" justifyContent="space-between">
            <Box width="88px" />
            <Box>
              <Button
                sx={{
                  height: "52px",
                  width: "149px",
                  // backgroundColor: "#F5F5F7",
                  color: "black",
                  // marginLeft: "88px",
                  borderRadius: "10px",
                  border: "1px solid #F5F5F7",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="600" fontSize="12px">
                  {metric}
                </Typography>
              </Button>
            </Box>
            <Box>
              <Link href="/tasks/grid" underline="none">
                <Button
                  sx={{
                    height: "52px",
                    width: "149px",

                    // backgroundColor: "#F5F5F7",
                    color: "black",
                    borderRadius: "10px",
                    border: "1px solid #F5F5F7",
                    marginLeft: "24px",
                  }}
                >
                  <Box>
                    <Typography
                      fontWeight="600"
                      fontSize="12px"
                      paddingX="28px"
                      paddingY="14px"
                    >
                      View: {list}
                    </Typography>
                  </Box>
                </Button>
              </Link>
            </Box>

            <Box>
              <Button
                sx={{
                  height: "52px",
                  // backgroundColor: "#F5F5F7",
                  color: "black",
                  borderRadius: "10px",
                  border: "1px solid #F5F5F7",
                  marginLeft: "24px",
                  width: "196px",
                  height: "52px",
                }}
              >
                <Typography
                  fontWeight="600"
                  variant="p"
                  fontSize="12px"
                  paddingX="28px"
                  paddingY="14px"
                >
                  SortBy: {sortBy}
                </Typography>
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {children}
    </>
  );
};

export default EmployeesLayout;
