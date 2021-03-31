import bcrypt from "bcrypt";
import client from "../../client";
import { uploadPhotos } from "../../utils";

export default {
    Mutation:{
        createManager: async (_,args) => {
            const {
                name,
                studentId,
                password,
                major,
                isManaged,
                verified
            } = args;
            
            try{
                const exists = await client.user.findFirst({
                    where: {
                      studentId
                    }
                });
                if(exists){
                    return {
                        ok:false,
                        error:"이미 존재하는 학번입니다."   
                    }
                }
                else{
                    const newUser = await client.user.create({
                        data:{
                            name,
                            studentId,
                            password:hashedPassword,
                            major,
                            idCard:"default",
                            isManaged,
                            verified
                        }
                    });

                    if(newUser.id){
                        return {
                            ok:true
                        }
                    }else{
                        return{
                            ok:false,
                            error:"계정 생성 실패!"
                        }
                    }
                }
            }catch(e){
               return e;
            }
        }
    }
}