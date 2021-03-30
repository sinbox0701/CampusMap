import client from "../client";

export default {
    Building:{
        floors: ({id}) => client.floor.findMany({
            where:{
                building:{
                    id
                }
            }
        })
    }
}