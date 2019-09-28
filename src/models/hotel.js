/* eslint-disable no-unreachable */
import mongoose, { Schema } from "mongoose";
import { getCountries, getCityByCountry } from "../utils/countries";
import { checkRoomNumbers, isReservationDateValid } from "../utils/validator";

const roomSchema = new Schema({
	roomNumber: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		enum: ["STANDARD", "LUX", "ULTRA_LUX", "KING_SIZE"],
		default: "STANDARD"
	},
	price: {
		type: Number
	},
	reservations: [
		{
			from: String,
			to: String
		}
	]
});

const hotelSchema = new Schema({
	name: String,
	country: {
		type: String,
		required: true,
		enum: getCountries()
	},
	city: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		enum: ["USD", "EUR", "TL"]
	},
	rooms: [roomSchema]
});

async function getHotel(id) {
	let hotel = Hotel.findById(id);
	return hotel.sort("rooms -roomNumber");
}

async function addRoomToHotel(hotelID, newRooms) {
	try {
		let hotel = await Hotel.findById(hotelID);
		let rooms = hotel.rooms;
		let { error = "" } = checkRoomNumbers(newRooms, rooms);

		if (!hotel) throw new Error("Hotel is not exist");
		if (error) throw new Error(error);
		rooms.push(...newRooms);

		return await hotel.save();
	} catch (e) {
		console.error(e);
	}
}

async function createHotel(newHotel) {
	try {
		let { error = "" } = checkRoomNumbers(newHotel.rooms);
		let allowedCities = getCityByCountry(newHotel.country);
		if (error) throw new Error(error);
		if (allowedCities && allowedCities.includes(newHotel.city)) {
			let hotel = await Hotel.create(newHotel);
			return hotel;
		} else {
			throw new Error("The Given City or Country not valid");
		}
	} catch (e) {
		console.error(e);
	}
}

async function bookRoom(roomID, reservation) {
	let { from, to } = reservation;
	let { isValidFrom, isValidTo } = isReservationDateValid(from, to);
	try {
		if (isValidFrom.error || isValidTo.error) {
			throw new Error("The Given Dates are not invalid");
		} else {
			return await Hotel.findOneAndUpdate(
				{ rooms: { $elemMatch: { _id: roomID } } },
				{ $push: { "rooms.$.reservations": { from, to } } },
				{ new: true }
			);
		}
	} catch (e) {
		console.error(e);
	}
}

hotelSchema.statics = {
	getHotel,
	addRoomToHotel,
	createHotel,
	bookRoom
};

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
