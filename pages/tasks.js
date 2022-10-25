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
	OutlinedInput,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
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
import { createTask, readTask } from "./api";
// import { convertToLocalTime } from "date-fns-timezone";
// import { format } from "date-fns";

const high = require("../public/static/high.png");
const low = require("../public/static/low.png");
const normal = require("../public/static/normal.png");
const inprogress = require("../public/static/normal.png");

const priority = [high, low, normal];

const Tasks = () => {
	const [selected, setSelected] = useState([]);

	const changeImage = (value) => {
		setSelected(priority[value] + 1);
		if (priority[value] == "high") {
			setSelected(priority[0]);
		}
	};

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

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "648px",
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [value, setValue] = React.useState(dayjs(new Date()));

	const handleChange = (newValue) => {
		setValue(newValue);
	};

	const [checked, setChecked] = React.useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [comment, setComment] = useState("");

	const handleSlide = () => {
		setChecked((prev) => !prev);
	};
	const currentDate = value.toString();
	console.log(currentDate);

	// const [question, setQuestions] = useState({});

	const sendTask = () => {
		const newTask = {
			// Title: name,
			// data: { faq },
			// title: title,
			// description: description,
			// comment: comment,
			// title: data.title,
			data: {
				// tasks: {
				title,
				description,
				comment,
				date: currentDate,
				// },
			},
		};
		createTask(newTask);
		console.log(newTask);
	};

	const [response, setResponse] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await readTask();
			setResponse(result.data);
		};
		fetchData();
	}, []);

	const changePriority = {
		if(high) {},
	};
	console.log("response", response);
	const addTask = (
		<Paper sx={{ m: 1 }} elevation={4}>
			<Box
				sx={{
					width: "648px",
					height: "528px",
					paddingLeft: "24px",
					paddingTop: "15px",
				}}
			>
				<Stack paddingRight="24px" direction="column">
					<Typography fontWeight="700" fontSize="20px" marginBottom="11px">
						Add New Task
					</Typography>
					<Stack gap="24px" direction="row">
						<Box sx={{ width: "384px", height: "32px" }}>
							<TextField
								id="outlined-basic"
								value={title}
								label="Task Title"
								variant="outlined"
								inputProps={{
									style: {
										height: "10px",
									},
								}}
								onChange={(e) => setTitle(e.target.value)}
								sx={{ width: "384px", height: "3px" }}
							/>
						</Box>
						<Box sx={{ width: "192px", height: "3px" }}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label="Select a Date"
									value={value}
									// value={parseISO(salesPage.dateAt)}
									onChange={(newValue) => {
										setValue(newValue);
									}}
									// onChange={handleDateAtOnChange}
									renderInput={(params) => (
										<TextField
											sx={{
												"& .MuiInputBase-input": {
													height: "10px", // Set your height here.
												},
											}}
											{...params}
										/>
									)}
								/>
							</LocalizationProvider>
						</Box>
					</Stack>
					<Box height="24px"></Box>
					<Stack direction="row">
						<Typography>Assigne</Typography>
						<Stack direction="row">
							<AvatarGroup max={6}>
								<Avatar
									sx={{ width: "24px", height: "24px" }}
									alt="assignee"
									src="/static/Avatar.png"
								/>
								<Box width="4.9px"></Box>
								<Avatar
									sx={{ width: "24px", height: "24px" }}
									alt="Trevor Henderson"
									src="/static/Avatar (2).png"
								/>
								<Box width="4.9px"></Box>

								<Avatar
									sx={{ width: "24px", height: "24px" }}
									alt="Trevor Henderson"
									src="/static/Avatar.png"
								/>
								<Box display="flex" justifyContent="center" alignItems="center">
									<Box
										borderRadius="50%"
										sx={{ width: "24px", height: "24px", bgcolor: "#4339F2" }}
										display="flex"
										justifyContent="center"
										alignItems="center"
									>
										<Button>
											<AddIcon
												sx={{
													width: "32px",
													height: "32px",
													padding: "6.45px",
													color: "white",
												}}
											/>
										</Button>
									</Box>
								</Box>
							</AvatarGroup>
							<Box width="71.73px"></Box>
							<Stack direction="row">
								<Typography>Priority:</Typography>
								<Box width="16px"></Box>
								<IconButton
									onClick={() =>
										setSelected(
											priority.normal && priority.low && priority.high
										)
									}
								>
									<Image src={selected} width={"52px"} height={"24px"} />
								</IconButton>
								<Box width="24px"></Box>
								<Typography>Status: </Typography>
								<Box width="24px"></Box>
								<Image
									src="/static/inprogress.png"
									width="102px"
									height="24px"
								/>
							</Stack>
							<Box height="25px"></Box>
						</Stack>
					</Stack>
					<Box height="25px"></Box>
					<Stack>
						<ButtonGroup>
							<Box sx={{ borderBottom: "2px", borderColor: "black" }}>
								<Button variant="text">
									<Typography>Desciption</Typography>
								</Button>
							</Box>
							<Box sx={{ borderBottom: "2px", borderColor: "black" }}>
								<Button variant="text">
									<Typography>Files</Typography>
								</Button>
							</Box>
							<Box sx={{ borderBottom: "2px", borderColor: "black" }}>
								<Button variant="text">
									<Typography>Comments</Typography>
								</Button>
							</Box>
						</ButtonGroup>
					</Stack>
					<Box height="15px" width="100%"></Box>
					<Box>
						<TextField
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							bgcolor="yellow"
							sx={{ width: "100%", height: "100%" }}
						/>
					</Box>
					<Box height="6px"></Box>
					<Typography>Comments(0)</Typography>
					<Box height="10px"></Box>
					<FormControl variant="filled">
						<InputLabel value={comment} htmlFor="component-filled">
							Be the first to comment on the task
						</InputLabel>
						<FilledInput
							id="component-filled"
							onChange={(e) => setComment(e.target.value)}
							// value={comment}
							// onChange={handleChange}
						/>
					</FormControl>
					<Box height="26px"></Box>
					<Stack direction="row" justifyContent="space-between">
						<Button variant="text">Reset</Button>
						<Box>
							<Button
								variant="contained"
								onClick={sendTask}
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
										Add Task
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
		<>
			<Stack direction="row">
				<SideBar />
				<Stack
					// paddingRight="104px"
					direction="column"
					width="80%"
					height="100vh"
				>
					<>
						<Navbar />
						<Stack
							direction="column"
							paddingLeft="48px"
							paddingRight="60px"
							width="100%"
							height="100vh"
						>
							<Stack
								paddingTop="24px"
								justifyContent="space-between"
								direction="row"
							>
								<Typography fontWeight="700" fontSize="32px">
									My Tasks
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
										Add Task
									</Typography>
								</Button>
							</Stack>
							<Box sx={{ border: "1px solid #F5F5F7", marginTop: "30px" }}>
								<Paper
									borderRadius="10px"
									backgroundColor="white"
									width="100%"
									// height="52px"
								>
									{
										<Box display="flex" padding="0">
											<Box>
												<OutlinedInput
													label="Search Task"
													sx={{ width: "455px", height: "100%" }}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																edge="end"
															>
																<Image
																	src="/static/search.png"
																	width="20px"
																	height="20px"
																/>
															</IconButton>
														</InputAdornment>
													}
												></OutlinedInput>
											</Box>
											<Box display="flex" justifyContent="space-between">
												<Button
													sx={{
														height: "100%",
														// backgroundColor: "#F5F5F7",
														color: "black",
														marginLeft: "88px",
														borderRadius: "10px",
														border: "1px solid #F5F5F7",
													}}
												>
													<Typography
														fontWeight="600"
														fontSize="12px"
														paddingX="28px"
														paddingY="14px"
													>
														Status
													</Typography>
												</Button>
												<Link
													href="/tasks/grid"
												underline="none"
												>
												<Button
													
													
													sx={{
														height: "100%",
														// backgroundColor: "#F5F5F7",
														color: "black",
														borderRadius: "10px",
														border: "1px solid #F5F5F7",
														marginLeft: "24px",
													}}
												>

													<Box>
														<Typography
															fontWeight="600"
															fontSize="12px"
															paddingX="28px"
															paddingY="14px"
															>
															View: List
														</Typography>
													</Box>
												</Button>
															</Link>
												<Button
													sx={{
														height: "100%",
														// backgroundColor: "#F5F5F7",
														color: "black",
														borderRadius: "10px",
														border: "1px solid #F5F5F7",
														marginLeft: "24px",
													}}
												>
													<Typography
														fontWeight="600"
														variant="p"
														fontSize="12px"
														paddingX="28px"
														paddingY="14px"
													>
														SortBy: Decline
													</Typography>
												</Button>
											</Box>
										</Box>
									}
								</Paper>
							</Box>
							<Stack
								marginTop="11px"
								marginBottom="8px"
								direction="row"
								justifyContent="space-between"
							>
								<Typography fontWeight="700" fontSize="20px">
									All Tasks(48)
								</Typography>
								<Box display="flex" flexDirection="row">
									<ChevronLeftIcon />
									<ChevronRightIcon />
								</Box>
							</Stack>
							
							{/* list view */}
							<Paper sx={{ width: "100%", overflow: "hidden" }}>
								<Stack direction="row">
									<Slide
										direction="right"
										in={checked}
										mountOnEnter
										unmountOnExit
									>
										{addTask}
									</Slide>
								</Stack>
								{/* {response.map((response, index) => ( */}
								<TableContainer
									sx={{ marginLeft: "31px", marginRight: "127px" }}
								>
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
												<TableRow key={response.data.title}>
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
														<Typography>
															{response.attributes?.priority}
														</Typography>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
								{/* ))} */}
							</Paper>
						</Stack>
					</>
				</Stack>
			</Stack>
		</>
	);
};

export default Tasks;
