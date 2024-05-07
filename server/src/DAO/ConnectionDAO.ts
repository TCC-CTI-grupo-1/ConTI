import { connect, Client } from 'ts-postgres';
import * as hidden from '../hidden/hidden';

export class ConnectionDAO {
    private client: Promise<Client>;

    constructor() {
        this.client = connect({
            host: hidden.DBHost(),
            port: hidden.DBPort(),
            database: hidden.DBName(),
            user: hidden.DBUser(),
            password: hidden.decrypt(hidden.DBPassword())
        });
    }

    async getConnection(): Promise<Client> {
        const client = await this.client;
        return client;
    }
}