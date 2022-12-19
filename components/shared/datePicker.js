import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const DateSelector = ({
  children,
  datePickerLabel,
  datePickerColor,
  dateOfBirth,
}) => {
  // const [employmentDate, setEmploymentDate] = useState("");
  const [date, setDate] = useState("");
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          inputFormat="MM/DD/YYYY"
          label={datePickerLabel}
          sx={{ width: "246px" }}
          value={date}
          variant="transparent"
          // value={parseISO(salesPage.dateAt)}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          InputProps={{
            disableUnderline: true,
          }}
          // onChange={handleDateAtOnChange}
          renderInput={(params) => (
            <TextField
              variant="filled"
              sx={{
                backgroundColor: "white",
                "& .MuiInputBase-input": {
                  height: "13px", // Set your height here.
                  width: "187px",
                  //   backgroundColor: datePickerColor,
                  bgcolor: datePickerColor,
                  svg: { color: "#FFF" },
                  input: { color: "#FFF" },
                },
              }}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateSelector;
