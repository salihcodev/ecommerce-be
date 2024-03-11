// pkgs:
import { Request, Response } from "express";
import AuthFeatures from "../../common/shared/auth-features.shared";
import User from "../../models/user.model";

// utils:

export const getRegisteredUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    await new AuthFeatures(User, req, res).getAll();
};

export const signinHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    await new AuthFeatures(User, req, res).login();
};

export const signupHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    await new AuthFeatures(User, req, res).signup();
};

export const updateUserRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    await new AuthFeatures(User, req, res).changeRole();
};

export const forgotPassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    await new AuthFeatures(User, req, res).forgotPassword();
};

export const changePassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    await new AuthFeatures(User, req, res).changePassword();
};

export const terminateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    await new AuthFeatures(User, req, res).terminate();
};
