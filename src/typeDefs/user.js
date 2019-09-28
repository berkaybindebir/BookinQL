import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		currentUser: Auth!
		user(id: ID!): User
		users: [User]
	}
	extend type Mutation {
		signIn(email: String!, password: String!): String!
		signUp(
			name: String!
			surname: String!
			email: String!
			password: String
		): User
	}

	scalar Date

	type User {
		id: ID!
		name: String!
		surname: String!
		email: String!
		createdAt: Date!
		type: UserType!
		token: String
	}

	type Auth {
		id: ID!
		token: String!
	}

	input UserInput {
		name: String!
		surname: String!
		email: String!
		password: String
	}

	enum UserType {
		USER
		HOTEL
		ADMIN
	}
`;
