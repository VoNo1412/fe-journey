import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import FocusTimer from './FocusTime';
import { Box } from '@mui/material';
import { useState } from 'react';
import dayjs from "dayjs";


export default function SidebarRight() {
    const [date, setDate] = useState(dayjs()); // Default to today

    return (
        <>
            <div>
                <Box sx={{ background: "var(--third-deep-bgColor)", padding: 1, borderRadius: 6, marginBottom: 3 }}>
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
                <FocusTimer />
            </div>
        </>
    );
}
