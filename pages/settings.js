import { Box, Stack } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import Settings from "../components/Settings";
import SideBar from "../components/SideBar";

const SettingsPage = () => {
	return (
		<>
			<Stack
				direction="row"
				// justifyContent="space-between"
				bgcolor="#F6F6F6"
				height="100vh"
			>
				<>
					<SideBar />
					<Stack direction="column" width="80%" height="100vh">
						<Navbar />
						<Settings />
					</Stack>
				</>
			</Stack>
		</>
	);
};

export default SettingsPage;
