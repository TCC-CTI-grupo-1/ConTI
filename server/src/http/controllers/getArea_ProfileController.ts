import { Area_ProfileDTO } from "../../DTO/Area_ProfileDTO";
import { Area_ProfileDAO } from "../../DAO/Area_ProfileDAO";

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

export async function getArea_ProfileController(req: Request, res: Response) {
    const area_profileDAO = new Area_ProfileDAO();

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

        const areas_profile: Area_ProfileDTO[] = await area_profileDAO.listArea_ProfileByProfileId(profile.id);
        res.json({ areas_profile });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}