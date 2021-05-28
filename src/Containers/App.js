import React from "react";
import "./App.css";
import Home from "../Components/Home";
import SearchBar from "../Components/SearchBar.js";
// import Cards from '../Components/Card';
import Table from "../Components/Table";
import Loading from "../Components/Loading";


// const currentCasesUrl = "https://api.covid19india.org/v4/min/data.min.json"
const dataUrl = "https://api.covid19india.org/data.json";
const stateWiseDataUrl = "https://api.covid19india.org/v4/min/data.min.json"
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stateWiseData: [],
      searchFieldValue: "",
      lastUpdate : ""
    };
  }

  //////////////////  Fetching data from api  /////////////////////////////////
  async componentDidMount() {
    const data = await fetch(dataUrl);
    const statesJsonData = await (await fetch(stateWiseDataUrl)).json()
    const lastUpdate =await statesJsonData["TT"].meta.last_updated;;
    const jsonData = await data.json();
    let stateWiseData = jsonData.statewise;
    // Adding state wise data in desending order to localstorage
    stateWiseData.sort(function (a, b) {
      let a_avg = (a.active + a.deaths) / 2;
      let b_avg = (b.active + b.deaths) / 2;
      return parseFloat(b_avg) - parseFloat(a_avg);
    });

  /////////////////     Converting plain numbers to comma seperated numbers    ////////////////////////
    for (let i =0 ;i < stateWiseData.length ; i++)
    {
     stateWiseData[i].active = parseInt( stateWiseData[i].active).toLocaleString();
      stateWiseData[i].confirmed = parseInt(stateWiseData[i].confirmed ).toLocaleString();
      stateWiseData[i].deaths = parseInt(stateWiseData[i].deaths ).toLocaleString();
      stateWiseData[i].recovered = parseInt(stateWiseData[i].recovered).toLocaleString();
      
    }
    
    localStorage.setItem("stateWiseData", JSON.stringify(stateWiseData));
    localStorage.setItem("actualData", JSON.stringify(jsonData));
    localStorage.setItem('lastUpdate',lastUpdate)
    this.setState({
      stateWiseData: stateWiseData,
      lastUpdate :lastUpdate
    });

  }

  //////////////////////////////////////////////////////////////////

  // Removing stored data form localstroage
  componentWillUnmount() {
    localStorage.removeItem("stateWiseData");
    localStorage.removeItem("actualData");
  }
  //////////////////////////////////////////////////////////////////
  
  /////////////////////////////////   On Search Change Fucntion /////////////////////////////////
  onSearchChange = (element) => {
    this.setState({
      searchFieldValue: element.target.value.toLowerCase(),
    });
  };

  ///////////////////////////////// Rendering /////////////////////////////////
  render() {
    let stateWiseData = this.state.stateWiseData;
    if (stateWiseData.length > 0) {
      return (
        
        <div className="App">
          <Home
            active={stateWiseData[0].active}
            confirmed={stateWiseData[0].confirmed}
            deaths={stateWiseData[0].deaths}
            recovered={stateWiseData[0].recovered}
            lastUpdate = {this.state.lastUpdate}
          />
          <SearchBar onSearchChange={this.onSearchChange} />
          {/* <Cards stateWiseData = {stateWiseData}/> */}
          <Table
            stateWiseData={stateWiseData}
            searchFieldValue={this.state.searchFieldValue}
          />{" "}
        </div>
        
      );
    } else {
      return (
        
          <Loading />
        
      );
    }
  }
  //////////////////////////////////////////////////////////////////
}

export default App;
