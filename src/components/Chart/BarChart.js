import React from "react";
import { Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Example = ({ eventsList }) => {
  console.log("EventsList in Chart :" + JSON.stringify(eventsList));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={eventsList}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis
          dataKey="eventName"
          scale="point"
          padding={{ left: 10, right: 10 }}
          dx={-10} // Move the labels slightly to the left
        />
        <YAxis />
        <Tooltip
          label={true}
          formatter={(value, name, props) => {
            const { payload } = props;
            return [
              <Box display="flex" flexDirection="column">
                <p>{payload.eventName}</p>
                <p>{value}</p>
              </Box>,
            ];
          }}
        />
        <Legend />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Bar
          dataKey="totalAmount"
          fill="#EB707E"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
