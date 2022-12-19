import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  Card,
  CardContent,
  createTheme,
  Grid,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Layout from "../components/Layout";
import Left from "../components/Index/Left";
import Right from "../components/Index/Right";
import Login from "./login";
import {
  useFetchUser,
  useFetchUserDepartment,
  useUser,
} from "../components/lib/authContext";

export default function Home() {
  // const { user, userDepartment, loading } = useFetchUser();
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  console.log("the user is", user);
  console.log("the user department is", userDepartment);
  return (
    <Layout user={user} userDepartment={userDepartment}>
      <Head>
        <title>Frankcon ERP Design System</title>
        <meta name="description" content="Frankcon ERP" />
      </Head>
      {/* <Grid container>
				<Grid item md={3}>
					<SideBar />
				</Grid> 
				<Grid item md={9}>
					<Navbar />
					<Stack direction="row" gap="46px">
						<Left />
						<Right />
					</Stack>
				</Grid>
			</Grid> */}
      {!loading && !user ? (
        <>
          <Login />
        </>
      ) : (
        <Stack direction="row">
          {/* <SideBar />  */}
          <Stack direction="column" width="80%" height="100vh">
            {/* <Navbar /> */}
            <Box height="24px" />
            <Stack
              paddingLeft="48px"
              // paddingRight="60px"
              width="100%"
              height="100vh"
            >
              <Stack direction="row" gap="4px">
                <Typography fontSize="32px" fontWeight="700" color="#0F112E">
                  Good Morning{" "}
                </Typography>
                <Typography fontSize="32px" fontWeight="700" color="#4339F2">
                  {" "}
                  {user},
                </Typography>
              </Stack>
              <Typography fontSize="16px" fontWeight="400" color="#6F7082">
                Please manage your inventory and upcoming tasks and projects.
              </Typography>
              <Box height="32px" />
              <Stack direction="row" gap="12px">
                <Card
                  sx={{
                    width: "352px",
                    height: "170px",
                    p: 0,
                    borderRadius: "10px",
                  }}
                >
                  <CardContent sx={{ px: "24px" }}>
                    {/* <Box> */}
                    <Typography
                      fontWeight="700px"
                      fontSize="48px"
                      color="#F35B05"
                      // sx={{ p: 0 }}
                    >
                      32
                    </Typography>
                    {/* </Box> */}
                    {/* <Box height="12px" /> */}
                    <Typography fontWeight="500px" fontSize="20px">
                      Pending Approvals
                    </Typography>
                    {/* <Box height="8px" /> */}

                    <Typography
                      // sx={{ p: 0 }}
                      fontWeight="400px"
                      fontSize="12px"
                      lineHeight="14px"
                    >
                      This number is for pending approval on purchase orders,
                      leave requests, and more.
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "352px",
                    height: "170px",
                    p: 0,
                    borderRadius: "10px",
                  }}
                >
                  <CardContent sx={{ px: "24px" }}>
                    {/* <Box> */}
                    <Typography
                      fontWeight="700px"
                      fontSize="48px"
                      color="#F35B05"
                      // sx={{ p: 0 }}
                    >
                      4
                    </Typography>
                    {/* </Box> */}
                    {/* <Box height="12px" /> */}
                    <Typography fontWeight="500px" fontSize="20px">
                      Ongoing Tasks
                    </Typography>
                    {/* <Box height="8px" /> */}

                    <Typography
                      // sx={{ p: 0 }}
                      fontWeight="400px"
                      fontSize="12px"
                      lineHeight="14px"
                    >
                      This number is for upcoming approval on purchase orders,
                      leave requests, and more tasks.
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "352px",
                    height: "170px",
                    p: 0,
                    borderRadius: "10px",
                  }}
                >
                  <CardContent>
                    {/* <Box> */}
                    <Typography
                      fontWeight="700px"
                      fontSize="48px"
                      color="#F35B05"
                      // sx={{ p: 0 }}
                    >
                      8
                    </Typography>
                    {/* </Box> */}
                    {/* <Box height="12px" /> */}
                    <Typography fontWeight="500px" fontSize="20px">
                      Purchase Orders
                    </Typography>
                    {/* <Box height="8px" /> */}

                    <Typography
                      // sx={{ p: 0 }}
                      fontWeight="400px"
                      fontSize="12px"
                      lineHeight="14px"
                    >
                      This number is for pending approval on purchase orders,
                      leave requests, and more.
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Layout>
  );
}
