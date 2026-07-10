import usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
async function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if (!authHeader ||
        !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
const accessToken =
        authHeader.split(" ")[1];
    try{
        const decode = jwt.verify(accessToken, config.JWT_SECRET);
        const user = await usermodel.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(401).json({message:"Unauthorized: User not found"});
        }

        req.user = user;

        next()

    }
    catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}
export {
    authMiddleware
}