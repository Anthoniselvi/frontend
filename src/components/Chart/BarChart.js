import React, { PureComponent } from "react";
import { Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
          top: 10,
          right: 10,
          left: -30,
          bottom: 10,
        }}
        barSize={30}
      >
        <XAxis
          dataKey="eventName"
          scale="point"
          padding={{ left: 10, right: 10 }}
          // dx={-10} // Move the labels slightly to the left
        />
        <YAxis />
        <Tooltip
          label={true}
          formatter={(value, name, props) => {
            const { payload } = props;
            return [
              <Box display="flex" flexDirection="column">
                <p>{payload.eventName}</p>
                <p>&#8377; {value}</p>
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
