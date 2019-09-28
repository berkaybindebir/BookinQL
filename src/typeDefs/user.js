import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		currentUser: Auth!
		user(id: ID!): User
		users: [User]
	}
	extend type Mutation {
		signIn(email: String!, password: String!): Auth
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
		password: String!
		createdAt: Date!
		type: UserType!
	}

	type Auth {
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
