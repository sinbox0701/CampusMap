import {gql} from "apollo-server";

export default gql`
    type Query {
        readBuilding(name: String!): Building!
    }
`;