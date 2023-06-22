import { ApolloServer } from "apollo-server";

const server = new ApolloServer({});

server.listen().then(() => {
  console.log(`Running on ${url}`);
});
