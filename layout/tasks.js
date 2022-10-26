import { Box, Button, IconButton, InputAdornment, Link, OutlinedInput, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'

const TasksLayout = ({children}) => {
    return (
			<>
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
									<Link href="/tasks/grid" underline="none">
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
            {children}
			</>
		);
}

export default TasksLayout