import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fontSize } from "@mui/system";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// Create a custom theme
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },

    MuiDatePickerToolbar: {
      styleOverrides: {
        root: {
          background: "#DA344D",
          color: "#fff",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          background: "#DA344D",
          color: "#fff",
        },
      },
    },

    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: 15,
          Mui: {
            styleOverrides: {
              selected: {
                background: "pink",
              },
            },
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          fontSize: 16,
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        label: {
          fontSize: 18,
          borderBottom: "1px solid red",
        },
        switchViewIcon: {
          fontSize: 25,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 25,
          color: "#DA344D",
        },
      },
    },
    // "&.Mui-selected": {
    //   root: {
    //     "&.Mui-selected": {
    //       background: "green",
    //       color: "red",
    //     },
    //   },
    // },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "0.5px solid #cad3dd",
          borderRadius: "7px",
          fontSize: 16,
          color: "#101a34",
          fontFamily: "Poppins",
        },
      },
    },
  },
});

export default function DatePickerSample({ onDateChange }) {
  // const date1 = dayjs("2022-04-17");
  // const date2 = dayjs();

  // if (date1.isBefore(date2)) {
  //   console.log("date1 is before date2");
  // } else {
  //   console.log("date1 is after date2");
  // }

  const currentDate = dayjs();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DemoContainer components={["DesktopDatePicker "]}>
          <DemoItem>
            <DesktopDatePicker
              defaultValue={currentDate}
              onChange={onDateChange}
            />
          </DemoItem>
        </DemoContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
