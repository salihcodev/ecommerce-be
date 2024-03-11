// pkgs:
import { Request, Response } from "express";

// utils:
import { contactUsMail } from "../../services/mail-sending.service";

export const handelContactUsForm = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { name, fromMail, message } = req.body;

        const _res = await contactUsMail({
            name,
            fromMail,
            message,
        });

        if (_res.status !== `ok`) {
            return res.status(400).json({
                message: `Failed to send reset password email`,
                error: _res.msg,
            });
        }

        res.status(200).json({
            status: "ok",
            message: `Thanks, We received your message.`,
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: `Could not to send your email, Please retry again.`,
            error: err,
        });
    }
};
