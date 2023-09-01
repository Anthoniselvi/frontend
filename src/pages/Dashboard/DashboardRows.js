import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import StatBox1 from "../../components/StatBox/StatBox1";
import StatBox2 from "../../components/StatBox/StatBox2";
import StatBox3 from "../../components/StatBox/StatBox3";
import NewBar from "../../components/Chart/Newbar";
import Example from "../../components/Chart/BarChart";
import NewSearch from "../../components/Chart/NewSearch";
import SearchTable from "../../components/Chart/SearchTable";
export default function DashboardRows() {
  const isNonMobile = useMediaQuery("(max-width:1000px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const [eventsList, setEventsList] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);
  const [maxAmount, setMaxAmount] = useState({});
  const [maxAmountEvent, setMaxAmountEvent] = useState({});
  const [inputValue, setInputValue] = useState("");

  const navigateToEvents = () => {
    navigate(`/eventslist?profile=${profileId}`);
  };
  const searchResult = allEntries.filter(
    (entry) =>
      entry.personName &&
      entry.personName.toLowerCase().includes(searchName.toLowerCase())
  );

  const fetchTotals = () => {
    console.log("Process.env in dashboard : " + JSON.stringify(process.env));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/total/${profileId}`)
      .then((response) => {
        // console.log(response);

        console.log("Totals : " + JSON.stringify(response.data));
        setEventsList(response.data);
      });
  };
  const fetchAllEntriesByProfileId = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/allentries/${profileId}`)
      .then((response) => {
        // console.log(response);

        console.log(
          "All Entries from ProfileId : " + JSON.stringify(response.data)
        );
        setAllEntries(response.data.entriesList);
        setTotalAmount(response.data.totalAmount);
        setTotalGift(response.data.totalGift);
        setMaxAmount(response.data.maxAmountEntry);
        setMaxAmountEvent(response.data.maxAmountEventList);
      });
  };
  // console.log("MaxAmount : " + maxAmount.amount);
  // console.log("MaxAmount Given By : " + maxAmount.personName);
  // console.log("MaxAmount Event Name : " + maxAmountEvent.name);

  useEffect(() => {
    fetchTotals();
    fetchAllEntriesByProfileId();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Box
        width="100%"
        // m="20px 0px"
        p="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        justifyContent="space-between"
        gridAutoRows="90px"
        gap="30px"
        // border="1px solid red"
        sx={{
          "& > div": { gridColumn: isNonMobile ? "span 12" : undefined },
        }}
      >
        <Box
          onClick={navigateToEvents}
          gridColumn="span 4"
          backgroundColor="#fff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox1
            title1={eventsList.length}
            subtitle1="Events"
            icon1={<AllInboxIcon sx={{ color: "#E82192", fontSize: "24px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="#fff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // paddingTop="30px"
          borderRadius="10px"
        >
          <StatBox2
            title2={`₹ ${totalAmount}`}
            // subtitle1={`Maximum Amount - ₹ ${maxAmount.amount}`}
            subtitle1="Amount"
            // progress="0.75"
            // increase="+14%"
            icon2={
              <CurrencyRupeeIcon sx={{ color: "#D37D22", fontSize: "24px" }} />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor="#fff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // paddingTop="30px"
          borderRadius="10px"
        >
          <StatBox3
            title3={`${totalGift}`}
            // subtitle1={`Total Amount - ₹ ${allTotalAmount}`}
            subtitle1="Gifts"
            icon3={
              <CardGiftcardIcon sx={{ color: "#62924F", fontSize: "24px" }} />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          // onClick={navigateToEvents}
          gridColumn="span 12"
          gridRow="span 3"
          gap="20px"
          bgcolor="#fff"
          borderRadius="10px"
          border="1px solid #e8ecf1"
          width="100%"
          padding="20px"
        >
          <Box paddingBottom="10px">
            <Typography
              variant="h4"
              fontWeight="600"
              // color="rgba(54, 162, 235)"
              color="#101a34"
            >
              Events Generated
            </Typography>
            <Typography
              variant="h3"
              fontWeight="500"
              color="rgba(255, 159, 64)"
            >
              {`₹ ${totalAmount}`}
            </Typography>
          </Box>

          {/* <NewBar /> */}
          <Box
            sx={{
              width: "100%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Example eventsList={eventsList} />
            {/* <NewBar eventsList={eventsList} sx={{ width: "100%" }} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor="#fff"
          //    overflow="auto"
          borderRadius="10px"
          border="1px solid #e8ecf1"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
          }}
        >
          <NewSearch searchResult={searchResult} eventsList={eventsList} />
        </Box>
      </Box>
    </div>
  );
}
