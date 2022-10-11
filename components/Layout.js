import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";

const Layout = ({ children }) => (
	<>
		<Stack direction="row" spacing={0}>
			<SideBar />
			<Stack direction="column" spacing={2} >
				{/* <Navbar /> */}

				{children}
			</Stack>
		</Stack>
	</>
);

export default Layout;
