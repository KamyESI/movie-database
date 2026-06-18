import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Fetch movies from TMDB API : returns 20 movies*/
  useEffect(() => {
    const url =
      search.trim() === ""
        ? `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${search}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [search]);

  function handleChange(e) {
    setSearch(e.currentTarget.value);
  }

  return (
    <>
      <header>
        <form>
          <input
            className="searched-movie"
            type="text"
            placeholder="🔍 Search movie here ..."
            onChange={handleChange}
            value={search}
          />
        </form>
      </header>
      {error ? (
        <p className="error">{error}</p>
      ) : !loading ? (
        <main>
          <section className="movies-container">
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </section>
        </main>
      ) : (
        <p className="loading-message">Loading ...</p>
      )}
    </>
  );
}

export default Home;
