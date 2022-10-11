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

const profile = () => {
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
							<Left />
							<Right />
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
