// pkgs:
import mongoose from "mongoose";
import { Request, Response } from "express";

// utils:
import userRoles from "../../../common/constants/user-roles.const";
import Product from "../../../models/product.model";

// >>> delete
export const deleteProduct = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { userId, userRole } = req;
    const { id: _id } = req.params;

    if (!userId) {
        return res.status(401).json({ message: `Unauthenticated!!` });
    }

    if (userRole && userRole === userRoles.ADMIN) {
        return res
            .status(401)
            .json({ message: `You don't have the right access.` });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            res.status(404).json({
                message: `There is no products with provided id: ${_id}`,
            });

        await Product.findByIdAndRemove(_id);
        res.status(200).json({
            statue: `SUCCESS`,
            message: "products has been deleted successfully",
        });
    } catch (err) {
        res.status(400).json({
            statue: `FAILED`,
            message: "Failed to delete the products",
            error: err,
        });
    }
};
