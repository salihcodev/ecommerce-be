// pks:
import cors from "cors";
import morgan from "morgan";
import express, { Express, Request, Response } from "express";

// utils:
import productsRouter from "./routes/product.router";
import userRoutes from "./routes/user.router";
import contactUs from "./routes/contact-us.router";
import newsLetterSubscription from "./routes/newsletter.router";
import apiVersions from "./common/constants/api-versions.const";

// *******
// >>> INITIALIZING EXPRESS APP:
export const app: Express = express();

// *******
// >>> APPLY THE MIDDLEWARES:
// use cors
app.use(cors());
// >>> parsing the body

app.use(express.json());
app.use(express.json());

// HTTPs logger:
app.use(morgan("tiny"));

export const API_VERSION: string = apiVersions.BASE;

// *******
// >>> SETUP ROUTES:
// initial routes, check the server is running::
app.get(`/test`, (req: Request, res: Response): void => {
    res.status(200).json({
        status: `SUCCESS`,
        message: `Ok! server is working well.`,
        api_version: API_VERSION,
    });
});

// >>> use implemented routers:
app.use(`${API_VERSION}/products`, productsRouter);
app.use(`${API_VERSION}/auth`, userRoutes);
app.use(`${API_VERSION}`, contactUs);
app.use(`${API_VERSION}`, newsLetterSubscription);
// *******
//
