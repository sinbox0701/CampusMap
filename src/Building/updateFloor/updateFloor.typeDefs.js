import { gql } from "apollo-server";

export default gql`
    type updateFloorResult{
        ok:Boolean!
        error: String
    }

    type Mutation{
        updateFloor(
            id:Int!
            name: String
            Image: Upload
        ): updateFloorResult!
    }
`;