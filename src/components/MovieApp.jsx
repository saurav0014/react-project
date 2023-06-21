import React, { useState, useEffect } from "react";
import "./Movie.css";
const MovieApp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMovies(API_URL);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      fetchMovies(SEARCH_API + searchValue);
    } else {
      fetchMovies(API_URL);
    }
  };

  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return "text-green-500";
    } else if (vote >= 5) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  const renderMovies = () => {
    return movies.map((movie) => {
      const { id, title, poster_path, vote_average, overview } = movie;
      return (
        <div
          className="movie w-72 mx-4 my-4 shadow-md relative overflow-hidden rounded"
          key={id}
          style={{ backgroundColor: "#373b69" }}
        >
          <img src={IMG_PATH + poster_path} alt={title} className="w-full" />
          <div className="movie-info p-4 flex justify-between items-center">
            <h3 className="text-xl font-medium text-white">{title}</h3>
            <span className={getClassByRate(vote_average)}>{vote_average}</span>
          </div>
          <div className="overview absolute bg-white p-4 left-0 bottom-0 right-0 max-h-full transform translate-y-full transition-transform duration-300 ease-in overflow-auto">
            <h3>Overview</h3>
            {overview}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <header
        className="flex p-4 justify-end"
        style={{ background: "#373b69" }}
      >
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="bg-transparent  text-white text-base py-2 px-4 rounded-full"
            style={{ border: "2px solid #22254b" }}
            value={searchValue}
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </header>
      <div id="main" className="flex flex-wrap">
        {renderMovies()}
      </div>
    </div>
  );
};

export default MovieApp;
