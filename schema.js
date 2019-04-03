import {gql} from 'apollo-server';

export default gql`
  type Continent {
    code: String
    name: String
    countries: [Country]
  }

  type Country {
    code: String
    name: String
    native: String
    phone: String
    continent: Continent
    currency: String
    languages: [Language]
    emoji: String
    emojiU: String
    isFavorite: Boolean
  }

  type Language {
    code: String
    name: String
    native: String
    rtl: Int
  }

  type Query {
    continents: [Continent]
    continent(code: String): Continent
    countries(offset: Int, first: Int): [Country]
    country(code: String): Country
    languages: [Language]
    language(code: String): Language
  }

  type Mutation {
    markAsFavorite(code: String): Country
    unmarkAsFavorite(code: String): Country
  }
`;
