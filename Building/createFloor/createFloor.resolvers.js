import client from "../../client";
import { protectedResolver } from "../../User/User.utils";
import {createWriteStream} from "fs";

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
                        /// ---- AWS 연동 후 삭제 예정 ----
                        let imageUrl = null;
                        const {filename, createReadStream} = await Image;
                        const imageFile = `${name}-${Date.now()}-${filename}`;
                        const ReadStream = createReadStream();
                        const WriteStream = createWriteStream(process.cwd()+"/uploads/"+imageFile);
                        ReadStream.pipe(WriteStream);
                        imageUrl = `http://localhost/4000/static/${imageFile}`;
                        /// ---- AWS 연동 후 삭제 예정 ----

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


// floors:{
//     connectOrCreate: [
//         {
//             where
//         }
//     ]
// }