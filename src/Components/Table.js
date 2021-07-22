import React from 'react'
import './style.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
const Row = (props) => {

    return (
        <div className='table-row' >
            <div className="table-cell" data-aos="fade-up"> {props.sno}      </div>
            <div className="table-cell" data-aos="fade-up"> {props.state}    </div>
            <div className="table-cell" data-aos="fade-up">{props.active}   </div>
            <div className="table-cell" data-aos="fade-up">{props.recovered}</div>
            <div className="table-cell" data-aos="fade-up">{props.deaths}   </div>
        </div>
    );
}

const TableHeading = () => {
    return (
        <div className='table-heading'>
            <div className="table-cell"> S.No      </div>
            <div className="table-cell"> States    </div>
            <div className="table-cell">    Active    </div>
            <div className="table-cell"> Recovered</div>
            <div className="table-cell">Deaths   </div>
        </div>
    );
}

const Table = (props) => {
    let stateWiseData = props.stateWiseData;
    let searchFieldValue = props.searchFieldValue;
    let tableRows = []
    let sno = 1;
    for (let i = 1; i < stateWiseData.length - 1; i++) {
        if ((stateWiseData[i].state).toLowerCase().includes(searchFieldValue)) {
            tableRows.push(
                < Row
                    key ={i}
                    sno={sno}
                    state={stateWiseData[i].state}
                    active={stateWiseData[i].active}
                    recovered={stateWiseData[i].recovered}
                    deaths={stateWiseData[i].deaths}
                />

            )
            sno += 1
        }
        
    }
    // console.log(stateWiseData);
    // console.log(tableRows);
    Aos.init({
        offset: 40
    })
    return (
        <div className='table-div'>
            <div className='table-body'>
                <TableHeading />
                {tableRows}

            </div>
        </div>
    );
}

export default Table;