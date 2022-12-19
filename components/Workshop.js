import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
import { alpha } from "@mui/material/styles";
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
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  Paper,
  Checkbox,
  Switch,
  Toolbar,
  Tooltip,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import FilterListIcon from "@mui/icons-material/FilterList";

function createData(
  title,
  department,
  postDate,
  deliveryDate,
  attachments,
  paymentStatus
) {
  return {
    title,
    department,
    postDate,
    deliveryDate,
    attachments,
    paymentStatus,
  };
}

const rows = [
  createData("Workshop 1", 305, 3.7, 67, 4.3, 4.7),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 4.7),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 4.7),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 4.7),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 4.7),
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
    id: "Workshop Task Title",
    numeric: false,
    disablePadding: true,
    label: "Workshop Task Title",
  },
  {
    id: "Department",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "Post Date",
    numeric: true,
    disablePadding: false,
    label: "Post Date",
  },
  {
    id: "Delivery Date",
    numeric: true,
    disablePadding: false,
    label: "Delivery Date",
  },
  {
    id: "Attachments",
    numeric: true,
    disablePadding: false,
    label: "Attachments",
  },
  {
    id: "Payment Status",
    numeric: true,
    disablePadding: false,
    label: "Payment Status",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
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

const Workshop = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("department");
  const [selected, setSelected] = React.useState([]);

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readEmployee();
      setResponse(result.data);
    };
    fetchData();
  }, []);

  //   const columns = [
  //     { id: "Workshop Task Title", label: "Workshop Task Title", minWidth: 170 },
  //     {
  //       id: "Department",
  //       label: "Department",
  //       // minWidth: 170,
  //       // align: "right",
  //       format: (value) => value.toLocaleString("en-US"),
  //     },
  //     {
  //       id: "Post Date",
  //       label: "Post Date",
  //       // minWidth: 170,
  //       // align: "right",
  //       format: (value) => value.toLocaleString("en-US"),
  //     },
  //     {
  //       id: "Delivery Date",
  //       label: "Delivery Date",
  //       // minWidth: 170,
  //       // align: "right",
  //       format: (value) => value.toFixed(2),
  //     },
  //     {
  //       id: "Attachments",
  //       label: "Attachments",
  //       // minWidth: 170,
  //       // align: "right",
  //       format: (value) => value.toFixed(2),
  //     },
  //     {
  //       id: "Payment Status",
  //       label: "Payment Status",
  //       // minWidth: 170,
  //       // align: "right",
  //       format: (value) => value.toFixed(2),
  //     },
  //   ];

  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState("");

  //   const getMonth = () => {
  //   let momentMonthName = moment().format("MMMM");
  //   setMonthName({ monthName: momentMonthName });
  //   };

  useEffect(() => {
    const getDate = async () => {
      let momentMonthName = moment().format("MMMM");
      setMonthName(momentMonthName);
      let momentYear = moment().format("YYYY");
      setYear(momentYear);

      console.log("month is", monthName);
    };
    getDate();
  }, []);

  return (
    <Stack
      paddingRight="55px"
      direction="column"
      width="100%"
      height="100%"
      overflowY="auto"
    >
      <Box height="24px"></Box>
      <Stack justifyContent="space-between" direction="row">
        <Stack>
          <Typography fontWeight="700" fontSize="32px">
            Workshop Delivery List
          </Typography>
          <Typography color="#6F7082" fontSize="16px">
            {`${monthName}`} {`${year}`}
          </Typography>
        </Stack>
        <Stack direction="row" gap="69px" alignItems="center">
          <Stack>
            <Typography color="#3F4158" fontWeight="400" fontSize="12px">
              Total Active Deliveries
            </Typography>
            <Typography color="black" fontSize="24px" fontWeight="400">
              9 Tasks
            </Typography>
          </Stack>
          <Button
            //   onClick={handleSlide}
            sx={{
              marginTop: "3px",
              backgroundColor: "#E1E0F6",
              color: "#4339F2",
              borderRadius: "10px",
              paddingX: "16px",
              paddingY: "12px",
            }}
          >
            <AttachFileIcon />
            <Typography variant="p" fontSize="12px" fontWeight="600">
              Generate Task List
            </Typography>
          </Button>
        </Stack>
      </Stack>
      <EmployeesLayout
        metric={`Date: ${monthName.substring(0, 3)} ${year}`}
        list="list"
        sortBy="Decline"
      />
      <Box height="104px" />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        // role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.title}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.title}
                        </TableCell>
                        <TableCell align="right">{row.department}</TableCell>
                        <TableCell align="right">{row.postDate}</TableCell>
                        <TableCell align="right">{row.deliveryDate}</TableCell>
                        <TableCell align="right">{row.attachments}</TableCell>
                        <TableCell align="right">{row.paymentStatus}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Stack>
  );
};

export default Workshop;
