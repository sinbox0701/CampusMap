import {gql} from "apollo-server";

export default gql`
    type Building {
        id: Int!
        name: String!
        lat: String!
        lng: String!
        floors: [Floor]
        createdAt: String!
        updatedAt: String! 
    }
    type Floor {
        id: Int!
        name: String!
        Image: String
        building: Building!
        buildingId: Int!
        createdAt: String!
        updatedAt: String!
    }
`;