// pkgs:
import { Request, Response } from "express";

// utils:
import APIFeaturesBuilder from "../../../common/shared/api-features-builder.shared";
import Product from "../../../models/product.model";

// >>> read all
export const getAllProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const apiPipsResult = new APIFeaturesBuilder(Product.find(), req.query)
            .filtering()
            .sorting()
            .selectingFields()
            .paginating();
        const Products = await apiPipsResult.modelQuery;

        // Total items --> no filters
        const _totalCollection = await Product.find();
        res.json({
            statue: `SUCCESS`,
            results: Products.length,
            count: _totalCollection.length,
            data: Products,
        });
    } catch (err) {
        res.status(400).json({
            message: `Could not find any products.`,
            error: err,
        });
    }
};

// >>> get certain one:
export const getSingleProductById = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { id } = req.params;

    try {
        const result = await Product.findById({ id });

        res.status(200).json({
            statue: `SUCCESS`,
            data: result,
        });
    } catch (err) {
        res.status(404).json({
            message: `Could not find products with id: ${id}`,
        });
    }
};
