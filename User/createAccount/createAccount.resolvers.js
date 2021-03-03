import {createWriteStream} from "fs";
import bcrypt from "bcrypt";
import client from "../../client";

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
                /// ---- AWS 연동 후 삭제 예정 ----
                let idCardUrl = null;
                const {filename, createReadStream} = await idCard;
                const idCardFile = `${studentId}-${Date.now()}-${filename}`;
                const ReadStream = createReadStream();
                const WriteStream = createWriteStream(process.cwd()+"/uploads/"+idCardFile);
                ReadStream.pipe(WriteStream);
                idCardUrl = `http://localhost/4000/static/${idCardFile}`;
                /// ---- AWS 연동 후 삭제 예정 ----
                if(exists){
                    throw new Error("이미 존재하는 학번입니다.");
                }
                else{
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