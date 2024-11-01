import { mock } from "node:test";
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

export async function getMockTestsController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        const mockTests = await mockTestDAO.listMockTests();
        res.json({ mockTests });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getMockTestsByDecrescentDateController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        const mockTest = await mockTestDAO.listMockTestsByCreationDateDecrescent();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getMockTestsByDateAndProfileController(req: Request, res: Response) {
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

        const dateString = req.params.date;
        let date = new Date(dateString);
        const regex = /GMT\s*((-|)\d{2})\d+/;
        const matches = regex.exec(date.toString());
        let gmt;
        if(matches) gmt = matches[1];
        
        date = new Date(date.getTime() + (Number(gmt) * 60 * 60 * 1000));
        date.setHours(0, 0, 0, 0);

        const mockTests = await mockTestDAO.listMockTestsByCreationDateAscendentAndProfileId(date, profile.id);
        
        res.json({ mockTests });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}