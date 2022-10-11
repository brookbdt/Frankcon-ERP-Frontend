import {
	Avatar,
	Backdrop,
	Box,
	Button,
	createTheme,
	Divider,
	Fade,
	FormControlLabel,
	Modal,
	Paper,
	Switch,
	ThemeProvider,
	Typography,
} from "@mui/material";
import React, { useState } from "react";

const Settings = () => {
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	function handleClick() {
		setLoading(true);
	}
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 750,
		bgcolor: "background.paper",
		borderRadius: "8px",
		p: 4,
	};
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
			palette: {
				primary: {
					main: "#2557E3",
					darker: "#053e85",
				},
				neutral: {
					main: "#4339F2",
					contrastText: "#fff",
				},
			},
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<Box paddingLeft="48px" maxWidth="50%">
				<Box paddingTop="27px" paddingBottom="47px">
					<Typography fontSize="32px" fontWeight="700">
						My Settings
					</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Avatar
						src="/static/Avatar.png"
						sx={{ width: 56, height: 56 }}
					></Avatar>
					<Box sx={{ paddingX: "0px" }}>
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
					<Box marginX="68px">
						<Paper
							elevation={0}
							variant="plain"
							sx={{ backgroundColor: "#F6F6F6" }}
						>
							<Typography variant="h6"> Employee ID Number</Typography>
							<Typography fontSize="16px" fontWeight="500">
								EM154-118
							</Typography>
						</Paper>
					</Box>
				</Box>
				<Box paddingTop="32px" display="flex" alignItems="center">
					<Typography paddingRight="15px">Authentication</Typography>
					<Divider width="65%" />
				</Box>
				<Box
					maxWidth="80%"
					paddingTop="20px"
					display="flex"
					justifyContent="space-between"
				>
					<Box>
						<Paper
							elevation={0}
							variant="plain"
							sx={{ backgroundColor: "#F6F6F6" }}
						>
							<Typography variant="h6"> Email Address</Typography>
							<Typography fontSize="16px" fontWeight="500">
								Abeba.desalegn@frankcon.com
							</Typography>
						</Paper>
					</Box>
					<Box>
						<Paper
							elevation={0}
							variant="plain"
							sx={{ backgroundColor: "#F6F6F6" }}
						>
							<Typography variant="h6"> Password</Typography>
							<Typography fontSize="16px" fontWeight="500">
								**************
							</Typography>
						</Paper>
					</Box>
				</Box>
				<Box paddingTop="32px" display="flex" alignItems="center">
					<Typography paddingRight="15px">Notifications</Typography>
					<Divider width="65%" />
				</Box>
				<Box>
					<FormControlLabel
						sx={{
							display: "block",
						}}
						control={
							<Switch
								checked={loading}
								onChange={() => setLoading(!loading)}
								name="Recieve pop-up notifications"
								color="primary"
							/>
						}
						label="Recieve pop-up notifications"
					/>
					<FormControlLabel
						sx={{
							display: "block",
						}}
						control={
							<Switch
								checked={loading}
								onChange={() => setLoading(!loading)}
								name="Recieve notifications via email"
								color="primary"
							/>
						}
						label="Sound-on for notifications"
					/>
					<FormControlLabel
						sx={{
							display: "block",
						}}
						control={
							<Switch
								checked={loading}
								onChange={() => setLoading(!loading)}
								name="Recieve pop-up notifications"
								color="primary"
							/>
						}
						label="Recieve SMS notifications"
					/>
					<FormControlLabel
						sx={{
							display: "block",
						}}
						control={
							<Switch
								checked={loading}
								onChange={() => setLoading(!loading)}
								name="Recieve pop-up notifications"
								color="primary"
							/>
						}
						label="Recieve pop-up notifications"
					/>
				</Box>
				<Box paddingTop="32px" display="flex" alignItems="center">
					<Typography paddingRight="15px">Personal Data</Typography>
					<Divider width="65%" />
				</Box>
				<Box>
					<FormControlLabel
						sx={{
							display: "block",
						}}
						control={
							<Switch
								checked={loading}
								onChange={() => setLoading(!loading)}
								name="Recieve pop-up notifications"
								color="primary"
							/>
						}
						label="Recieve pop-up notifications"
					/>
					<FormControlLabel
						sx={{
							display: "block",
						}}
						control={
							<Switch
								checked={loading}
								onChange={() => setLoading(!loading)}
								name="Recieve notifications via email"
								color="primary"
							/>
						}
						label="Sound-on for notifications"
					/>
				</Box>
				<Box display="flex" alignItems="center">
					<Typography>Read the </Typography>
					<Button onClick={handleOpen} color="primary">
						Terms and Conditions
					</Button>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<Box sx={style}>
								<Typography
									id="transition-modal-title"
									fontWeight="600"
									fontSize="20px"
								>
									Terms and agreements
								</Typography>
								<Typography
									fontSize="14px"
									fontWeight="400"
									color="#6F7082"
									id="transition-modal-description"
									sx={{ mt: 2 }}
								>
									Commodo eget a et dignissim dignissim morbi vitae, mi. Mi
									aliquam sit ultrices enim cursus. Leo sapien, pretium duis est
									eu volutpat interdum eu non. Odio eget nullam elit laoreet.
									Libero at felis nam at orci venenatis rutrum nunc. Etiam
									mattis ornare pellentesque iaculis enim.
								</Typography>
								<Typography
									fontSize="14px"
									fontWeight="400"
									color="#6F7082"
									paddingTop="30px"
								>
									Felis eu non in aliquam egestas placerat. Eget maecenas ornare
									venenatis lacus nunc, sit arcu. Nam pharetra faucibus eget
									facilisis pulvinar eu sapien turpis at. Nec aliquam aliquam
									blandit eu ipsum.
								</Typography>
								<Box
									display="flex"
									justifyContent="flex-end"
									alignItems="flex-start"
									bgcolor="#4339F2"
									width="fit-content"
									marginTop="36px"
								>
									{/* <Button color="main">Mark as Read</Button> */}
									<Button onClick={handleOpen}>
										<Typography
											paddingY="13.5px"
											paddingX="44.5px"
											variant="p"
											fontSize="14px"
											color="white"
										>
											Mark as Read
										</Typography>
									</Button>
								</Box>
							</Box>
						</Fade>
					</Modal>
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default Settings;
