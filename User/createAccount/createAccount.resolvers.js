import bcrypt from "bcrypt";
import client from "../../client";

export default {
    Mutation:{
        createAccount: async (_,args) => {
            const {
                name,
                studentId,
                password,
                idCard
            } = args;
        
            try{
                const exists = await client.user.findFirst({
                    where: {
                      studentId
                    }
                });
    
                if(exists){
                    throw new Error("이미 존재하는 학번입니다.");
                }
                else{
                    const hashedPassword = await bcrypt.hash(password,10);
    
                    return client.user.create({
                        data:{
                        name,studentId,password:hashedPassword,idCard
                        }
                    });
                }
            }catch(e){
               return e;
            }
        }
    }
}