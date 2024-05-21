import { loginController } from './controllers/loginController';
import { signupController } from './controllers/signupController';
import { getProfileController } from './controllers/getProfileController';
import { Request, Response } from "express";
import bodyParser from 'body-parser';


export async function routes(app: any) {
    app.post('/signup', bodyParser.urlencoded({ extended: true }), signupController);
    app.post('/login', bodyParser.urlencoded({ extended: true }), loginController);
    app.get('/user', bodyParser.json(), getProfileController);
}