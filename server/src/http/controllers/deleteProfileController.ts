import { ProfileDAO } from "../../DAO/ProfileDAO";
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

export async function deleteProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {

        const userId = req.params.uuid;
    
        const profileString = await redisClient.get(`profile:${userId}`);

        let profile = null;
        if (profileString) {
            profile = JSON.parse(profileString); // Parse the string into an object
        }
        if(profile === null) {
            throw new Error('Sessão não inicializada');
        }
        await profileDAO.deleteProfile(profile);
        res.status(200).json({ message: 'Perfil deletado com sucesso' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}