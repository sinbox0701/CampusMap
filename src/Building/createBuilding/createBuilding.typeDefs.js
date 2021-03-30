import { gql } from "apollo-server";

export default gql`
    type createBuildingResult{
        ok:Boolean!
        error: String
    }

    type Mutation{
        createBuilding(
            name: String!
            lat: String!
            lng: String!
        ): createBuildingResult!
    }
`;