import {gql} from "apollo-server";

export default gql`
    type Query {
        seeProfile(studentId: String!): User
    }
`;