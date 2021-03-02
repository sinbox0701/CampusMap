import { gql } from "apollo-server";

export default gql`
    type createAccountResult{
        ok:Boolean!
        error: String
    }

    type Mutation{
        createAccount(
            name: String!
            studentId: String!
            password: String!
            idCard: String!
        ): createAccountResult!
    }
`;