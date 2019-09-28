/* eslint-disable no-unused-vars */
import { AuthenticationError } from "apollo-server-express";
import { User } from "../models";
// import { user } from "../schemas";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

export default {
	Query: {
		currentUser: (root, args, contx, info) => {
			return contx.req.headers.authorization;
		},
		user: (root, { id }, contx, info) => User.findById(id),
		users: (root, args, contx, info) => User.find({}).sort("createdAt")
	},
	Mutation: {
		signIn: async (root, { email, password }, contx, info) => {
			let user = await User.find({ email });

			if (!user || !User.checkPassword(password))
				throw new AuthenticationError("Invalid Credentials");

			let token = jwt.sign({ user }, process.env.SECRET_KEY, {
				expiresIn: "1h"
			});
			contx.req.headers.authorization = token;
			return token;
		},
		signUp: async (root, args, contx, info) => {
			User.createUser(args);
		}
	}
};
