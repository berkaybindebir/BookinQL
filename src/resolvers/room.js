/* eslint-disable no-unused-vars */
import { Hotel } from "../models";

export default {
	Query: {
		hotel: (root, { id }, contx, info) => Hotel.findById(id),
		hotels: (root, args, contx, info) => Hotel.find({})
	},
	Mutation: {
		createHotel: async (root, args, contx, info) => Hotel.createHotel(args),
		addRoomToHotel: async (root, args, contx, info) =>
			Hotel.addRoomToHotel(args.id, args.rooms),
		setRoomStatus: (root, args, contx, info) => {}
	}
};
