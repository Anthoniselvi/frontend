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

export default function DatePickerForEdit({ date, onChange }) {
  console.log("date recd in datepicker:" + date);

  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  console.log("format date:" + formattedDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DemoContainer components={["DesktopDatePicker "]}>
          <DemoItem>
            <DesktopDatePicker
              defaultValue={formattedDate}
              //   defaultShow={formattedDate}
              onChange={onChange}
              //   format="YYYY-MM-DD"
            />
          </DemoItem>
        </DemoContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
