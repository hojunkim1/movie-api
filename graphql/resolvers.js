import { addMovie, deleteMovie, getById, getMovies, updateMovie } from "./db";

const resolvers = {
  Query: {
    movies: () => getMovies(),
    getMovie: (_, { id }) => getById(id),
  },
  Mutation: {
    addMovie: (_, { name, score }) => addMovie(name, score),
    updateMovie: (_, { id, name, score }) => updateMovie(id, name, score),
    deleteMovie: (_, { id }) => deleteMovie(id),
  },
};

export default resolvers;
