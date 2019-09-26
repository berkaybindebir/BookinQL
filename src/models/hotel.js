/* eslint-disable no-unreachable */
import mongoose, { Schema } from "mongoose";
import { getCountries, getCityByCountry } from "../utils/countries";
import _ from "lodash";
import { checkRoomNumbers } from "../validator";

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
	currency: {
		type: String,
		enum: ["USD", "EUR", "TL"]
	},
	available: {
		type: Boolean,
		default: false
	}
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
	rooms: [roomSchema]
});

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

async function getHotel(id) {
	let hotel = Hotel.findById(id);
	return hotel.sort("rooms -roomNumber");
}

// async function bookRoom(hotelID, room)

hotelSchema.statics = {
	getHotel,
	addRoomToHotel,
	createHotel
};

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
