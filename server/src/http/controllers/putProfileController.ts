import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";

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
        if(req.session === undefined) {
          return res.status(404).json({ message: 'Sessão não inicializada' });
        }
        if (!req.session.isLoggedIn) {
            return res.status(401).json({ message: 'Usuário não logado' });
        }
        if(req.session.profile === undefined) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        await profileDAO.incrementProfile_MockTest(req.session.profile.id);
        ++req.session.profile.total_mock_tests;
        res.status(200).json({ message: 'Simulado incrementado com sucesso' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function incrementProfileAnswersController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
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
        await profileDAO.incrementProfileAnswers(req.session.profile.id, req.body.total_correct_answers, req.body.total_answers);
        ++req.session.profile.total_answers;
        res.status(200).json({ message: 'Respostas incrementadas com sucesso' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}