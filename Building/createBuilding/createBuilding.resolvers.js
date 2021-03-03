import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        createBuilding: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    name,
                    lat,
                    lng
                } = args;
                try{
                    if(loggedInUser.isManaged){
                        const exists = await client.building.findFirst({
                            where:{
                                name
                            }
                        });
                        console.log(exists);
                        if(exists){
                            return {
                                ok:false,
                                error: "이미 데이터가 있습니다"
                            }
                        }
                        else{
                            const newBuilding = await client.building.create({
                                data:{
                                    name,
                                    lat,
                                    lng
                                }
                            });
                            if(newBuilding.id){
                                return{
                                    ok:true
                                }
                            }else{
                                return{
                                    ok:false,
                                    error:"건물 생성 실패!"
                                }
                            }
                        }
                    }else{
                        return {
                            ok:false,
                            error:"권한 없음!"
                        }
                    }
                }catch(e){
                    return {
                        ok: false,
                        error: "createBuilding Error!"
                    }
                }
            }
        )
    }
}