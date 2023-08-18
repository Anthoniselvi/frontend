import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const NewBar = ({ eventsList }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: eventsList.map((event) => event.eventName),
        datasets: [
          {
            label: "",
            data: eventsList.map((event) => event.totalAmount),
            // backgroundColor: 'rgba(54, 162, 235, 0.2)',
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(255, 159, 64)",
              "rgba(255, 205, 86)",
              "rgba(75, 192, 192)",
              "rgba(54, 162, 235)",
              "rgba(153, 102, 255)",
              "rgba(201, 203, 207)",
            ],
            // borderColor: 'rgba(54, 162, 235, 1)',
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            display: false,
          },
        },
        legend: {
          display: false,
        },
      },
    });
  }, [eventsList]);

  // return <canvas ref={chartRef} sx={{'& .canvas': {width: "600px"}}} />;
  return <canvas ref={chartRef} className="canvas-width" />;
};

export default NewBar;
