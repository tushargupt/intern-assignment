const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const express = require("express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");


const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use((req, res) => {
    res.send("Welcome");
  });
  await mongoose.connect(
    "mongodb://localhost:27017/GraphDB",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => {
      console.log(`Successfully connected to DB`);
    }
  );
  app.listen(3000, () => console.log("Server running"));
};

startServer();