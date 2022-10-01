import React from 'react'
import { Link } from "react-router-dom";

const SearchBar = ({searchedText, handleSearchChange}) => {


  // Turn off page refresh when submit form element 
  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="flex flex-row justify-center items-center w-full h-12 bg-blue-300 border-2 border-gray-700 rounded-lg px-6 py-8 shadow-md mx-auto">

        <div className='w-full'>
        
          <form onSubmit={handleSubmit} className="w-full flex justify-center items-center">
            <input onChange={handleSearchChange} value={searchedText} className='w-1/3 flex-1 pl-4 pr-2  py-2 border-2 border-gray-700 rounded-lg  outline-none' placeholder='Search a movie...' />
            <Link to="/add" className='inline-flex items-center ml-5 py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg border-2 border-black'>Add a movie </Link>
          </form>
        
        </div>
    </div>    
  )
}

export default SearchBar;
