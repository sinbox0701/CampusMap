import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async(_,args) => {
            const {studentId, password} = args;
            const user = await client.user.findFirst({
                where:{studentId}
            })
            if(!user){
                return {
                    ok:false,
                    error: "등록된 학번이 없습니다."
                };
            }
            const checkPassword = await bcrypt.compare(password,user.password);
            if(!checkPassword){
                return {
                    ok:false,
                    error: "비밀번호가 맞지 않습니다."
                };
            }
            if(user.verified === false){
                return {
                    ok: false,
                    error: "인증이 완료되지 않았습니다."
                }
            }
            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY);
            return {
                ok:true,
                token
            };
        }
    },
};