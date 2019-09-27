import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		hotel(id: ID!): Hotel
		hotels: [Hotel!]
	}
	extend type Mutation {
		createHotel(
			name: String!
			country: String!
			city: String!
			address: String!
			rooms: [CreateRoomInput]
		): Hotel
		addRoomToHotel(id: ID!, rooms: [CreateRoomInput!]): Hotel!
		bookRoom(roomID: ID!, reservation: ReservationInput): Hotel!
	}
	type Hotel {
		id: ID!
		name: String!
		country: String!
		city: String!
		address: String!
		currency: String!
		rooms: [Room]!
	}

	type Room {
		id: ID!
		roomNumber: Int!
		type: String!
		price: Int!
		reservations: [Reservation]
	}

	type Reservation {
		from: String!
		to: String!
	}

	input CreateRoomInput {
		roomNumber: Int!
		type: RoomTypes
		price: Int!
		currency: String!
		reservations: [ReservationInput!]
	}

	input ReservationInput {
		from: String!
		to: String!
	}

	enum RoomTypes {
		STANDARD
		LUX
		ULTRA_LUX
		KING_SIZE
	}
`;
