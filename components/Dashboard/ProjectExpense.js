import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFetchUser } from "../../lib/authContext";
import { readAllProjects, readProject } from "../../lib";
import { makeStyles } from '@mui/styles';

const ProjectExpense = ({ jwt }) => {
  const [projects, setProjects] = useState([]);
  const { user, loading } = useFetchUser();
  const progress = (projects?.data?.attributes?.ProjectExpense / projects?.data?.attributes?.projectBudget) * 100;

  useEffect(() => {
    const fetchData = async () => {
      // const employeeResult = await readEmployee(jwt);
      // setEmployeeResponse(employeeResult.data);
      if (!user) {
        return;
      }
      const result = await readAllProjects(jwt, user);
      setProjects(result.data);
      // console.log({response})
    };
    // console.log("the jwt is", jwt);
    fetchData();
    // console.log("relation is:", response?.attributes?.tasks);

  }, [user]);



  const useStyles = makeStyles((theme) => ({
    root: {
      height: 8,
      borderRadius: 71.5,
    },
    "MuiLinearProgress-root": (props) => ({
      backgroundColor: props.color,
    }),
    bar: (props) => ({
      height: 8,
      borderRadius: 71.5,
      backgroundColor: colors[props.index % colors.length],

    }),
  }));




  function ProjectBudgetProgressBar({ budget, withdrawnAmount, color }) {
    const progress = (withdrawnAmount / budget) * 100;
    // const progressBarStyle = { backgroundColor: color };
    const classes = useStyles({ color });
    console.log({ color })
    return (
      <LinearProgress
        variant="determinate"
        value={progress}
        // style={progressBarStyle}
        classes={classes}
        // style={{ backgroundColor: `rgb(${color},0.4)` }}
        sx={{
          backgroundColor: `rgb(${color},0.4)`,
          "& .MuiLinearProgress-bar": {
            backgroundColor: `rgb(${color})`
          }
        }}
      // sx={{
      //   '&::before': { color: 'red !important' }
      // }}
      />
    );
  }


  function ProjectBudgetProgressBars({ projects, colors }) {
    return (
      <div>
        {projects?.data?.map((project, index) => (
          <div key={project.id}>
            <Box display="flex" justifyContent="space-between">
              <Typography fontSize="14px">{project.attributes?.projectTitle}</Typography>
              <Typography color={`rgb(${colors[index]})`}>BR {project.attributes?.projectExpense}</Typography>
            </Box>
            <ProjectBudgetProgressBar
              budget={parseInt(project.attributes?.projectBudget?.replace(/,/g, ''))}
              withdrawnAmount={parseInt(project.attributes?.projectExpense?.replace(/,/g, ''))}
              color={(colors[index])}



            />
            <Box height="24px" />
          </div>
        ))}
      </div>
    );
  }

  const colors = ['255, 178, 2', '67, 57, 242', '1, 160, 252', '255, 58, 42'];

  return (
    <Box paddingRight="16px" paddingBottom="16px">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="306px"
      >
        <Typography fontWeight="500">Project Expense</Typography>
        <Link href="/projects">
          <Button sx={{ color: "#9FA0AB", fontSize: "10px" }}>
            VIEW ALL EXPENSES
          </Button>
        </Link>
      </Stack>
      <Box height="8px" />
      <Divider sx={{ backgroundColor: "#E7E7EA", borderBottomWidth: "2px" }} />
      <Box height="16px" />
      <Typography color="#999999" fontWeight="400" fontSize="14px">
        Get the highlight of your ongoing project cost and expenses here.
      </Typography>
      <Box height="17px" />
      <ProjectBudgetProgressBars projects={projects} colors={colors} />
    </Box>
  );
};

export default ProjectExpense;
