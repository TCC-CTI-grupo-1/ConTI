import { MockTestDAO } from "../../DAO/MockTestDAO";
import { Request, Response } from "express";
import { createClient } from 'redis';

const passRedis = process.env.REDIS_PASS;
const hostRedis = process.env.REDIS_HOST;
const portRedis = parseInt(process.env.REDIS_PORT as string);
let redisClient = createClient({
    password: passRedis,
    socket: {
        host: hostRedis,
        port: portRedis
    }
});
redisClient.connect();

export async function postMockTestController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        const userId = req.params.uuid;
    
        const profileString = await redisClient.get(`profile:${userId}`);

        let profile = null;
        if (profileString) {
        profile = JSON.parse(profileString); // Parse the string into an object
        }

        if(profile === null) {
            return res.status(404).json({ message: 'Sessão não inicializada' });
        }
        req.body.UUID = "UUID " + Math.random();
        req.body.profile_id = profile.id;
        const mockTest = await mockTestDAO.registerMockTest(req.body);
        res.json({ mockTest });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}