import { getProfileController } from './controllers/getProfileController';
import { loginController } from './controllers/loginController';
import { signupController } from './controllers/signupController';
import { Request, Response } from "express";
import { updateController } from './controllers/updateController';


export async function routes(app: any) {
    app.post('/signup', signupController);
    app.post('/login', loginController);
    app.get('/teste', (req: Request, res: Response) => {
        let isLoggedIn: boolean = req.session.isLoggedIn ?? false;
        res.json({'isLoggedIn': true});
    });
    app.get('/user', getProfileController);
    app.get('/updateUser', updateController);
    
}