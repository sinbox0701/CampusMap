import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query: {
        seeBuildings: protectedResolver(
            async () => client.building.findMany()
        )
    },
};