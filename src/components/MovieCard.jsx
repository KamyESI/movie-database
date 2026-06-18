import React from "react";
import { Link } from "react-router-dom";

function MovieCard(props) {
  return (
    <Link to={`/movie/${props.movie.id}`} className="movie">
      <img
        src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
        alt={props.movie.title}
      />
      <h1 className="movie-title">{props.movie.title}</h1>

      <p className="release-date">
        {new Date(props.movie.release_date)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-")}
      </p>
    </Link>
  );
}

export default MovieCard;
