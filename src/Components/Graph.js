import React from "react";
import "./style.css";
import { Line } from "react-chartjs-2";

const Graph = () => {
  let casesTimeSeries = JSON.parse(
    localStorage.getItem("actualData")
  ).cases_time_series;
  let labels = casesTimeSeries.map((timeSeriesData, index) => {
    if (index % 5 === 0) {
      let date = timeSeriesData.date.split(" ");
      return (
        date[0] + " " + date[1].substring(0, 3) + " " + date[2].substring(2, 4)
      );
    } else {
      return "";
    }
  });
  let casesData = casesTimeSeries.map(
    (timeSeriesData) => timeSeriesData.totalconfirmed
  );
  let recoveredData = casesTimeSeries.map(
    (timeSeriesData) => timeSeriesData.totalrecovered
  );
  let deathsData = casesTimeSeries.map(
    (timeSeriesData) => timeSeriesData.totaldeceased
  );
  const casesGraphData = {
    labels: labels,
    datasets: [
      {
        label: "Cases",
        data: casesData,
        fill: true,
        pointRadius: 1,
        backgroundColor: "rgba(240,173,78,0.1)",
        borderColor: "rgba(240,173,78,0.6)",
      },
    ],
  };
  const recoveredGaphData = {
    labels: labels,
    datasets: [
      {
        label: "Recovered",
        data: recoveredData,
        fill: true,
        pointRadius: 1,
        backgroundColor: "rgba(34,187,51,0.1) ",
        borderColor: "rgba(34,187,51,0.6) ",
      },
    ],
  };
  const deathsGraphData = {
    labels: labels,
    datasets: [
      {
        label: "Deaths",
        data: deathsData,
        fill: true,
        pointRadius: 1,
        backgroundColor: "rgba(187,33,36 , 0.1)",
        borderColor: " rgba(187,33,36,0.6)",
      },
    ],
  };

  const options = {
    responsive: false,
    title: {
      display: true,
      text: "PLEASE DISPLAY FOR HEAVEN'S SAKE",
    },
  };
  return (
    
    <div className="chart-div">
      <div className="chart-heading"> Overall Data from <span > 30 January 2020 </span> to today</div>
      <div className="charts">
        <div>
          <Line data={casesGraphData} options={options} />
        </div>
        <div>
          <Line data={recoveredGaphData} options={options} />
        </div>
        <div>
          <Line data={deathsGraphData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
