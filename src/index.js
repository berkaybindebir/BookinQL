import { ApolloServer } from "apollo-server-express";
import express from "express";
import { LoggingLink } from "apollo-logger";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

require("dotenv").config();
const { PORT, NODE_ENV, MLAB_USER, MLAB_PASSWORD, MONGO_URI } = process.env;

(async () => {
	try {
		await mongoose.connect(
			`mongodb://${MLAB_USER}:${MLAB_PASSWORD}@${MONGO_URI}`,
			{
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true
			}
		);

		const app = express();

		const server = new ApolloServer({
			typeDefs,
			resolvers,
			context: ({ req }) => {
				const token = req.headers["authorization"] || "";

				return { token };
			},
			playground: NODE_ENV === "DEVELOPMENT",
			logger: () => new LoggingLink({ logger: console.log })
		});

		server.applyMiddleware({ app });

		app.listen(PORT, () => {
			console.info("Server is running on", PORT);
		});
	} catch (e) {
		console.error(e);
	}
})();
