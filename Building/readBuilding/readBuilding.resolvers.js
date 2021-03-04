import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query: {
        readBuilding: protectedResolver(
            async (_,{name}) => client.building.findUnique({
                where:{
                    name,
                }
            }),
        )
    },
};