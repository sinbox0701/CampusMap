import client from "../../client";
import { protectedResolver } from "../../User/User.utils";
import { uploadPhotos } from "../../utils";


export default {
    Mutation:{
        createFloor: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    name,
                    Image,
                    buildingName
                } = args;
                try{
                    if(loggedInUser.isManaged){
                        let imageUrl = null;
                        if(Image){
                            imageUrl = await uploadPhotos(Image,name,"Floor");
                        }
                        const newFloor = await client.floor.create({
                                data:{
                                    name,
                                    ...(imageUrl&&{Image:imageUrl}),
                                    building:{
                                        connect:{
                                            name:buildingName
                                        }
                                    }
                                }
                            });
                        if(newFloor.id){
                                return{
                                    ok:true
                                }
                        }else{
                            return{
                                    ok:false,
                                    error:"Floor 생성 실패!"
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
                        error: "createFloor Error!"
                    }
                }
            }
        )
    }
}