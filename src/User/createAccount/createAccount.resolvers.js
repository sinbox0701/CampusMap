import bcrypt from "bcrypt";
import client from "../../client";
import { uploadPhotos } from "../../utils";

export default {
    Mutation:{
        createAccount: async (_,args) => {
            const {
                name,
                studentId,
                password,
                major,
                idCard
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
                    let idCardUrl = null;
                    idCardUrl = await uploadPhotos(idCard,studentId,"User");
                    
                    const hashedPassword = await bcrypt.hash(password,10);

                    const newUser = await client.user.create({
                        data:{
                            name,
                            studentId,
                            password:hashedPassword,
                            major,
                            ...(idCardUrl && {idCard:idCardUrl})
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