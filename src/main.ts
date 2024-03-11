process.env.NODE_ENV = "development";

// pks:
import config from "config";
import mongoose from "mongoose";

// utils:

// *******
// get the app which's pre-configured to be ready to run.
import { app } from "./app";
import swaggerDocs from "./swagger";
//
//

// >>> env vars configuration
const connection_uri: any =
    process.env.connection_uri || config.get("db.connection_uri");

const _port: any = config.get("server.port");

const port = process.env.PORT || _port;

// >>> CONNECTING TO THE DATABASE:
const connectWithDB = async () => {
    try {
        await mongoose.connect(connection_uri, {
            dbName: "ecommerce",
        });

        // >>> listen to the app
        app.listen(port, () => {
            console.log(`Successfully connected to the db.`);
            console.log(`App running on http://localhost:${port}`);
        });
        swaggerDocs(app, port);
    } catch (err) {
        console.error(err);
    }
};

// connection to the db elegantly:
(async (connectionTries = 5) => {
    while (connectionTries) {
        try {
            await connectWithDB();
            break;
        } catch (error) {
            console.error(error);
            connectionTries -= 1;

            // wait 5sec. until firing another new DB connecting try.
            await new Promise((res) => setTimeout(res, 5000));
        }
    }
})();

// *******
//
