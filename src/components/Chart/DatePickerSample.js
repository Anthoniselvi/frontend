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
    Mui: {
      styleOverrides: {
        selected: {
          background: "green",
          color: "red",
        },
      },
    },
  },
});

export default function DatePickerSample() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DemoContainer components={["DesktopDatePicker "]}>
          <DemoItem label="Desktop variant">
            <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
          </DemoItem>
        </DemoContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
