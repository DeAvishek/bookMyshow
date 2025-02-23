import { DefaultSession }from "next-auth"
declare module "next-auth" {
     interface User{
        _id?:string,
        eamil?:string,
    }
     interface Session{
        user:{
            _id?:string
        }& DefaultSession["user"]
        
    }
}