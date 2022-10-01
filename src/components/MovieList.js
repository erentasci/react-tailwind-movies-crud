import React from 'react';
import { Link } from "react-router-dom";


const MovieList = ({movies, deleteMovie}) => {


  const handleDeleteClick = (deletedmovie) => {
    deleteMovie(deletedmovie);
  }

  const cutString = (str, maxLength) => {

    if(!str){
      return null
    }

    if(str.length <= maxLength){
      return str;
    }else{
      return `${str.substring(0,maxLength)}...`;
    }

  }


  return (  
  
    
    <div className="w-full h-min rounded-lg mx-auto">
      <div className='flex flex-row flex-wrap mt-1 justify-center xl:justify-start items-center '>

      {movies.map( (movie,index) => {
        return(
          <div key={index} className=" max-w-sm mx-5 my-2 bg-white rounded-lg border-2 border-gray-400 shadow-xl">

            <img className="mt-4 mx-auto rounded-lg" src={movie.imageURL} alt="movie-img"/>

            <div className="p-5">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.name}
                </h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {cutString(movie.overview,100)}
                </p>

                <div className='flex flex-row justify-between align-center'>

                    <div className='flex justify-start space-x-3'>
                        <button href="#" onClick={() => handleDeleteClick(movie) }  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 hover:bg-red-700 rounded-lg">
                          Delete
                        </button>

                       <Link to={`/edit/${movie.id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-orange-500 hover:bg-orange-600 rounded-lg">
                          Edit
                        </Link>
                    </div>

                  <span  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-600  rounded-lg">
                     {movie.rating}
                  </span>

                </div>

            </div>

        </div>
        )
      })}

      </div>
    </div>  
    
      )
}

export default MovieList
