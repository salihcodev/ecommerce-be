// pkgs:
import config from "config";
import nodemailer from "nodemailer";
import REGISTRATION_CONFIRMATION from "../common/templates/registration-confirmation.temp";
import RESET_PASSWORD from "../common/templates/reset-password.temp";
import CONTACT_US from "../common/templates/contactus.temp";

// get local vars:
const email_user: any =
    process.env.email_user || config.get("services.email_user");
const email_pass: any =
    process.env.email_pass || config.get("services.email_pass");

const TRANSPORTER = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: email_user,
        pass: email_pass,
    },
});

export const afterRegistrationMail = async (
    toMail: string,
    firstName: string
): Promise<any> => {
    try {
        const info = await TRANSPORTER.sendMail({
            from: email_user,
            to: toMail,
            subject: `Welcome to Aggri-Sence.com`,
            html: REGISTRATION_CONFIRMATION.replace(
                `{{firstName}}`,
                firstName
            ).replace(`{{email}}`, toMail),
        });

        return { status: `ok`, msg: info.response };
    } catch (err: any) {
        console.log(`Failed to send a registration email: ${err.response}`); // logger
        return { status: `error`, msg: err.response };
    }
};

export const contactUsMail = async (data: any): Promise<any> => {
    const { name, fromMail, message } = data;

    try {
        const info = await TRANSPORTER.sendMail({
            from: fromMail,
            to: email_user,
            subject: `${name} sent a message`,
            html: CONTACT_US.replace(`{{name}}`, name)
                .replace(`{{email}}`, fromMail)
                .replace(`{{message}}`, message),
        });

        return { status: `ok`, msg: info.response };
    } catch (err: any) {
        console.log(`Failed to contact: ${err.response}`); // logger
        return { status: `error`, msg: err.response };
    }
};

export const forgotPasswordMail = async (data: any): Promise<any> => {
    const { name, toMail, token } = data;

    try {
        const info = await TRANSPORTER.sendMail({
            from: email_user,
            to: toMail,
            subject: `Password Reset Instructions`,
            html: RESET_PASSWORD.replace(`{{name}}`, name).replace(
                `{{token}}`,
                token
            ),
        });

        return { status: `ok`, msg: info.response };
    } catch (err: any) {
        console.log(`Failed to send a token email: ${err.response}`); // logger
        return { status: `error`, msg: err.response };
    }
};
