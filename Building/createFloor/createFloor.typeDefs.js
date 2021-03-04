import { gql } from "apollo-server";

export default gql`
    type createFloorResult{
        ok:Boolean!
        error: String
    }

    type Mutation{
        createFloor(
            name: String!
            Image: Upload
            buildingName: String!
        ): createFloorResult!
    }
`;