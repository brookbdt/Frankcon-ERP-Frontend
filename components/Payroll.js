import AddIcon from "@mui/icons-material/Add";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import EmployeesLayout from "../layout/employees";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { readEmployee } from "../lib";
import ChangingButton from "./ChangingButton";

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Employee Name",
  },
  {
    id: "department",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "salary",
    numeric: true,
    disablePadding: false,
    label: "Employee Salary",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Payment Status",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Payroll = ({ jwt }) => {
  dayjs.extend(relativeTime);
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
  const [priority, setPriority] = useState("PAYMENT PENDING");

  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readEmployee(jwt);

      setResponse(result.data);
      console.log(response);

      //   const lastEmployee = await getEmployeeId(jwt);
      //   const lastEmployeeId = lastEmployee?.data?.data?.[0]?.id || 1;
      //   setEmployeeId(`EM - ${new Date().getFullYear()} - ${lastEmployeeId + 1}`);
      //   console.log({ em });
    };
    fetchData();
  }, [user]);
  let today = new Date();

  let thisMonth = today.toLocaleString("default", { month: "long" });

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Stack
        paddingRight="55px"
        direction="column"
        width="100%"
        height="100%"
        overflowY="auto"
      >
        <Box height="24px"></Box>
        <Stack justifyContent="space-between" direction="row">
          <Typography fontWeight="700" fontSize="32px">
            {thisMonth} Payroll
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
              Add Pay Month
            </Typography>
          </Button>
        </Stack>
        <EmployeesLayout />
        <Box height="16px" />
        <Box sx={{ width: "100%" }}>
          <Paper
            sx={{ width: "100%", height: "800px", overflowY: "auto", mb: 2 }}
          >
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer>
              <Table
                // sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                // size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={response.length}
                />
                <TableBody>
                  {response?.data?.map((employee) => (
                    <>
                      {/* {stableSort(response, getComparator(order, orderBy))
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((employee, index) => {
                          const isItemSelected = isSelected(
                            employee.attributes?.firstName +
                              employee.attributes?.lastName
                          );
                          const labelId = `enhanced-table-checkbox-${index}`; */}

                      <>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(
                              event,
                              employee.attributes?.firstName +
                                employee.attributes?.lastName
                            )
                          }
                          role="checkbox"
                          //   aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={
                            employee.attributes?.firstName +
                            employee.attributes?.lastName
                          }
                          //   selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              //   checked={isItemSelected}
                              //   inputProps={{
                              //     "aria-labelledby": labelId,
                              //   }}
                            />
                          </TableCell>
                          <TableCell>
                            <Stack paddingY="24px" direction="row">
                              <Stack direction="row">
                                <>
                                  <Avatar
                                    sx={{ width: "44px", height: "44px" }}
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${response?.attributes?.employeeImage?.data?.attributes?.url}`}
                                  />
                                  <Box width="24px" />
                                  <Box display="flex" flexDirection="column">
                                    <Typography
                                      fontSize="14px"
                                      fontWeight="500"
                                      color="#101010"
                                    >
                                      {employee?.attributes?.firstName}{" "}
                                      {employee?.attributes?.lastName}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: "#CFCFD5",
                                        fontWeight: "400",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {employee?.attributes?.department} -{" "}
                                      {employee?.attributes?.position}
                                    </Typography>
                                  </Box>
                                </>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack>
                              <Typography
                                fontSize="14px"
                                fontWeight="500"
                                color="#101010"
                              >
                                {" "}
                                {employee?.attributes?.department}
                              </Typography>
                              <Box display="flex">
                                <Typography
                                  sx={{
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#CFCFD5",
                                  }}
                                >
                                  {" "}
                                  Joined onn{" "}
                                  {
                                    dayjs(
                                      employee?.attributes?.employmentDate
                                    ).format("DD MMM YYYY")
                                    // .fromNow(true)
                                  }
                                </Typography>
                                <Box width="5px" />
                                <Typography
                                  sx={{
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#CFCFD5",
                                  }}
                                >
                                  -
                                </Typography>
                                <Box width="5px" />
                                <Typography
                                  sx={{
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#CFCFD5",
                                  }}
                                >
                                  {" "}
                                  {dayjs(
                                    employee?.attributes?.employmentDate
                                  ).fromNow(true)}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack>
                              <Typography
                                fontSize="14px"
                                fontWeight="500"
                                color="#101010"
                              >
                                28 {thisMonth}
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: "400",
                                  fontSize: "12px",
                                  color: "#CFCFD5",
                                }}
                              >
                                {/* {dayjs()} */}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack>
                              <Typography
                                fontSize="14px"
                                fontWeight="500"
                                color="#101010"
                              >
                                ETB {employee?.attributes?.employeeNetSalary}
                              </Typography>
                              <Typography
                                sx={{
                                  fontWeight: "400",
                                  fontSize: "12px",
                                  color: "#CFCFD5",
                                }}
                              >
                                Net Salary
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <ChangingButton
                              color={
                                priority === "PAYMENT PENDING"
                                  ? "#F44336"
                                  : priority === "PAYMENT PROCESSING"
                                  ? "#FFBA2E"
                                  : priority === "PAYMENT MADE"
                                  ? "#24B07D"
                                  : "gray"
                              }
                              values={[
                                "PAYMENT PENDING",
                                "PAYMENT PROCESSING",
                                "PAYMENT MADE",
                              ]}
                              selectedValue={priority}
                              onChange={setPriority}
                            />
                          </TableCell>
                        </TableRow>
                      </>
                      {/* })} */}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Stack>
    </>
  );
};

export default Payroll;
