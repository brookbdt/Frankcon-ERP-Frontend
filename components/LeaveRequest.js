import { AddIcCallOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react'

const LeaveRequest = () => {
  const leaveRequest = (
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
										inputFormat="MM/DD/YYYY"
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
								<MenuItem value={"Inventory"}>Inventory</MenuItem>
								<MenuItem value={"Finance"}>Finance</MenuItem>
								<MenuItem value={"Human Resource"}>Human Resource</MenuItem>
								<MenuItem value={"Workshop"}>Workshop</MenuItem>
								<MenuItem value={"Project"}>Project</MenuItem>
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
								<MenuItem value={"Project Manager"}>Project Manager</MenuItem>
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
									<AddIcCallOutlined />
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
    leaveRequest
  )
}

export default LeaveRequest