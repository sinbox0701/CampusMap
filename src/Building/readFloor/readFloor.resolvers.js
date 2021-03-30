import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query: {
        readFloor: protectedResolver(
            async (_,{id}) => client.floor.findUnique({
                where:{
                    id
                }
            })
        )
    },
};