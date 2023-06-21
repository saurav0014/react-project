import React, { useState, useEffect } from "react";
import RenderMovie from "./RanderMovie";
import "./Movie.css";

const MovieApp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
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

  return (
    <div>
      <header
        className="flex p-4 justify-end"
        style={{ background: "#373b69" }}
      >
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="bg-transparent text-white text-base py-2 px-4 rounded-full"
            style={{ border: "2px solid #22254b" }}
            value={searchValue}
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </header>
      <div id="main" className="flex flex-wrap">
        {movies.map((movie) => (
          <RenderMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieApp;
