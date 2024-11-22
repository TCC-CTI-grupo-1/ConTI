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

export async function logoutController(req: Request, res: Response) {

    const userId = req.params.uuid;

    req.session.destroy((err) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.clearCookie('sid');
            res.json({ message: 'Logout sucesso' });
        }
    });

}