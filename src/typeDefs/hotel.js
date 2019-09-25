import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        hotel(id: ID!): Hotel
        hotels: [Hotel!]
    },
    extend type Mutation {
        createHotel(name: String!, country: String!, city: String!, address: String! rooms: [CreateRoomInput]): Hotel
        addRoomToHotel(id: ID!, rooms: [CreateRoomInput!]): Hotel!
        setRoomStatus(id: ID!, status: Boolean!): Hotel!
    },
    type Hotel {
        id: ID!
        name: String!
        country: String!
        city: String!
        address: String!
        rooms: [Room]!
    }

    type Room {
        roomNumber: Int!
        type: String!
        price: Int!
        currency: String!
        available: Boolean!
    }

    input CreateRoomInput {
        roomNumber: Int!
        type: RoomTypes
        price: Int!
        currency: String!
        available: Boolean!
    }

    enum RoomTypes {
        STANDARD
        LUX
        ULTRA_LUX
        KING_SIZE
    }
`;