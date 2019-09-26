import Joi from "@hapi/joi";
import _ from "lodash";

function checkRoomNumbers(newRooms, allRooms = []) {
	let rooms = newRooms;
	if (allRooms) rooms = _.concat(allRooms, newRooms);

	const schema = Joi.array().unique("roomNumber");
	let isValid = schema.validate(rooms);
	return isValid;
}

module.exports = {
	checkRoomNumbers
};
