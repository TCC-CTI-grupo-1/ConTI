import { login } from './controllers/login';
import { signup } from './controllers/signup';
import { Request, Response } from "express";


export async function routes(app: any) {
    app.post('/signup', signup);
    app.post('/login', login);
    app.get('/teste', (req: Request, res: Response) => {
        //let isLoggedIn: boolean = req.session.isLoggedIn ?? false;
        res.json({'isLoggedIn': true});
    });
}