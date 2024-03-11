// pkgs:
import { Request, Response } from "express";

// utils:
import userRoles from "../../../common/constants/user-roles.const";
import Product from "../../../models/product.model";

// >>> create
export const createNewProduct = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { userId, userRole } = req;

    if (!userId) {
        return res.status(401).json({ message: `Unauthenticated!!` });
    }

    if (userRole && userRole === userRoles.ADMIN) {
        return res
            .status(401)
            .json({ message: `You don't have the right access.` });
    }

    const productsToCreate = req.body;
    const newProduct = new Product({
        ...productsToCreate,
    });

    try {
        await newProduct.save();

        res.status(201).json({
            statue: `SUCCESS`,
            data: newProduct,
        });
    } catch (err) {
        res.status(409).json({
            message: `Something went wrong while creating new products, Please try again later.`,
            error: err,
        });
    }
};
