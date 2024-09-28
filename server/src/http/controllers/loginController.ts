import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";


export async function loginController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
      const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmailAndPassword(req.body.email, req.body.password);
      req.session.isLoggedIn = true;
      req.session.cookie.maxAge = (req.body.remember) ? (1000 * 60 * 60 * 24 * 30) : (req.session.cookie.maxAge);
      const sessionProfile = {
        id: profileDTO.id,
        name: profileDTO.name,
        email: profileDTO.email,
        creation_date: profileDTO.creation_date,
        profile_picture: profileDTO.profile_picture,
        total_correct_answers: profileDTO.total_correct_answers,
        total_answers: profileDTO.total_answers,
        password: '',
        total_mock_tests: profileDTO.total_mock_tests
      }
      req.session.profile = sessionProfile;

      res.status(200).json({ session: req.session });
      
      res.json({ message: 'Login sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }

}