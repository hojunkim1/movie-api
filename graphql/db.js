import fetch from "node-fetch";

const API_URL = "https://yts.am/api/v2/list_movies.json";

export const getMovies = async (limit = 50, rating = 7) => {
  const json = await (
    await fetch(`${API_URL}?limit=${limit}&minimum_rating=${rating}`)
  ).json();
  const {
    data: { movies },
  } = json;
  return movies;
};
