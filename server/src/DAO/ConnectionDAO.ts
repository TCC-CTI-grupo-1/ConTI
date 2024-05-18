import { PrismaClient } from "@prisma/client";

export class ConnectionDAO {
    private prisma: PrismaClient = new PrismaClient();

    constructor() {
        this.prisma.$connect();
    }

    async getConnection(): Promise<PrismaClient> {
        return this.prisma;
    }
}