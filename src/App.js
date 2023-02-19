import React,{ useState,useEffect } from 'react';
// import logo from './logo.svg';
import MovieCard from './MovieCard';
import './App.css';
import searchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=d9d47b2';
const movie = {
  "Title": "Batman v Superman: Dawn of Justice",
  "Year": "2016",
  "imdbID": "tt2975590",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log(data)
  };
  useEffect(() => {
    searchMovies("Black Panther");
  }, []);

  return (
      <div className='app'>
        <h1>Movieland</h1>
        <marquee>search for any movie title of your choice to see different versions and infos about it...</marquee>
        <div className='search'>
          <input 
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
            </div>
         ) : (
            <div className='empty'>
              <h2>No Movies found</h2>
            </div>
         )
        }

      </div>
  );
}

export default App;
