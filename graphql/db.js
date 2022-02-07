let movies = [
  {
    id: 1,
    name: "Black panther",
    score: 9.5,
  },
  {
    id: 2,
    name: "Iron man",
    score: 7.3,
  },
  {
    id: 3,
    name: "Shangcii",
    score: 9,
  },
  {
    id: 4,
    name: "Eternals",
    score: 8.8,
  },
  {
    id: 5,
    name: "Avengers",
    score: 9.3,
  },
  {
    id: 6,
    name: "Spiderman",
    score: 9.1,
  },
];

export const getMovies = () => movies;

export const addMovie = (name, score) => {
  const id = movies.length + 1;
  const newMovie = { id, name, score };
  movies.push(newMovie);
  return newMovie;
};

export const getMovie = (id) => {
  const filteredMovies = movies.filter((movie) => movie.id === id);
  return filteredMovies[0];
};

export const updateMovie = (id, name, score) => {
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return null;
  }
  const movie = movies[movieIndex];
  const updatedMovie = { ...movie, name, score };
  movies[movieIndex] = updatedMovie;
  return updatedMovie;
};

export const deleteMovie = (id) => {
  const cleanedMovies = movies.filter((movie) => movie.id !== id);
  if (cleanedMovies.length < movies.length) {
    movies = cleanedMovies;
    return true;
  } else {
    return false;
  }
};
