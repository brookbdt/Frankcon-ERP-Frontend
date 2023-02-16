import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import { Container } from "@mui/system";
import Left from "../components/Profile/Left";
import Right from "../components/Profile/Right";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { fetcher } from "../lib/api";
import { readNotification } from "../lib";
import { useEffect, useState } from "react";

const profile = () => {
  const [jwt, setJwt] = useState(null);

  const [response, setResponse] = useState([]);

  useEffect(() => {
    console.log(1, "params console is");

    const jwt = getTokenFromLocalCookie();

    console.log(2, "end", { jwt });

    setJwt(jwt);

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("index response is", { response });
  }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor="#F6F6F6"
        height="100vh"
      >
        <SideBar />
        <Stack direction="column" width="80%" height="100vh">
          <>
            <Navbar />
            <Stack direction="row">
              <Left jwt={jwt} />
              <Right jwt={jwt} />
            </Stack>
            {/* <Grid container>
							<Grid item xs={5}>
							</Grid>
							<Grid item xs={7}>
							</Grid>
						</Grid> */}
            {/* <Profile /> */}
          </>
          {/* <Box paddingX="48px"> */}
          {/* </Box> */}
        </Stack>
      </Stack>
    </>
  );
};

export default profile;
