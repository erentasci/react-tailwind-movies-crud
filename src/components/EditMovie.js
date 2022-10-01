import axios from 'axios';
import React, { useState, useEffect} from 'react';
import {
    Link,
    useNavigate,
    useParams
  } from "react-router-dom";


const EditMovie = ({onEditMovie}) => {

  const navigate = useNavigate();

  const [info,setInfo] = useState({
    name:"",
    rating:"",
    overview:"",
    imageURL:""
  });  

  const  { id } = useParams();

  const getDetails = async () => {
    const response = await axios.get(`http://localhost:3002/movies/${id}`);
    const data = response.data;


    const {name, rating, overview, imageURL} = data;


    setInfo({
        name,
        rating,
        overview,
        imageURL
    })


  }

  useEffect(() => {
    getDetails();
  }, []);

  const handleChange = (e) => {
    setInfo({...info,[e.target.name] : e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {name, rating, overview, imageURL} = info;

    const newMovieInputs ={

        name,
        rating,
        overview,
        imageURL
        
    }

    navigate(-1)
    onEditMovie(id, newMovieInputs);

  }


  return (
    <div className='w-full md:w-2/3 h-full px-4 py-3 font-bold space-y-2'>

      <div className='flex flex-rowjustify-between items-center space-x-1'>
        <h2 className='text-xl flex-1'>EDIT A MOVİE </h2>
        <Link to='/' className=' py-2 px-3 border-2 border-black rounded-md bg-red-500 hover:bg-red-600 text-white text-sm'>  Back to homepage </Link>
      </div>

      <form onSubmit={handleSubmit} className='w-full border-2 shadow-xl border-black rounded-md bg-gray-200 flex flex-col justify-start items-center px-5 py-4 space-y-5'>

        <div className='w-full flex flex-row justify-between'>

          <div className='flex flex-col space-y-2 flex-1'>
            <span>Name</span>
            <input type="text" name='name' onChange={handleChange} className="outline-none p-2 rounded-md flex-1 border-2 text-gray-600 border-black shadow-md" value={info.name}/>
          </div>

          <div className='flex flex-col space-y-2 ml-5 w-1/3'>
            <span>Rating</span>
            <input type="text"  name='rating' onChange={handleChange} className='outline-none p-2 rounded-md border-2 text-gray-600 border-black shadow-md' value={info.rating} />
          </div>

        </div>

        <div className='w-full space-y-2'>
          <span> Image URL </span>
          <input type="text" name='imageURL'  onChange={handleChange}  className='outline-none w-full rounded-md p-2 text-gray-600 border-2 border-black shadow-md' value={info.imageURL} />
        </div>

        <div className='w-full space-y-2 '>
          <span>Overview </span>
          <textarea name='overview' onChange={handleChange}  className='w-full h-40 rounded-md p-2 border-2 text-gray-600 border-black shadow-md resize-none' value={info.overview}/>
        </div>

        <input type="submit"  className='w-full bg-green-500 hover:bg-green-600 font-bold px-5 py-2 border-2 border-black rounded-md text-black cursor-pointer' value="Edit this movie"/>
            
      </form>
    </div>
  )
}

export default EditMovie;
