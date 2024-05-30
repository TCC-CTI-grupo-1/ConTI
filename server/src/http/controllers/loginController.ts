import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";


export async function loginController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
      const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmailAndPassword(req.body.email, req.body.password);
      req.session.isLoggedIn = true;
      req.session.profile = profileDTO;
      
      const response = fetch('http://localhost:3001/user', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies
})
.then(response => response.json())
.catch((error) => {
    console.error('Erro:', error);
});
      res.json({ message: 'Login sucesso', profile: req.session });
      
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }

}