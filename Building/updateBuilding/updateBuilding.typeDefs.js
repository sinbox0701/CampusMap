import { gql } from "apollo-server";

export default gql`
    type updateBuildingResult {
        ok: Boolean!
        error: String
    }

    type Mutation{
        updateBuilding(
            name: String
            lat: String
            lng: String
            floorName: String
            Image: Upload
        ):updateBuildingResult!
    }
`;