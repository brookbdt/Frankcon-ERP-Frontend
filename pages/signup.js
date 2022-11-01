import React, { useState } from "react";
import {
	Box,
	Button,
	Checkbox,
	createTheme,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	ThemeProvider,
	Typography,
} from "@mui/material";
import Image from "next/image";
import {
	SettingsSystemDaydreamTwoTone,
	Visibility,
	VisibilityOff,
} from "@mui/icons-material";

const Signup = () => {
	const [values, setValues] = useState({
		showPassword: false,
	});

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

	// const handleChange = (prop) => (event) => {
	// 	setValues({ ...values, [prop]: event.target.value });
	// };

	const [data, setData] = useState({
		identifier: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
			{
				method: "POST",
				header: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					identifier: data.identifier,
					password: data.password,
				}),
			}
		);
	};
	const handleChange = (e) => {
		// SettingsSystemDaydreamTwoTone({ ...data, [e.target.name]: e.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<Box display="flex">
			<Image src="/static/signup.png" width={864} height={900}></Image>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				paddingLeft="72px"
				paddingRight="71px"
			>
				<Box>
					<Typography fontWeight="700" fontSize="48px">
						Hello there!
					</Typography>
					<Typography fontWeight="400" fontSize="16px">
						Please signup to create your Frankcon account.
					</Typography>
					<Box display="flex">
						<FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-name">
								First Name
							</InputLabel>
							<OutlinedInput width="100%" label="First Name" />
						</FormControl>
						<FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-name">
								Last Name
							</InputLabel>
							<OutlinedInput width="100%" label="Last Name" />
						</FormControl>
					</Box>
					<FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
						<InputLabel
							
							name="identifier"
							onChange={handleChange}
							htmlFor="outlined-adornment-password"
						>
							Email
						</InputLabel>
						<OutlinedInput name="password" width="100%" label="Password" />
					</FormControl>
					<FormControl sx={{ m: 1, width: "100%" }}>
						<TextField
							label="With normal TextField"
							id="outlined-start-adornment"
							sx={{ m: 1, width: "25ch" }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">+251</InputAdornment>
								),
							}}
						/>
					</FormControl>

					<Box width="100%" display="flex" alignItems="center">
						<Box paddingRight="0px">
							<FormGroup>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label="I’ve read and agree to the"
								/>
							</FormGroup>
						</Box>
						<Box marginLeft="0px">
							<Typography>Terms and Conditions.</Typography>
						</Box>
						<Box>
							<Typography>Reset</Typography>
						</Box>
					</Box>
					<ThemeProvider theme={theme}>
						<Box
							display="flex"
							justifyContent="flex-end"
							alignItems="flex-start"
							bgcolor="#4339F2"
							width="fit-content"
							marginTop="36px"
						>
							{/* <Button color="main">Mark as Read</Button> */}
							<Button
							// onClick={handleOpen}
							>
								<Typography
									paddingY="13.5px"
									paddingX="44.5px"
									variant="p"
									fontSize="14px"
									color="white"
								>
									Create Account
								</Typography>
							</Button>
						</Box>
						<Box display="flex" justifyContent="center" alignItems="center">
							<Typography>You already have an account, </Typography>
							<Button
								// onClick={handleOpen}
								color="primary"
							>
								Signin here!
							</Button>
						</Box>
					</ThemeProvider>
				</Box>
			</Box>
		</Box>
	);
};

export default Signup;
