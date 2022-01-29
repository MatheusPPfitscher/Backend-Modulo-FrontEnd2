import 'reflect-metadata';
import { DatabaseConnection } from './core/infra/database/connections/connection';
import { initServer } from './core/presentation/server';

DatabaseConnection.initConnection()
    .then(() => {
        initServer();
    })
    .catch((error) => {
        console.log(error);
    });
