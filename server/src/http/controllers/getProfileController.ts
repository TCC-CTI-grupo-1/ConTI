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
    
	const profileString = await redisClient.get(`profile:${userId}`);

	let profile = null;
	if (profileString) {
	  profile = JSON.parse(profileString); // Parse the string into an object
	}
	
    try {
        if(profile === null) {
            return res.status(404).json({ message: 'Sessão não inicializada' });
        }
        const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmail(profile.email || 'email');
		console.log("Profile DTO:");
		console.log(profileDTO);
        res.json({ profile: profileDTO });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}