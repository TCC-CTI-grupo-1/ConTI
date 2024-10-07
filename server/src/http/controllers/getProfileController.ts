import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";
import RedisStore from "connect-redis";
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

export async function getProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    const userId = req.params.uuid;
    console.log('Req.query:');
    console.log(userId);
	console.log(req.session);
    const profile = await redisClient.get(`profile:${userId}`);
    console.log('Profile:');
    console.log(profile);
    try {
        if(req.session === undefined) {
            return res.status(404).json({ message: 'Sessão não inicializada' });
        }
        if (!req.session.isLoggedIn) {
            return res.status(401).json({ message: 'Usuário não logado' });
        }
        if(req.session.profile === undefined) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmail(req.session.profile?.email || 'email');
        res.json({ profile: profileDTO });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}