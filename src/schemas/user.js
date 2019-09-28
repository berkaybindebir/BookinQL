import Joi from "@hapi/joi";

const passwordRegex = new RegExp(
	"^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,21}$"
);

const name = Joi.string()
	.max(254)
	.alphanum()
	.required()
	.label("Name");

const surname = Joi.string()
	.alphanum()
	.required()
	.label("Surname");

const email = Joi.string()
	.email()
	.required()
	.label("Email");

const password = Joi.string()
	.min(8)
	.max(21)
	.regex(passwordRegex)
	.label("Password");

export const signIn = Joi.object().keys({
	email,
	password
});

export const signUp = Joi.object().keys({
	name,
	surname,
	email,
	password
});
