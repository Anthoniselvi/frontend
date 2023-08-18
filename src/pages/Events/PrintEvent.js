import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import axios from "axios";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2, // Updated value
    borderBottomColor: "#000000",
    paddingBottom: 8,
    marginBottom: 8,
  },
  entryText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  columnHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2, // Updated value
    borderBottomColor: "#000000",
    paddingBottom: 8,
    marginBottom: 8,
  },
  columnHeadingText: {
    fontSize: 16,
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#121212",
  },
});
export const PrintEvent = ({ selectedEvent, selectedEventId }) => {
  const [entries, setEntries] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);

  const fetchAllEntries = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/all/${selectedEventId}`)
      .then((response) => {
        console.log(response.data); // Add this line to check the fetched data
        setEntries(response.data.entriesList);
        setTotalAmount(response.data.totalAmount);
        setTotalGift(response.data.totalGift);
      })
      .catch((error) => {
        console.log("Error fetching entries:", error);
      });
  };

  console.log("entries in Print:" + JSON.stringify(entries));
  useEffect(() => {
    fetchAllEntries();
  }, [selectedEvent]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{selectedEvent}</Text>

        <View style={styles.columnHeading}>
          <Text style={styles.columnHeadingText}>Person Name</Text>
          <Text style={styles.columnHeadingText}>City</Text>
          <Text style={styles.columnHeadingText}>Amount</Text>
          <Text style={styles.columnHeadingText}>Gift</Text>
        </View>

        {entries.map((singleEntry, i) => (
          <View key={`${singleEntry.entryId}-${i}`} style={styles.entry}>
            <Text style={styles.entryText}>{singleEntry.personName}</Text>
            <Text style={styles.entryText}>{singleEntry.city}</Text>
            <Text style={styles.entryText}>₹{singleEntry.amount}</Text>
            <Text style={styles.entryText}>{singleEntry.gift}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
