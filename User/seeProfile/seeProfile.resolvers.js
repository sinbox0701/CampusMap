import client from "../../client";

export default {
    Query: {
        seeProfile: (_,{studentId}) => client.user.findUnique({
            where:{
                studentId,
            }
        }),
    },
};