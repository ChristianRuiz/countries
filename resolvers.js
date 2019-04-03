const favoriteCountries = {};

function byCode(code) {
  return item => item.code === code;
}

function mapCountry(country) {
  return {
    ...country,
    isFavorite: favoriteCountries[country.code] || false
  };
}

export default {
  Country: {
    continent: (country, args, {continents}) =>
      continents.find(continent => continent.code === country.continent),
    languages: (country, args, {languages}) =>
      languages.filter(language => country.languages.includes(language.code))
  },
  Continent: {
    countries: (continent, args, {countries}) =>
      countries
        .filter(country => country.continent === continent.code)
        .map(mapCountry)
  },
  Query: {
    continent: (parent, args, {continents}) =>
      continents.find(byCode(args.code)),
    continents: (parent, args, {continents}) => continents,
    country: (parent, args, {countries}) =>
      mapCountry(countries.find(byCode(args.code))),
    countries: (parent, args, {countries}) => {
      const first = args.first || 5;
      const offset = args.offset || 0;

      const countriesToReturn =
        args.first || args.offset
          ? countries.slice(offset, offset + first)
          : countries;

      return countriesToReturn.map(mapCountry);
    },
    language: (parent, args, {languages}) => languages.find(byCode(args.code)),
    languages: (parent, args, {languages}) => languages
  },
  Mutation: {
    markAsFavorite: (parent, args, {countries}) => {
      favoriteCountries[args.code] = true;
      return mapCountry(countries.find(byCode(args.code)));
    },
    unmarkAsFavorite: (parent, args, {countries}) => {
      favoriteCountries[args.code] = false;
      return mapCountry(countries.find(byCode(args.code)));
    }
  }
};
