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

export async function incrementArea_ProfileController(req: Request, res: Response) {
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
        await area_profileDAO.incrementAreas_Profile(profile.id, req.body.area_ids);
        res.json({ message: 'Áreas incrementadas com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function incrementAreas_ProfileController(req: Request, res: Response) {
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
        await area_profileDAO.incrementAreas_Profile(profile.id, req.body.areasAndAnswers);
        res.json({ message: 'Áreas incrementadas com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}