import React from 'react'
import './search.style.scss'

const Search = (props) => {
    const { handleChange } = props
    return (
        <div className="search-box">
            <span className="icon"><i className="fa fa-search"></i></span>
            <input className="search" placeholder="Search..." onChange={handleChange}/>
        </div>
        )
    }
export default Search