import client from "../../client";
import { protectedResolver } from "../../User/User.utils";
import { uploadPhotos } from "../../utils";

export default {
    Mutation:{
        updateFloor: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    id,
                    name,
                    Image
                } = args;
                try{
                    if(loggedInUser.isManaged){
                        let imageUrl = null;
                        if(Image){
                            imageUrl = await uploadPhotos(Image,name,"Floor");
                            
                        }
                        const newFloor = await client.floor.update({
                            where:{
                                id
                            },
                            data:{
                                name,
                                ...(imageUrl&&{Image:imageUrl}),
                            }
                        });
                        if(newFloor.id){
                            return{
                                ok:true
                            }
                        }else{
                            return{
                                ok:false,
                                error:"Floor 업데이트 실패!"
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
                        error: e
                    }
                }
            }
        )
    }
}
