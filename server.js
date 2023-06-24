import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first one",
    userId: "2",
  },
  {
    id: "2",
    text: "second one",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "Nico",
    lastName: "Las",
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "Mask",
  },
];

const typeDefs = gql`
  """
  User object
  """
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }

  """
  Tweet object
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  """
  Movie object for client apollo project
  """
  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }

  """
  "Immutable" Root object : like GET in http
  """
  type Query {
    allMovies: [Movie!]!
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    movie(id: String!): Movie
  }

  """
  "Mutable" Root object : like POST, PUT, DELETE in http
  """
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(_, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
    async allMovies() {
      const json = await (
        await fetch("https://yts.mx/api/v2/list_movies.json")
      ).json();
      return json.data.movies;
    },
    async movie(_, { id }) {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      return json.data.movie;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
