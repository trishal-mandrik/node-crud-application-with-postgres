const config = {
    dbUsername: process.env.DATABASE_USERNAME,
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    dbPort: parseInt(process.env.DATABASE_PORT),
}

module.exports = config;