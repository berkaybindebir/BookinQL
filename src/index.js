import { ApolloServer } from "apollo-server-express";
import express from "express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

require("dotenv").config();
const { PORT, NODE_ENV } = process.env;

const app = express();
app.disable("x-powered-by");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: NODE_ENV === "DEVELOPMENT"
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
	console.info("Server is running on", PORT);
});
