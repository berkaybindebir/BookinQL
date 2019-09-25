import countries from "./countries.min.json";

module.exports = {
	getCountries: () => Object.keys(countries),
	getCityByCountry: country => countries[country]
};
