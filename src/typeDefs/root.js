import { gql } from "apollo-server-express";

export default gql`
  type Query {
    _: String
  }
  type Mutations {
    _: String
  }
  type Subscription {
    _: String
  }
`;