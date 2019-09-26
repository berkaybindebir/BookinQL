/* eslint-disable no-unused-vars */
import { Hotel } from "../models";

export default {
	Query: {
		hotel: (root, { id }, contx, info) => Hotel.getHotel(id),
		hotels: (root, args, contx, info) => Hotel.find({})
	},
	Mutation: {
		createHotel: async (root, args, contx, info) => Hotel.createHotel(args),
		addRoomToHotel: async (root, args, contx, info) =>
			Hotel.addRoomToHotel(args.id, args.rooms),
		setRoomStatus: (root, { id, roomNumber, reservation }, contx, info) =>
			Hotel.bookRoom(id, roomNumber, reservation)
	}
};
