import React from 'react'
import './style.css'
const SearchBar = ({onSearchChange}) =>{

    return(
        <div className='search-bar-div'>
            <input type='text' className='search-bar' id = 'search-bar' onChange = {onSearchChange} placeholder='Search state'></input>
        </div>
    );

}

export default SearchBar;