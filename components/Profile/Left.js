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

const Left = () => {
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
					{
						props: {
							variant: "h6B",
						},
						style: {
							fontSize: 14,
							fontWeight: 500,
							color: "#0F112E",
						},
					},
				],
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>
				<Box marginLeft="4px" marginRight="50px">
					<Typography variant="h4">My Profile</Typography>
					<Box width="464px" paddingTop="36px" display="flex">
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
					<Box paddingTop="32px" display="flex" alignItems="center">
						<Typography paddingRight="20px">Profile Detail</Typography>
						<Divider width="70%" />
					</Box>
					<Box display="flex">
						<Box paddingTop="20px">
							<Typography variant="h6">Email Address</Typography>
							<Typography variant="h6B">Abeba.desalegn@frankcon.com</Typography>
						</Box>
						<Box paddingTop="20px">
							<Box paddingLeft="75px">
								<Typography variant="h6">Phone Number</Typography>
								<Typography variant="h6B">+251 922 334 455</Typography>
							</Box>
						</Box>
					</Box>
					<Box display="flex">
						<Box paddingTop="20px">
							<Typography variant="h6"> Address</Typography>
							<Typography variant="h6B">Abeba.desalegn@frankcon.com</Typography>
						</Box>
						<Box paddingTop="20px">
							<Box paddingLeft="75px">
								<Typography variant="h6">Addis Ababa, Ethiopia</Typography>
								<Typography variant="h6B">14 August 1988</Typography>
							</Box>
						</Box>
					</Box>
					<Box paddingTop="32px" display="flex" alignItems="center">
						<Typography paddingRight="20px">Profile Activity</Typography>
						<Divider width="70%" />
					</Box>
					<Box display="flex">
						<Box paddingTop="20px">
							<Typography variant="h6">Department</Typography>
							<Typography variant="h6B">Design and Development</Typography>
						</Box>
						<Box paddingTop="20px">
							<Box paddingLeft="75px">
								<Typography variant="h6">Position</Typography>
								<Typography variant="h6B">Interior Designer</Typography>
							</Box>
						</Box>
					</Box>
					<Box display="flex">
						<Box paddingTop="20px">
							<Typography variant="h6">Active Since</Typography>
							<Typography variant="h6B">16 September 2019, 6:30PM</Typography>
						</Box>
						<Box paddingTop="20px">
							<Box paddingLeft="104px">
								<Typography variant="h6">Days Active</Typography>
								<Typography variant="h6B">36 Mons 24 Dys</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</ThemeProvider>
		</>
	);
};

export default Left;
