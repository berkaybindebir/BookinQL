import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
	roomType: {
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
		required: true
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

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
