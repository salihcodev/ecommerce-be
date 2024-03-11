// pkgs:
import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "config";

// utils:
import parsingQueryProps from "../utils/parsing-query-props.util";
import {
    afterRegistrationMail,
    forgotPasswordMail,
} from "../../services/mail-sending.service";
const token: any = process.env.token || config.get("sec_keys.token");

export default class AuthFeatures {
    readonly request;
    readonly response;
    public modelQuery;

    constructor(modelQuery: any, request: Request, response: Response) {
        this.modelQuery = modelQuery;
        this.request = request;
        this.response = response;
    }

    async getAll(): Promise<void> {
        try {
            const result = await this.modelQuery.find().select("-password");
            this.response.status(200).json({
                statue: `SUCCESS`,
                results: result.length,
                data: result,
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Something went wrong, Please try again later`,
                error: err,
            });
        }
    }

    async getById(): Promise<any> {
        const { id } = this.request.params;
        const { fields }: any = this.request.query;

        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return this.response.status(404).json({
                    message: `No user registered with provided the id.`,
                });
            }

            const result = await this.modelQuery
                .findById(id)
                .select(parsingQueryProps(fields));

            this.response.status(200).json({
                statue: `SUCCESS`,
                results: result.length,
                data: result,
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Something went wrong, Please try again later`,
                error: err,
            });
        }
    }

    async login(): Promise<any> {
        const { email, password } = this.request.body;
        try {
            if (!email || !password) {
                return this.response.status(404).json({
                    message: `Please provide your credentials.`,
                });
            }

            const existedUser = await this.modelQuery.findOne({ email });
            if (!existedUser) {
                return this.response.status(404).json({
                    message: `No user registered with this email: ${email}`,
                });
            }

            const { password: currUserPass }: any = existedUser;
            const isPasswordCorrect = await bcrypt.compare(
                password,
                currUserPass
            );

            if (!isPasswordCorrect) {
                return this.response
                    .status(400)
                    .json({ message: `Invalid credentials` });
            }

            const userToken = jwt.sign(
                {
                    user: existedUser,
                    role: existedUser?.role,
                    id: existedUser?._id,
                },
                token,
                {
                    expiresIn: `1h`,
                }
            );

            this.response.status(200).json({
                statue: `SUCCESS`,
                data: {
                    user: {
                        id: existedUser._id,
                        name: existedUser.name,
                        email: existedUser.email,
                    },
                    accessToken: userToken,
                },
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Something went wrong`,
                error: err,
            });
        }
    }

    async signup(): Promise<any> {
        const {
            fullName,
            email,
            password: _password,
            confirmPassword,
        } = this.request.body;

        const restUserObjData: any = {};
        const ignoredFields = [
            "fullName",
            "email",
            "password",
            "confirmPassword",
        ];
        for (const [key, val] of Object.entries(this.request.body)) {
            if (!ignoredFields.includes(key)) {
                restUserObjData[key] = val;
            }
        }

        try {
            const existedUser = await this.modelQuery.findOne({ email });

            if (existedUser) {
                return this.response.status(400).json({
                    message: `This user is already existed: ${email}`,
                });
            }

            if (_password !== confirmPassword) {
                return this.response.status(400).json({
                    message: `Passwords not matched each other.`,
                });
            }

            const password = await bcrypt.hash(_password, 12);

            const createdUser = await this.modelQuery.create({
                email,
                password,
                fullName,
                ...restUserObjData,
            });

            const userToken = jwt.sign(
                {
                    email: createdUser,
                    role: createdUser?.role,
                },
                token,
                {
                    expiresIn: `1h`,
                }
            );

            // send a registration confirmation mail;
            const res = await afterRegistrationMail(email, fullName);
            if (res.status !== `ok`) {
                return this.response.status(400).json({
                    message: `Failed to send a registration email.`,
                    Error: res.msg,
                });
            }

            this.response.status(201).json({
                statue: `SUCCESS`,
                info: res.msg,
                data: {
                    user: {
                        id: createdUser._id,
                        name: createdUser.name,
                        email: createdUser.email,
                        ...restUserObjData,
                    },
                    accessToken: userToken,
                },
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Something went wrong`,
                error: err,
            });
        }
    }

    async terminate(): Promise<any> {
        const { id } = this.request.params;

        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return this.response.status(404).json({
                    message: `No user registered with provided the id.`,
                });
            }

            await this.modelQuery.findByIdAndRemove(id);

            this.response.status(200).json({
                statue: `SUCCESS`,
                message: `Deleted user successfully.`,
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Failed to delete the user.`,
                error: err,
            });
        }
    }

    async changeRole(): Promise<any> {
        const { id } = this.request.params;
        const { role } = this.request.query;

        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return this.response.status(400).json({
                    message: `No user registered with provided the id.`,
                });
            }

            const userToUpdateRole = await this.modelQuery.findById(id);

            userToUpdateRole.role = role;
            await userToUpdateRole.save();

            this.response.status(200).json({
                statue: `SUCCESS`,
                message: `Updated the user role successfully.`,
                data: userToUpdateRole,
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Failed to update the user role.`,
                error: err,
            });
        }
    }

    async changePassword(): Promise<any> {
        const { token: _token }: any = this.request.query;
        const { password: _password, confirmPassword }: any = this.request.body;

        try {
            if (_password !== confirmPassword) {
                return this.response.status(400).json({
                    message: `Passwords not matched each other.`,
                });
            }

            const { email }: any = jwt.verify(_token, token);
            const [userToUpdatePassword] = await this.modelQuery.find({
                email,
            });

            // generate new password salt.
            const password = await bcrypt.hash(_password, 12);

            userToUpdatePassword.password = password;
            await userToUpdatePassword.save();

            this.response.status(200).json({
                statue: `SUCCESS`,
                message: `Updated the user password successfully.`,
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Failed to update the user password.`,
                error: err,
            });
        }
    }

    async forgotPassword(): Promise<any> {
        const { email }: any = this.request.body;

        try {
            if (!email) {
                return this.response.status(400).json({
                    message: `Please provide an email.`,
                });
            }

            const [foundUser] = await this.modelQuery.find({ email });

            if (!foundUser) {
                return this.response.status(400).json({
                    message: `there's no user registered with email: ${email}`,
                });
            }

            const userToken = jwt.sign(
                {
                    email,
                    role: foundUser?.role,
                    id: foundUser?._id,
                },
                token,
                {
                    expiresIn: `1h`,
                }
            );

            const res = await forgotPasswordMail({
                name: foundUser?.name,
                toMail: email,
                token: userToken,
            });

            if (res.status !== `ok`) {
                return this.response.status(400).json({
                    message: `Failed to send reset password email`,
                    error: res.msg,
                });
            }

            this.response.status(200).json({
                statue: `SUCCESS`,
                message: `Successfully sent an E-mail with reset token.`,
                info: res.msg,
            });
        } catch (err) {
            this.response.status(500).json({
                message: `Failed to generate new token.`,
                error: err,
            });
        }
    }
}
