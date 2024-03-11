// import pks:
import jwt from "jsonwebtoken";
import config from "config";
import { NextFunction, Request, Response } from "express";

// get token secret key:
const _token: any = process.env.token || config.get("sec_keys.token");

// auth middleware controller:
const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        // get the token from coming req:
        const token = req.headers.authorization?.split(" ")[1];

        // verifying the coming token & store decoded token data
        let id: any;
        if (token) {
            const { id: _id }: any = jwt.verify(token, _token);
            id = _id;
        }

        // set user id value from verified custom token
        req.userId = id;

        next();
    } catch (err) {
        console.log({
            message: `Failed to verify the coming user's token`,
            error: err,
        });
    }
};

export default authMiddleware;
