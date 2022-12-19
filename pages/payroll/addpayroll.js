import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import EmployeesLayout from "../../layout/employees";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
// import { createEmployee, readEmployee } from "../pages/api";
import { createEmployee, readEmployee } from "../api";

const handleSlide = () => {
  setChecked((prev) => !prev);
};

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    numeric: true,
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: theme.palette.common.black,
    color: "#0F112E",
    fontWeight: "700",
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
}));

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
        <StyledTableCell padding="checkbox">
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#24B07D",
                background: "#B6E1D2",
              },
            }}
            icon={<CircleIcon sx={{ color: "#E7E7EA" }} />}
            checkedIcon={<CheckCircleIcon />}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all employees",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
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
          </StyledTableCell>
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

const AddPayroll = () => {
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
  const [checked, setChecked] = React.useState(false);

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readEmployee();
      setResponse(result.data);
    };
    fetchData();
  }, []);
  function createData(fullName, calories, fat, carbs, protein) {
    // const fullName =
    //   `${response?.attributes?.FirstName} ` +
    //   `${response?.attributes?.LastName}`;
    return {
      fullName,
      calories,
      fat,
      carbs,
      protein,
    };
  }

  const responseData = () => {
    {
      response?.data?.map((response, index) => {
        return;
        {
          response?.attributes?.FirstName;
        }
        {
          response?.attributes?.LastName;
        }
      });
    }
  };
  console.log(responseData);

  const rows = [
    createData(
      `${response?.attributes?.FirstName} ` +
        `${response?.attributes?.LastName}`,
      305,
      3.7,
      67,
      4.3
    ),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor="#F6F6F6"
        height="100vh"
      >
        <SideBar />
        <Stack
          paddingRight="55px"
          direction="column"
          width="80%"
          height="100vh"
        >
          <>
            <Navbar />
            <Box height="28px" />
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="700" fontSize="32px" color="#141522">
                Employee Payroll 2022
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
            <EmployeesLayout metric="Status" list="list" sortBy="Decline" />
            <Box height="11px" />
            <Typography fontWeight={700} fontSize={20}>
              {" "}
              Payroll List
            </Typography>
            <Box height="18px" />
            <Box sx={{ width: "100%" }}>
              <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {
                        //   stableSort(response?.data, getComparator(order, orderBy))
                        response?.data?.map((row, index) => {
                          // .slice(
                          //   page * rowsPerPage,
                          //   page * rowsPerPage + rowsPerPage
                          // )
                          const isItemSelected = isSelected(row.name);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.name)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.name}
                              selected={isItemSelected}
                            >
                              <StyledTableCell padding="checkbox">
                                <Checkbox
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#24B07D",
                                      background: "#B6E1D2",
                                    },
                                  }}
                                  icon={
                                    <CircleIcon sx={{ color: "#E7E7EA" }} />
                                  }
                                  checkedIcon={<CheckCircleIcon />}
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                <Stack direction="column">
                                  <Typography
                                    color="#101010"
                                    fontWeight={500}
                                    fontSize="16px"
                                  >
                                    {row.attributes.FirstName +
                                      " " +
                                      row.attributes.LastName}
                                  </Typography>
                                  <Typography
                                    color="#3F4158"
                                    fontWeight={400}
                                    fontSize="12px"
                                  >
                                    {row.attributes.Position}
                                  </Typography>
                                </Stack>
                                {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}

                                {/* {response?.attributes?.FirstName} */}
                                {/* <Typography>hey</Typography> */}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <Stack>
                                  <Typography
                                    color="#101010"
                                    fontWeight={500}
                                    fontSize="16px"
                                  >
                                    {row.attributes.Department}
                                  </Typography>
                                  <Typography
                                    color="#3F4158"
                                    fontWeight={400}
                                    fontSize="12px"
                                  >
                                    Joined on {row.attributes.EmploymentDate}
                                  </Typography>
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {/* {row.fat} */}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <Stack>
                                  <Typography
                                    color="#101010"
                                    fontWeight={500}
                                    fontSize="16px"
                                  >
                                    {row.attributes.EmployeeGrossSalary}
                                  </Typography>
                                  <Typography
                                    color="#3F4158"
                                    fontWeight={400}
                                    fontSize="12px"
                                  >
                                    Net Salary + 10% Bonus
                                  </Typography>
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <Box
                                  padding={0}
                                  margin={0}
                                  width="136px"
                                  height="24px"
                                  backgroundColor="#F44336"
                                  alignItems="center"
                                  borderRadius="15px"
                                  justifyContent="right"
                                >
                                  <Typography
                                    fontSize="11px"
                                    color="#F6F6F6"
                                    fontWeight="700"
                                  >
                                    PAYMENT PENDING
                                  </Typography>
                                </Box>
                              </StyledTableCell>
                            </TableRow>
                          );
                        })
                      }
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <StyledTableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </>
        </Stack>
      </Stack>
    </>
  );
};

export default AddPayroll;
