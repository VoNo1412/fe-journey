import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import dayjs from "dayjs";
import React from 'react';
import { Box } from '@mui/material';


function CalendarSection() {
  const [date, setDate] = useState(dayjs()); // Default to today

  return (
    <>
      <Box sx={{ background: 'var(--third-deep-bgColor)', padding: 1, borderRadius: 6, marginBottom: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={date}
            onChange={(newDate) => setDate(dayjs(newDate))}
            dayOfWeekFormatter={(day) => day.format("dd")}
            sx={{
              "& .Mui-selected": {
                position: "relative", // Enable absolute positioning for pseudo-elements
              },
              "& .Mui-selected::after": {
                position: "absolute",
                content: '"🔴⚫🟢"', // Use text-based dots
                fontSize: "5px",
                letterSpacing: "3px",
                textAlign: "center",
                width: "100%",
                bottom: "3px",
                left: "2px"
              }
            }}
          />

        </LocalizationProvider>
      </Box>
    </>
  );
}

export default React.memo(CalendarSection);