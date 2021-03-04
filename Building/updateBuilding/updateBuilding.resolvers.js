import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        updateBuilding: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    name,
                    lat,
                    lng
                } = args;
                try{
                    if(loggedInUser.isManaged){
                        const newBuilding = await client.building.update({
                            where:{
                                name
                            },
                            data:{
                                lat,
                                lng
                            }
                        })
                        if(newBuilding.id){
                            return {
                                ok:true
                            }
                        }else{
                            return{
                                ok:false,
                                error:"건물 정보 업데이트 실패."
                            }
                        }
                    }else{
                        return{
                            ok:false,
                            error:"접근 권한 없음!"
                        }
                    }
                }catch(e){
                    return {
                        ok: false,
                        error: e
                    }
                }
            }
        )
    }
}