import {gql} from "apollo-server";

export default gql`
    type User {
        id: Int!
        name: String!
        studentId: String!
        password: String!
        idCard: String!
        verified: Boolean! 
        createdAt: String! 
        updatedAt: String! 
    }

    type Query {
        seeProfile(username: String!): User
    }

    type Mutation {
        createAccount(
            name: String!
            studentId: String!
            password: String!
            idCard: String!
        ): User
    }
`;