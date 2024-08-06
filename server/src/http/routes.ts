import { getProfileSessionController } from './controllers/getProfileSessionController';
import { loginController } from './controllers/loginController';
import { signupController } from './controllers/signupController';
import { logoutController } from './controllers/logoutController';
import { deleteProfileController } from './controllers/deleteProfileController';
import { Request, Response } from "express";
import { updateProfileController } from './controllers/updateProfileController';
import { getProfileController } from './controllers/getProfileController';
import { getAreaController } from './controllers/getAreaController';
import { setAreaController } from './controllers/setAreaController';
import { getMockTestsController, getMockTestsByDecrescentDateController } from './controllers/getMockTestsController';
import { setMockTestController } from './controllers/setMockTestController';
import { getArea_ProfileController } from './controllers/getArea_ProfileController';
import { getQuestionByWeightsAndProfileController, getQuestionWithFiltersController } from './controllers/getQuestionController';

export async function routes(app: any) {
    app.post('/signup', signupController);
    app.post('/login', loginController);
    app.get('/teste', (req: Request, res: Response) => {
        let isLoggedIn: boolean = req.session.isLoggedIn ?? false;
        res.json({'isLoggedIn': true});
    });
    app.get('/userSession', getProfileSessionController);
    app.post('/updateUser', updateProfileController);
    app.post('/logout', logoutController);
    app.delete('/deleteUser', deleteProfileController);
    app.get('/user', getProfileController);
    app.get('/areas', getAreaController);
    app.post('/setArea', setAreaController);
    app.get('/mockTests', getMockTestsController);
    app.get('/mockTestbyDate', getMockTestsByDecrescentDateController);
    app.post('/setMockTest', setMockTestController);
    app.post('/getArea_Profile', getArea_ProfileController);
    app.get('/questions/:filter', getQuestionWithFiltersController);
    app.get('/questions/:weight', getQuestionByWeightsAndProfileController);
}