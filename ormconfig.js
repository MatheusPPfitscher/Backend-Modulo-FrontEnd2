require("dotenv/config");

if (process.env.NODE_ENV === "prod") {
    let config = {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [process.env.ENTITIES_DIR],
        migrations: [process.env.MIGRATIONS_DIR],
        cli: {
            entitiesDir: "dist/core/infra/database/entities",
            migrationsDir: "dist/core/infra/database/migrations",
        },
        synchronize: false,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    };
}

if (process.env.NODE_ENV === "dev") {
    let config = {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [process.env.ENTITIES_DIR],
        migrations: [process.env.MIGRATIONS_DIR],
        cli: {
            entitiesDir: "src/core/infra/database/entities",
            migrationsDir: "src/core/infra/database/migrations",
        },
        synchronize: false,
    };
}

if (process.env.NODE_ENV === "test") {
    config = {
        type: "sqlite",
        database: "./dbtest.sqlite",
        entities: [process.env.ENTITIES_DIR],
        migrations: ["tests/core/infra/database/migrations/**/*.ts"],
        cli: {
            entitiesDir: "src/core/infra/database/entities",
            migrationsDir: "tests/core/infra/database/migrations",
        },
        synchronize: false,
    };
}

module.exports = config;
