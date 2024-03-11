// pkgs:
import mongoose from "mongoose";
import { Request, Response } from "express";

// utils:
import userRoles from "../../../common/constants/user-roles.const";
import Product from "../../../models/product.model";

// >>> update
export const updateProduct = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { userId, userRole } = req;

    if (!userId) {
        return res.status(401).json({
            statue: `FAILED`,
            message: `Unauthenticated!!`,
        });
    }

    if (userRole && userRole === userRoles.CUSTOMER) {
        return res.status(401).json({
            statue: `FAILED`,

            message: `You don't have the right access.`,
        });
    }

    const { id: _id } = req.params;
    const productsToUpdate = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).json({
                statue: `FAILED`,
                message: `There's no products with ID: ${_id}`,
            });

        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            { ...productsToUpdate, _id },
            { new: true } // to return a new version
        );

        res.json({
            statue: `SUCCESS`,
            data: {
                updatedProduct,
            },
        });
    } catch (err) {
        res.status(400).json({
            statue: `FAILED`,
            message: "Failed to update the products",
            error: err,
        });
    }
};
