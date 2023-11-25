import { getGoogleUser } from "./getUser.js";
import jwt from "jsonwebtoken";
import {config} from "dotenv";

config();

export const login = async(req, res) => {
    const {credential} = req.body;

    const user = await getGoogleUser(credential);

    const token = jwt.sign({userId: user.sub}, process.env.JWT_SECRET, { expiresIn: 3600 });

    const tokenBearer = `Bearer ${token}`;

    res.cookie('access_token', tokenBearer, {maxAge: 3600000, httponly: false});
	res.set('Authorization', tokenBearer);

    return res.json({user, token});
}

export const logout = async(req, res) => {
    req.session.destroy();

    res.clearCookie("access_token");
    res.redirect("/");
}

export const locals = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
}

export const authenticate = async(req, res, next) => {
    const {access_token} = req.cookies;

    if (access_token){
        try {
            const [, token] = access_token.split(" ");

            await jwt.verify(token, process.env.JWT_SECRET);

            return next();
        } catch(err){
            console.log(err);
            res.redirect("/");
        }
    } else {
        req.session.user = null;
        return res.redirect("/login")
    }
}