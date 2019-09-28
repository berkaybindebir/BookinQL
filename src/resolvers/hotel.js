/* eslint-disable no-unused-vars */
import { Hotel } from "../models";

export default {
	Query: {
		hotel: (root, { id }, contx, info) => Hotel.getHotel(id),
		hotels: (root, args, contx, info) => Hotel.find({})
	},
	Mutation: {
		createHotel: async (root, args, contx, info) => Hotel.createHotel(args),
		addRoomToHotel: async (root, { id, rooms }, contx, info) =>
			Hotel.addRoomToHotel(id, rooms),
		bookRoom: (root, { roomID, reservation }, contx, info) =>
			Hotel.bookRoom(roomID, reservation)
	}
};
