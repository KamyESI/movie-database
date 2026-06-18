import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  return movie ? (
    <div className="movie-details-container">
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="details-container">
        <p>
          <strong>Original title :</strong> {movie.original_title}
        </p>
        <p>
          <strong>Language :</strong> {movie.original_language.toUpperCase()}
        </p>
        <p>
          <strong>Popularity :</strong> {movie.popularity}
        </p>
        <p>
          <strong>Rating :</strong> ⭐ {movie.vote_average.toFixed(1)}/10
        </p>
        <p>
          <strong>Votes :</strong> {movie.vote_count}
        </p>
        <p>
          <strong>Release date :</strong> {movie.release_date}
        </p>
        <p className="overview">
          <strong>Overview :</strong> {movie.overview}
        </p>
        <button className="go-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  ) : null;
}

export default MovieDetails;
