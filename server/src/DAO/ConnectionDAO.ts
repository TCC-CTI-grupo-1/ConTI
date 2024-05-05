import { connect } from 'ts-postgres';

export class ConnectionDAO {
    private client: any;

    constructor() {
        this.client = connect({
            host: 'localhost',
            port: 5432,
            database: 'testeTCC',
            user: 'postgres',
            password: '123'
        });
    }

    getConnection(): any {
        return this.client;
    }
}