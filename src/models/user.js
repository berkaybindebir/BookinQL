import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";

const userSchema = new Schema(
	{
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
	},
	{
		toJSON: {
			transform: function(doc, ret) {
				delete ret.password;
			}
		}
	}
);

userSchema.pre("save", async function() {
	const user = this;
	if (user.isModified("password")) {
		user.password = await hash(user.password, 10);
	}
});

async function createUser(user) {
	console.log(user);
	return await User.create(user);
}

async function checkPassword(password) {
	const user = this;
	return await compare(password, user.password);
}

userSchema.statics = {
	createUser,
	checkPassword
};

const User = mongoose.model("User", userSchema);
export default User;
