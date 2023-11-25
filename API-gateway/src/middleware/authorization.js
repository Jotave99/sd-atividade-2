import jwt from "jsonwebtoken";
import {randomBytes} from "node:crypto";
import {config} from "dotenv";

config();

export const locals = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
}

export const authenticate = async(req, res, next) => {
    const {access_token} = req.cookies;

    if (access_token){
        try {
            const [, token] = access_token.split(" ");

            await jwt.verify(token, process.env.SECRET);

            return next();
        } catch(err){
            console.log(err);
            res.redirect("/");
        }
    } else {
        req.session.user = null;
        return res.redirect("/")
    }
}