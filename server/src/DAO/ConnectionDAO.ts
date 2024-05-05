import { connect, Client } from 'ts-postgres';

export class ConnectionDAO {
    private client: Promise<Client>;

    constructor() {
        this.client = connect({
            host: 'localhost',
            port: 5432,
            database: 'testeTCC',
            user: 'postgres',
            password: '123'
        });
    }

    async getConnection(): Promise<Client> {
        const client = await this.client;
        return client;
    }
}