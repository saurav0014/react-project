import React from "react";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return "text-green-500";
  } else if (vote >= 5) {
    return "text-orange-500";
  } else {
    return "text-red-500";
  }
};

const RenderMovie = ({ movie }) => {
  const { id, title, poster_path, vote_average, overview } = movie;

  return (
    <div
      className="movie w-72 mx-4 my-4 shadow-md relative overflow-hidden rounded"
      key={id}
      style={{ backgroundColor: "#373b69" }}
    >
      <img src={IMG_PATH + poster_path} alt={title} class Name="w-full" />
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
};

export default RenderMovie;
