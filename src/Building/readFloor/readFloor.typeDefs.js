import {gql} from "apollo-server";

export default gql`
    type Query {
        readFloor(id: Int!): Floor!
    }
`;