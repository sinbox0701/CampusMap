import client from "../../client";

export default {
    Query: {
        seeProfile: async (_,{studentId}) => client.user.findUnique({
            where:{
                studentId,
            }
        }),
    },
};