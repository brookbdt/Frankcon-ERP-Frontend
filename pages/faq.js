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
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Layout from "../components/Layout";
import Left from "../components/Index/Left";
import Right from "../components/Index/Right";

export default function Home() {
	return (
		<Layout>
			
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

			
					<Stack direction="row" gap="46px">
						<Left />
						<Right />
					</Stack>
		</Layout>
	);
}
