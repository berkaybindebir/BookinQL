import mongoose from "mongoose";

require("dotenv").config();
const { MLAB_USER, MLAB_PASSWORD, MONGO_URI } = process.env;

(async () => {
	try {
		await mongoose.connect(
			`mongodb://${MLAB_USER}:${MLAB_PASSWORD}@${MONGO_URI}`,
			{
				useNewUrlParser: true
			}
		);

		let collections = await mongoose.connection.db
			.listCollections()
			.toArray();
		collections.forEach(collection => {
			if (collection.name !== "system.indexes")
				mongoose.connection.dropCollection(collection.name);
		});
		console.log("DB dropped");
	} catch (e) {
		console.warn(e);
	}
})();
