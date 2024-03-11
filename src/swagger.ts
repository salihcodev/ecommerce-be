import { Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Agricultures Assistant API",
            description: "API endpoints for a agricultures service",
            contact: {
                name: "Ahmad Salih",
                email: "ahmedsalihdev@gmail.com",
                url: "https://asalih.vercel.app/hiring",
            },
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:9000",
                description: "Local server",
            },
            {
                url: "https://agri-asst.onrender.com",
                description: "Live server",
            },
        ],
        components: {
            schemas: {
                UserSignup: {
                    type: "object",
                    required: [
                        "fullName",
                        "email",
                        "password",
                        "confirmPassword",
                        "nationalId",
                        "phone",
                    ],
                    properties: {
                        fullName: {
                            type: "string",
                            description: "The full name of the user",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "The email address of the user",
                        },
                        password: {
                            type: "string",
                            description: "The user's password",
                        },
                        confirmPassword: {
                            type: "string",
                            description: "Confirm password",
                            minLength: 8,
                        },
                        nationalId: {
                            type: "string",
                            description: "The national ID of the user",
                        },
                        phone: {
                            type: "string",
                            description: "The phone number of the user",
                        },
                    },
                },
                UserSignin: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                    },
                },
                ContactUsFormData: {
                    type: "object",
                    required: ["name", "email", "message"],
                    properties: {
                        name: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                            format: "email",
                        },
                        message: {
                            type: "string",
                        },
                    },
                },
                NewproductsData: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                    },
                    required: ["name", "description", "date"],
                },
                UpdateproductsData: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                    },
                },
                NewActPlan: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                    },
                    required: ["name", "description", "date"],
                },
                UpdatePlanData: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },

    // looks for configuration in specified directories
    apis: [`./src/routes/*.ts`],
};

const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app: any, port: any) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Documentation in JSON format
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}
export default swaggerDocs;
