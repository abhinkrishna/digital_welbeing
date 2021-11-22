import { ConnectionOptions, createConnection } from "typeorm"

const initDatabaseConnection = async (mongoConfig: ConnectionOptions) => {
    return await createConnection(mongoConfig);
}

export default initDatabaseConnection;