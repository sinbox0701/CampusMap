import {gql} from "apollo-server";

export default gql`
    type User {
        id: Int!
        name: String!
        studentId: String!
        password: String!
        major: String!
        idCard: String!
        verified: Boolean!
        isManaged: Boolean! 
        createdAt: String! 
        updatedAt: String! 
    }    
`;