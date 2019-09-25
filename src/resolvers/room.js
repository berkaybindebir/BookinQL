import { Hotel } from "../models";

export default {
	Query: {
		hotel: (root, { id }, contx, info) => {
			return Hotel.findById(id);
		},
		hotels: (root, args, contx, info) => {
			return Hotel.find({});
		}
	},
	Mutation: {
		createHotel: async (root, args, contx, info) => {
			let { name, country, city, address, rooms } = args;
			try {
				let hotel = await Hotel.create({
					name,
					country,
					city,
					address
				});
				hotel.rooms.push(rooms);
				return hotel;
			} catch (e) {
				console.log(e);
			}
		},
		addRoomToHotel: (root, args, contx, info) => {},
		setRoomStatus: (root, args, contx, info) => {}
	}
};
