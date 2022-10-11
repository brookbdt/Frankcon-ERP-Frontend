import {
	Avatar,
	Box,
	Card,
	Divider,
	makeStyles,
	Paper,
	Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const Profile = () => {
	const theme = createTheme({
		components: {
			MuiTypography: {
				variants: [
					{
						props: {
							variant: "h6",
						},
						style: {
							fontSize: 14,
							fontWeight: 400,
							color: "#6F7082",
						},
					},
				],
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>
				<Box marginX="48px">
					<Typography variant="h4">My Profile</Typography>
					<Box paddingTop="36px" display="flex">
						<Avatar
							src="/static/Avatar.png"
							sx={{ width: 56, height: 56 }}
						></Avatar>
						<Box marginX="25px">
							<Paper
								elevation={0}
								variant="plain"
								sx={{ backgroundColor: "#F6F6F6" }}
							>
								<Typography fontSize="18px" fontWeight="500">
									Abeba Desalegn
								</Typography>
								<Typography variant="h6">Interior Designer</Typography>
							</Paper>
						</Box>
						<Box marginX="25px">
							<Paper
								elevation={0}
								variant="plain"
								sx={{ backgroundColor: "#F6F6F6" }}
							>
								<Typography variant="h6"> Employee ID Number</Typography>
								<Typography fontSize="16px" fontWeight="500">
									Abeba Desalegn
								</Typography>
							</Paper>
						</Box>
					</Box>
					<Box paddingTop="32px" display="flex">
						<Typography>Profile Detail</Typography>
						<Divider width="80%" />
					</Box>
				</Box>
			</ThemeProvider>
		</>
	);
};

export default Profile;
