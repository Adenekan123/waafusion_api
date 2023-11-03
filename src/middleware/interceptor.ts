import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRETE_KEY = process.env.SECRET_KEY || "";
interface AuthRequest extends Request {
    user: JwtPayload | string | undefined; // Change 'any' to the actual user type if available
}
export const interceptor = (req:AuthRequest,res:Response,next:NextFunction) =>{
  const token = req.header('Authorization')?.split(' ')[1];

  if(token){
    jwt.verify(token,SECRETE_KEY,(err,user)=>{
      if(!err){
        req.user = user
      }
      next();
    })
  }else{
    next()
  }
}