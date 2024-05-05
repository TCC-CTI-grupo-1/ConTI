import { connect, Client } from 'ts-postgres';
import DBPassword, { decrypt } from '../hidden/hidden';

export class ConnectionDAO {
    private client: Promise<Client>;

    constructor() {
        this.client = connect({
            host: 'pgsql.projetoscti.com.br',
            port: 5432,
            database: 'projetoscti23',
            user: 'projetoscti23',
            password: decrypt(DBPassword())
        });
    }

    async getConnection(): Promise<Client> {
        const client = await this.client;
        return client;
    }
}