import { PrismaClient } from "@prisma/client";
import * as hidden from '../hidden/hidden';

export class ConnectionDAO {
    private prisma: PrismaClient = new PrismaClient();

    constructor() {
        this.prisma.$connect();
    }

    async getConnection(): Promise<PrismaClient> {
        return this.prisma;
    }
}