import React from "react";
import "./Home.css";
import Graph from "./Graph";

const Total = (props) => {
  return (
    <div className="total-div">
      <div className="main-title">
        <span className="covid-title"> COVID-19 </span> cases in India
      </div>
      <div className="total-info">
        <div className="confirmed">
          <div className="heading">confirmed</div>
          <div className="number">{props.confirmed}</div>
        </div>
        <div className="active">
          <div className="heading">Active</div>
          <div className="number">{props.active}</div>
        </div>
        <div className="recovered">
          <div className="heading">Recovered</div>
          <div className="number">{props.recovered}</div>
        </div>
        <div className="deaths">
          <div className="heading">Deaths</div>
          <div className="number">{props.deaths}</div>
        </div>
      </div>
    </div>
  );
};

const LastUpdate = ({ lastUpdate }) => {
  let date = new Date(lastUpdate);
  var monthArr = new Array();
  monthArr[0] = "January";
  monthArr[1] = "February";
  monthArr[2] = "March";
  monthArr[3] = "April";
  monthArr[4] = "May";
  monthArr[5] = "June";
  monthArr[6] = "July";
  monthArr[7] = "August";
  monthArr[8] = "September";
  monthArr[9] = "October";
  monthArr[10] = "November";
  monthArr[11] = "December";
  let day = date.getUTCDay();
  let month = monthArr[date.getUTCMonth()];
  let year = date.getUTCFullYear();
  let time  = date.toLocaleTimeString()

  lastUpdate =  "Last updated on "+day+" "+month+" "+year+" ,"+time+" "
  return <div className="last-update-div">{lastUpdate}</div>;
};

class Home extends React.Component {
  ////////////  Restricting to Update Home Page is Search Field Changes /////////////////////////////////////
  shouldComponentUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    let props = this.props;
    return (
      <div className="home-div">
        <Total
          confirmed={props.confirmed}
          deaths={props.deaths}
          recovered={props.recovered}
          active={props.active}
        />
        <LastUpdate lastUpdate={props.lastUpdate} />
        <Graph />
      </div>
    );
  }
}
export default Home;
