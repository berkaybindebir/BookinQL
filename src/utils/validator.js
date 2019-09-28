import Joi from "@hapi/joi";
import _ from "lodash";

function checkRoomNumbers(newRooms, allRooms = []) {
	let rooms = newRooms;
	if (allRooms) rooms = _.concat(allRooms, newRooms);

	const schema = Joi.array().unique("roomNumber");
	let isValid = schema.validate(rooms);
	return isValid;
}

function isReservationDateValid(from, to) {
	const schema = Joi.date().min(Date.now());
	let isValidFrom = schema.validate(from);
	let isValidTo = schema.min(from).validate(to);
	return { isValidFrom, isValidTo };
}

module.exports = {
	checkRoomNumbers,
	isReservationDateValid
};
