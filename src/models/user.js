import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: async email =>
				(await User.where({ email }).countDocuments()) === 0,
			message: () => "Email is already taken"
		}
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	type: {
		type: String,
		enum: ["USER", "HOTEL", "ADMIN"],
		default: "USER"
	},
	bookings: [{}]
});

userSchema.pre("save", async function() {
	const user = this;
	if (user.isModified("password")) {
		user.password = await hash(user.password, 10);
	}
});

userSchema.methods = {
	checkPassword: function(password) {
		return compare(password, this.password);
	},
	toJSON: function() {
		var obj = this.toObject();
		delete obj.password;
		return obj;
	}
};

const User = mongoose.model("User", userSchema);
export default User;
