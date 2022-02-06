import 'reflect-metadata';
import { DatabaseConnection } from './core/infra/database/connections/connection';
import { RedisConnection } from './core/infra/database/connections/redis';
import { initServer } from './core/presentation/server';

DatabaseConnection.initConnection()
    .then(() => {
        RedisConnection.initConnection();
        initServer();
    })
    .catch((error) => {
        console.log(error);
    });
