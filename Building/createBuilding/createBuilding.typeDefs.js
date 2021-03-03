import { gql } from "apollo-server";

export default gql`
    type createBuildingResult{
        ok:Boolean!
        error: String
    }

    type Mutation{
        createBuilding(
            name: String!
            lat: Float!
            lng: Float!
        ): createBuildingResult!
    }
`;