import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	ButtonGroup,
	Divider,
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers";
import { createEmployee, readEmployee } from "../pages/api";
import EmployeesLayout from "../layout/employees";

const Employees = () => {
	const handleSlide = () => {
		setChecked((prev) => !prev);
	};
	const [checked, setChecked] = React.useState(false);

	const [value, setValue] = React.useState(dayjs(new Date()));
	const [selected, setSelected] = useState([]);

	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [dateofbirth, setDateOfBirth] = useState("");
	const [address, setAddress] = useState("");
	const [employmentDate, setEmploymentDate] = useState("");
	const [department, setDepartment] = useState("");
	const [position, setPosition] = useState("");
	const [employmentType, setEmploymentType] = useState("");

	const currentDate = value == null ? "" : value.toString();

	const sendEmployee = () => {
		const newEmployee = {
			// Title: name,
			// data: { faq },
			// title: title,
			// description: description,
			// comment: comment,
			// title: data.title,
			data: {
				// tasks: {
				firstname,
				lastname,
				email,
				phone,
				dateofbirth,
				address,
				employmentDate,
				department,
				position,
				employmentType,

				// },
			},
		};
		createEmployee(newEmployee);
		console.log(newEmployee);
	};

	const [response, setResponse] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await readEmployee();
			setResponse(result.data);
		};
		fetchData();
	}, []);
	const columns = [
		{ id: "task details", label: "Task Details", minWidth: 170 },
		{
			id: "task status",
			label: "Task Status",
			// minWidth: 170,
			// align: "right",
			format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "date",
			label: "Date",
			// minWidth: 170,
			// align: "right",
			format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "priority",
			label: "Priority",
			// minWidth: 170,
			// align: "right",
			format: (value) => value.toFixed(2),
		},
	];

	const addEmployee = (
		<Paper sx={{ m: 1, zIndex: 1 }} elevation={4}>
			<Box
				sx={{
					width: "568px",
					height: "591px",
					paddingX: "24px",
					paddingTop: "15px",
				}}
			>
				<Stack direction="column">
					<Typography fontWeight="700" fontSize="20px" marginBottom="11px">
						Add New Employee
					</Typography>
					<Stack direction="row" justifyContent="space-between">
						<Stack direction="row" gap="24px" alignItems="center">
							<Button sx={{ width: 0, height: 0, padding: 0, margin: 0 }}>
								<Avatar sx={{ width: "52px", height: "52px" }} />
							</Button>
							<Stack>
								<Typography sx={{ color: "#4339F2" }}>
									Image Upload - 98%
								</Typography>
								<Typography sx={{ color: "#6F7082", fontWeight: "400" }}>
									Select avatar or upload image
								</Typography>
							</Stack>
						</Stack>
						<Stack sx={{ textAlign: "right" }}>
							<Typography
								sx={{ color: "#3F4158", fontSize: "14px", fontWeight: "700" }}
							>
								Employee ID
							</Typography>
							<Typography sx={{ color: "#6F7082", fontSize: "14px" }}>
								#EM145 - 248
							</Typography>
						</Stack>
					</Stack>
					<Box height="16px"></Box>
					<Stack direction="row" justifyContent="space-between">
						<Typography
							sx={{ fontSize: "14px", fontWeight: "500", color: "#3F4158" }}
						>
							Employee Detail
						</Typography>
						<Divider sx={{ width: "400px", alignSelf: "center" }} />
					</Stack>
					<Box height="15px"></Box>
					<Stack direction="column" gap="16px">
						<Stack direction="row" gap="24px">
							<FormControl variant="filled">
								<TextField
									value={firstname}
									htmlFor="component-filled"
									label="First Name"
									size="small"
									sx={{
										width: "248px",
										"& .MuiInputBase-root": {
											height: "46px",
										},
									}}
									defaultValue="Employee first name"
									variant="filled"
									onChange={(e) => setFirstname(e.target.value)}
								></TextField>
							</FormControl>
							<FormControl variant="filled">
								<TextField
									value={lastname}
									htmlFor="component-filled"
									label="Last Name"
									sx={{
										width: "248px",
										"& .MuiInputBase-root": {
											height: "46px",
										},
									}}
									defaultValue="Employee last name"
									size="small"
									variant="filled"
									onChange={(e) => setLastname(e.target.value)}
								></TextField>
							</FormControl>
						</Stack>
						<Stack direction="row" gap="24px">
							<FormControl variant="filled">
								<TextField
									value={email}
									htmlFor="component-filled"
									label="Email Address"
									sx={{
										width: "248px",
										"& .MuiInputBase-root": {
											height: "46px",
										},
									}}
									size="small"
									defaultValue="Employee email address"
									variant="filled"
									onChange={(e) => setEmail(e.target.value)}
								></TextField>
							</FormControl>
							<FormControl variant="filled">
								<TextField
									value={phone}
									htmlFor="component-filled"
									label="Phone Number"
									size="small"
									sx={{
										width: "248px",
										"& .MuiInputBase-root": {
											height: "46px",
										},
									}}
									defaultValue="00 112 233"
									variant="filled"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">+251 9</InputAdornment>
										),
									}}
									onChange={(e) => setPhone(e.target.value)}
								></TextField>
							</FormControl>
						</Stack>
						<Stack direction="row" gap="24px">
							<Box sx={{ width: "248px" }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Date of Birth"
										value={dateofbirth}
										// value={parseISO(salesPage.dateAt)}
										onChange={(newValue) => {
											setDateOfBirth(newValue);
										}}
										// onChange={handleDateAtOnChange}
										renderInput={(params) => (
											<TextField
												variant="filled"
												sx={{
													"& .MuiInputBase-input": {
														height: "13px", // Set your height here.
														width: "185px",
													},
												}}
												{...params}
											/>
										)}
									/>
								</LocalizationProvider>
							</Box>
							<FormControl variant="filled">
								<TextField
									value={address}
									htmlFor="component-filled"
									label="Employee Address"
									sx={{
										width: "248px",
										"& .MuiInputBase-root": {
											height: "46px",
										},
									}}
									defaultValue="Enter Employee Address"
									variant="filled"
									size="small"
									onChange={(e) => setAddress(e.target.value)}
								></TextField>
							</FormControl>
						</Stack>
					</Stack>
					<Box height="16px"></Box>
					<Stack direction="row" gap="12px">
						<Typography>Employment Detail</Typography>
						<Divider sx={{ width: "368px", alignSelf: "center" }} />
					</Stack>
					<Box height="19px" />
					<Stack direction="row" gap="24px">
						<FormControl
							variant="filled"
							sx={{
								width: "248px",
								"& .MuiInputBase-root": {
									height: "46px",
								},
							}}
						>
							<InputLabel id="demo-simple-select-filled-label">
								Department
							</InputLabel>
							<Select
								labelId="demo-simple-select-filled-label"
								defaultValue="Enter Employee Address"
								id="demo-simple-select-filled"
								value={department}
								onChange={(e) => setDepartment(e.target.value)}
							>
								<MenuItem value={10}>Inventory</MenuItem>
								<MenuItem value={20}>Finance</MenuItem>
								<MenuItem value={30}>Human Resource</MenuItem>
								<MenuItem value={30}>Workshop</MenuItem>
								<MenuItem value={30}>Project</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							variant="filled"
							sx={{
								width: "248px",
								"& .MuiInputBase-root": {
									height: "46px",
								},
							}}
						>
							<InputLabel id="demo-simple-select-filled-label">
								Position
							</InputLabel>
							<Select
								labelId="demo-simple-select-filled-label"
								defaultValue="Enter Employee Address"
								id="demo-simple-select-filled"
								value={position}
								onChange={(e) => setPosition(e.target.value)}
							>
								<MenuItem value={"Glass Works"}>Glass Works</MenuItem>
								<MenuItem value={"Metal Works"}>Metal Works</MenuItem>
								<MenuItem value={"Plumbing"}>Plumbing</MenuItem>
								<MenuItem value={"Woodworks"}>Woodworks</MenuItem>
								<MenuItem value={"Electrician"}>Electrician</MenuItem>
								<MenuItem value={"Finance Manager"}>Finance Manager</MenuItem>
								<MenuItem value={"HR Manager"}>HR Manager</MenuItem>
								<MenuItem value={"Project Manager"}>Project Managerr</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<Box height="16px" />
					<Stack direction="row" gap="24px">
						<Box sx={{ width: "248px" }}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label="Employment Date"
									value={employmentDate}
									// value={parseISO(salesPage.dateAt)}
									onChange={(newValue) => {
										setEmploymentDate(newValue);
									}}
									// onChange={handleDateAtOnChange}
									renderInput={(params) => (
										<TextField
											variant="filled"
											sx={{
												"& .MuiInputBase-input": {
													height: "13px", // Set your height here.
													width: "185px",
												},
											}}
											{...params}
										/>
									)}
								/>
							</LocalizationProvider>
						</Box>
						<FormControl
							variant="filled"
							sx={{
								width: "248px",
								"& .MuiInputBase-root": {
									height: "46px",
								},
							}}
						>
							<InputLabel id="demo-simple-select-filled-label">
								Employment Type
							</InputLabel>
							<Select
								labelId="demo-simple-select-filled-label"
								defaultValue="Enter Employee Address"
								id="demo-simple-select-filled"
								value={employmentType}
								onChange={(e) => setEmploymentType(e.target.value)}
							>
								<MenuItem value={"Glass Works"}>Glass Works</MenuItem>
								<MenuItem value={"Metal Works"}>Metal Works</MenuItem>
								<MenuItem value={"Plumbing"}>Plumbing</MenuItem>
								<MenuItem value={"Woodworks"}>Woodworks</MenuItem>
								<MenuItem value={"Electrician"}>Electrician</MenuItem>
								<MenuItem value={"Finance Manager"}>Finance Manager</MenuItem>
								<MenuItem value={"HR Manager"}>HR Manager</MenuItem>
								<MenuItem value={"Project Manager"}>Project Managerr</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<Box height="24px" />

					<Stack direction="row" justifyContent="space-between">
						<Button variant="text">Reset</Button>
						<Box>
							<Button
								variant="contained"
								onClick={sendEmployee}
								sx={{
									backgroundColor: "#4339F2",
									borderRadius: "10px",
									width: "192px",
									height: "48px",
								}}
							>
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
								>
									<AddIcon />
									<Box width="12px"></Box>
									<Typography fontWeight="600" fontSize="12px">
										Add Employee
									</Typography>
								</Stack>
							</Button>
						</Box>
					</Stack>
				</Stack>
			</Box>
		</Paper>
	);
	return (
		<Stack paddingRight="55px" direction="column" width="100%" height="100vh">
			<Box height="24px"></Box>
			<Stack justifyContent="space-between" direction="row">
				<Typography fontWeight="700" fontSize="32px">
					Employees
				</Typography>
				<Button
					onClick={handleSlide}
					sx={{
						marginTop: "3px",
						backgroundColor: "#E1E0F6",
						color: "#4339F2",
						borderRadius: "10px",
						paddingX: "16px",
						paddingY: "12px",
					}}
				>
					<AddIcon />
					<Typography variant="p" fontSize="12px" fontWeight="600">
						Add Employee
					</Typography>
				</Button>
			</Stack>
			<EmployeesLayout />
			<Stack
				marginTop="11px"
				marginBottom="8px"
				direction="row"
				justifyContent="space-between"
			>
				<Typography fontWeight="700" fontSize="20px">
					All Employees(48)
				</Typography>
				<Box display="flex" flexDirection="row">
					<ChevronLeftIcon />
					<ChevronRightIcon />
				</Box>
			</Stack>
			<Paper sx={{ width: "100%", overflow: "hidden", height: "100vh" }}>
				<Stack direction="row">
					<Slide direction="right" in={checked} mountOnEnter unmountOnExit>
						{addEmployee}
					</Slide>
				</Stack>
				{/* {response.map((response, index) => ( */}
				<TableContainer sx={{ marginLeft: "31px", marginRight: "127px" }}>
					<Table stickyHeader aria-label="tasks list">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{response?.data?.map((response, index) => (
								<TableRow key={response.attributes?.title}>
									<TableCell>
										<Stack paddingY="24px" direction="row">
											<Stack direction="row">
												<>
													<Avatar src={response.attributes?.avatar} />
													<Box width="24px" />
													<Box display="flex" flexDirection="column">
														{/* <pre>
																			{JSON.stringify(
																				{
																					response,
																				},
																				null,
																				2
																			)}
																		</pre> */}
														<Typography>
															{response.attributes?.title}
														</Typography>
														<Typography>
															Inventory - Updated 1 day ago
														</Typography>
													</Box>
												</>
											</Stack>
										</Stack>
									</TableCell>
									<TableCell>
										<Typography> In progress</Typography>
									</TableCell>
									<TableCell>
										<Typography>{response.attributes?.date}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{response.attributes?.priority}</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				{/* ))} */}
			</Paper>
		</Stack>
	);
};

export default Employees;
