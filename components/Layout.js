import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { UserProvider } from "./lib/authContext";
import Head from "next/head";

const Layout = ({ user, loading = false, children }) => (
	<UserProvider value={{ user, loading }}>
		<Head>
			<title>Frankcon ERP Design System</title>
			<meta name="description" content="Generated by create next app" />
		</Head>
		<Stack direction="row" spacing={0}>
			<SideBar />
			<Stack
				direction="column"
				width="1200px"
				// paddingLeft="48px"
				paddingRight="48px"
				spacing={2}
			>
				<Navbar />

				{children}
			</Stack>
		</Stack>
	</UserProvider>
);

export default Layout;
