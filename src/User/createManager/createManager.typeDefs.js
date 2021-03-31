import { gql } from "apollo-server";

export default gql`
    type createManagerResult{
        ok:Boolean!
        error: String
    }

    type Mutation{
        createManager(
            name: String!
            studentId: String!
            password: String!
            major: String!
            isManaged: Boolean
            verified: Boolean
        ): createAccountResult!
    }
`;