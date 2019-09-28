/* eslint-disable no-unused-vars */
import Joi from "@hapi/joi";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { User } from "../models";
import { signIn, signUp } from "../schemas";
import jwt from "jsonwebtoken";

export default {
	Query: {
		currentUser: (root, args, contx, info) => {
			let token = contx.req.headers.authorization;
			let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
			console.log(decodedToken);
		},
		user: (root, { id }, contx, info) => User.findById(id),
		users: (root, args, contx, info) => User.find({}).sort("createdAt")
	},
	Mutation: {
		signIn: async (root, { email, password }, contx, info) => {
			let { error = "" } = await signIn.validate(
				{ email, password },
				{
					abortEarly: false
				}
			);

			if (error) {
				throw new UserInputError(
					"Failed to get events due to validation errors",
					{ error }
				);
			}

			let user = await User.findOne({ email });
			if (!user || (await !user.checkPassword(password)))
				throw new AuthenticationError("Invalid Credentials");

			let token = jwt.sign(
				{
					id: user.id,
					name: user.name,
					surname: user.surname,
					email: user.email
				},
				process.env.SECRET_KEY,
				{
					expiresIn: "1h"
				}
			);

			return {
				id: user.id,
				token
			};
		},
		signUp: async (root, args, contx, info) => {
			let { error = "" } = await signUp.validate(args, {
				abortEarly: false
			});

			if (error) {
				throw new UserInputError(
					"Failed to get events due to validation errors",
					{ error }
				);
			}

			return User.create(args);
		}
	}
};
