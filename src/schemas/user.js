import Joi from "@hapi/joi";

const passwordRegex = new RegExp(
	"^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,21}$"
);
export default Joi.object().keys({
	name: Joi.string()
		.max(254)
		.alphanum()
		.required()
		.label("Name"),
	surname: Joi.string()
		.alphanum()
		.required()
		.label("Surname"),
	email: Joi.string()
		.email()
		.required()
		.label("Email"),
	password: Joi.string()
		.min(8)
		.max(21)
		.regex(passwordRegex)
		.label("Password")
});
