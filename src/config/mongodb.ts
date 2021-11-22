import { ConnectionOptions } from "typeorm";

const mongoConfig: ConnectionOptions = {
    name: "default" as string,
    type: "mongodb" as "mongodb",
    url: process.env.MONGODB_CONNECTION_URL as string,
    database: process.env.MONGODB_DATABASE as string,
    synchronize: (process.env.NODE_ENV === "production" ? false : true) as boolean,
    logging: false,
    cache: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: [
        __dirname + "/../**/*.entity{.ts,.js}",
    ],
    migrations: [],
    subscribers: []
}

export default mongoConfig;