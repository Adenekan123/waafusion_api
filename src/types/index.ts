import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";

export interface AuthRequest extends Request {
    user?: JwtPayload | string | User; // Change 'any' to the actual user type if available
}