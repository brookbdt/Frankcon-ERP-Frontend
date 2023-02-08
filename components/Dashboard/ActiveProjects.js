import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFetchUser } from "../../lib/authContext";
import { readProject } from "../../pages/api";
import Link from "next/link";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const ActiveProjects = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }

      const result = await readProject(jwt, user);
      console.log({ jwt });
      setResponse(result.data);
      console.log("relation is:", response);
    };
    // randomId;
    fetchData();
  }, [user]);
  return (
    <Box paddingRight="16px">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="306px"
      >
        <Typography fontWeight="500">Active Projects</Typography>
        <Link href="/projects">
          <Button sx={{ color: "#9FA0AB", fontSize: "10px" }}>
            VIEW ALL PROJECTS
          </Button>
        </Link>
      </Stack>
      <Box height="8px" />
      <Divider
        sx={{
          backgroundColor: "#E7E7EA",
          borderBottomWidth: "2px",
          width: "100%",
        }}
      />
      {/* <Box height="12px" /> */}
      <Paper elevation={0} sx={{ maxHeight: "345px", overflow: "auto" }}>
        {response?.data?.map((project, index) => (
          <Stack>
            <Box height="12px" />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" justifyContent="space-between">
                <Avatar
                  // src={project?.attributes?.projectImage.data?.attributes?.url}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${project?.attributes?.projectImage.data?.[0].attributes?.url}`}
                  alt="project image"
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <Box width="8px" />
                <Stack direction="column" justifyContent="center">
                  <Typography fontWeight="700" fontSize="14px">
                    {project?.attributes?.projectTitle}
                  </Typography>
                  <Typography fontWeight="400" fontSize="10px" color="#6F7082">
                    {dayjs(project?.attributes?.projectStartDate).format(
                      "DD MMM, YYYY"
                    )}
                  </Typography>
                </Stack>
              </Stack>
              <Link href="/projects/[id]" as={`/projects/${project.id}`}>
                <Box
                  width="20px"
                  height="20px"
                  bgcolor="#F6F6F6"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <KeyboardDoubleArrowRightIcon
                    sx={{ color: "#6F7081", width: "10px", height: "10px" }}
                  />
                </Box>
              </Link>
            </Stack>
            <Box height="6px" />
            <Divider
              width="306px"
              sx={{ borderBottomWidth: "1px", backgroundColor: "#F6F6F6" }}
            />
          </Stack>
        ))}
      </Paper>
    </Box>
  );
};

export default ActiveProjects;
