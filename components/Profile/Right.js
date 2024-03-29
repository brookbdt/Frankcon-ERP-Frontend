import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Stack } from "@mui/system";
import styled from "@emotion/styled";
import Image from "next/image";
import { useFetchUser } from "../../lib/authContext";
import { readEmployeeTodoTask } from "../../lib";

const Right = ({ jwt }) => {
  const StyledTypoGrey = styled(Typography)({
    color: "#6F7082",
    fontSize: "8px",
    fontWeight: "800",
  });
  const StyledTypoOrange = styled(Typography)({
    color: "#F35B05",
    fontSize: "8px",
    fontWeight: "800",
  });

  const { user, loading } = useFetchUser();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }

      const result = await readEmployeeTodoTask(jwt, user);
      setResponse(result.data);
    };
    // randomId;
    fetchData();
  }, [user]);

  return (
    <Box
      paddingRight="104px"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Box minHeight="180px"></Box>
      <Stack
        gap="24px"
        width="100%"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Box width="50%" display="flex" flexDirection="column">
          <Box
            justifyContent="space-between"
            display="flex"
            flexDirection="row"
          >
            <Box display="flex" flexDirection="row">
              <Typography>Backlog Tasks</Typography>
              <Box
                marginLeft="12px"
                paddingLeft="8px"
                bgcolor="#F35B051A"
                flexDirection="row"
                // padding="50%"
                width="24px"
                height="24px"
                borderRadius="50%"
              >
                <Typography
                  color="#F35B05"
                  alignItems="center"
                  justifyContent="center"
                >
                  5
                </Typography>
              </Box>
            </Box>
            <Box>
              <MoreHorizIcon />
            </Box>
          </Box>
          <Box marginTop="32px">
            <Paper sx={{ padding: "20px", borderRadius: "8px" }}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography>Model Answer</Typography>
                </Box>
                <Stack gap={1} direction="row">
                  <InsertDriveFileIcon color="#F35B05" />
                  <Typography color="#F35B05">4</Typography>
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
                    <StyledTypoOrange>Design</StyledTypoOrange>
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
                    <StyledTypoOrange>Backlog</StyledTypoOrange>
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
                  <Box></Box>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Box>
        <Box width="50%" display="flex" flexDirection="column">
          <Box
            justifyContent="space-between"
            display="flex"
            flexDirection="row"
          >
            <Box display="flex" flexDirection="row">
              <Typography>To Do Tasks</Typography>
              <Box
                marginLeft="12px"
                paddingLeft="8px"
                bgcolor="#F35B051A"
                flexDirection="row"
                // padding="50%"
                width="24px"
                height="24px"
                borderRadius="50%"
              >
                <Typography alignItems="center" justifyContent="center">
                  3
                </Typography>
              </Box>
            </Box>
            <Box>
              <MoreHorizIcon />
            </Box>
          </Box>
          <Box height="32px" />
          {response?.data?.map((todo) => (
            <>
              <Paper sx={{ padding: "20px", borderRadius: "8px" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography>{todo?.attributes?.title}</Typography>
                  </Box>
                  <Stack gap={1} direction="row">
                    <InsertDriveFileIcon color="#F35B05" />
                    <Typography color="#F35B05">4</Typography>
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
                      <StyledTypoOrange>Design</StyledTypoOrange>
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
                      <StyledTypoOrange>Backlog</StyledTypoOrange>
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
              <Box height="16px" />
            </>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default Right;
