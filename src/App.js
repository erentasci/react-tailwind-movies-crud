import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";

function App() {


  const [movies, setMovies] = useState([])
  const [searchedText, setSearchedText] = useState("");

  const handleSearchChange = (e) => {
    setSearchedText(e.target.value);
  }

  // SEARCH MOVİE
  const filteredMovies = movies.filter( (movie) => {
      return movie.name.toLocaleLowerCase().includes(searchedText)
  } ).sort( (a,b) => {
      return (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0;
  } )


  // GET MOVİE
  const fetchData = async () => {
    try{
      const response = await axios.get("http://localhost:3002/movies/");
      setMovies(response.data);

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[]);


  // const deleteMovie = (deletedMovie) => {
  //   const newMovies = movies.filter((movie) => movie.id !== deletedMovie.id);
  //   setMovies(newMovies);
  // }

  // DELETE MOVİE
  const deleteMovie = async (deletedMovie) => {

    axios.delete(`http://localhost:3002/movies/${deletedMovie.id}`)
    const newMovies = movies.filter((movie) => movie.id !== deletedMovie.id);
    console.log(newMovies);
    setMovies(newMovies);
  }

  // ADD MOVİE 
  const addMovie = async (updatedMovie) => {

    await axios.post(`http://localhost:3002/movies/`,updatedMovie);
    setMovies([...movies,updatedMovie])
    fetchData();

  }
  const { id } = useParams();
    
  
   // EDIT MOVIE
   const editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
        fetchData();
    }

  return (


    <BrowserRouter>

          <div className="flex flex-col justify-center items-center container mx-auto w-full min-h-screen p-1">

            <Routes>

              <Route path="/" element={
                  <React.Fragment>
                      <SearchBar
                            searchedText={searchedText}
                            handleSearchChange={handleSearchChange}
                          />

                        <MovieList
                                  movies={filteredMovies}
                                  deleteMovie={deleteMovie}
                          />
                  </React.Fragment>
                } >

              </Route>

              <Route path="/add" element={
                  <AddMovie 
                    onAddMovie={ (movie) =>{
                      addMovie(movie)
                    } }
                  />
                  } />



              <Route path="/edit/:id" element={
                    <EditMovie onEditMovie={ (id, movie) => {
                      editMovie(id,movie);
                    }} />

                } />


            </Routes>


          </div>

    </BrowserRouter>     

  );
}

export default App;
