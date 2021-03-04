import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        updateBuilding: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    name,
                    lat,
                    lng,
                    floorName,
                    Image
                } = args;
                try{
                    if(loggedInUser.isManaged){
                        const oldBuilding = await client.building.findUnique({
                            where:{
                                name
                            }
                        })
                        console.log(oldBuilding.name)
                        if(oldBuilding.id){
                             /// ---- AWS 연동 후 삭제 예정 ----
                             let imageUrl = null;
                             const {filename, createReadStream} = await Image;
                             const imageFile = `${floorName}-${Date.now()}-${filename}`;
                             const ReadStream = createReadStream();
                             const WriteStream = createWriteStream(process.cwd()+"/uploads/"+imageFile);
                             ReadStream.pipe(WriteStream);
                             imageUrl = `http://localhost/4000/static/${imageFile}`;
                             /// ---- AWS 연동 후 삭제 예정 ----

                            const oldFloor = await client.floor.findFirst({
                                where:{
                                    name:floorName
                                }
                            })
                            console.log(oldFloor.name)
                            if(oldFloor.id){
                                const newBuilding = await client.building.update({
                                    where:{
                                        name
                                    },
                                    data:{
                                        name,
                                        lat,
                                        lng
                                    }
                                })
                                console.log(newBuilding.name)
                                const newFloor = await client.floor.update({
                                    where:{
                                        id:oldFloor.id
                                    },
                                    data:{
                                        name:floorName,
                                        ...(imageUrl&&{Image:imageUrl}),
                                        building:{
                                            connect:{
                                                name:newBuilding.name
                                            }
                                        }
                                    }
                                })
                                console.log(newFloor.name)
                                if(newFloor.id){
                                    return{
                                        ok:true
                                    }
                                }else{
                                    return{
                                        ok:false,
                                        error:"Floor 생성 실패"
                                    }
                                }
                                
                            }else{
                                return{
                                    ok:false,
                                    error:"Floor가 존재하지 않음!"
                                }
                            }
                        }else{
                            return{
                                ok:false,
                                error:"건물이 존재하지 않습니다."
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