import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        removeUser: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    studentId
                } = args;
               if(loggedInUser.isManaged){
                   const deleteUser = await client.user.findUnique({where:{
                       studentId
                   }});
                   await client.user.delete({where:{
                       studentId,
                       id:deleteUser.id
                   }});
                   return{
                        ok:true
                    }
               }else{
                    return{
                        ok:false,
                        error:"삭제 실패"
                    }
                }
            }
        )
    }
}