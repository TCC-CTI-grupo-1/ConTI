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

export async function updateProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
      if (!req.body.name || !req.body.email) {
        throw new Error('Preencha todos os campos');
      }
      else if (!req.body.email.includes('@') || !req.body.email.includes('.') || req.body.email.indexOf('@') > req.body.email.lastIndexOf('.')) {
          throw new Error('E-mail inválido');
      }
      await profileDAO.updateProfileSession(req.body);
      const sessionProfile = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        creation_date: req.body.creation_date,
        profile_picture: req.body.profile_picture,
        total_correct_answers: req.body.total_correct_answers,
        total_answers: req.body.total_answers,
        password: req.body.password,
        total_mock_tests: req.body.total_mock_tests
      }
      req.session.profile = sessionProfile;
      
    
      res.status(200).json({ message: 'Perfil atualizado com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
}

export async function incrementProfile_MockTestController(req: Request, res: Response) {
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

        await profileDAO.incrementProfile_MockTest(profile.id);
        ++profile.total_mock_tests;
        await redisClient.set(`profile:${profile.id}`, JSON.stringify(profile), { EX: 1000 * 60 * 60 * 12 });
        res.status(200).json({ message: 'Simulado incrementado com sucesso', total_mock_tests: profile.total_mock_tests });
    } catch (error: any) {
		console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export async function incrementProfileAnswersController(req: Request, res: Response) {
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

        await profileDAO.incrementProfileAnswers(profile.id, req.body.total_correct_answers, req.body.total_answers);
        ++profile.total_answers;
        await redisClient.set(`profile:${profile.id}`, JSON.stringify(profile), { EX: 1000 * 60 * 60 * 12 });
        res.status(200).json({ message: 'Respostas incrementadas com sucesso', total_answers: profile.total_answers, total_correct_answers: profile.total_correct_answers });
    } catch (error: any) {
		console.log(error);
        res.status(400).json({ message: error.message });
    }
}