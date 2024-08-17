import { getProfileSessionController } from './controllers/getProfileSessionController';
import { loginController } from './controllers/loginController';
import { signupController } from './controllers/signupController';
import { logoutController } from './controllers/logoutController';
import { deleteProfileController } from './controllers/deleteProfileController';
import { Request, Response } from "express";
import { updateProfileController } from './controllers/updateProfileController';
import { getProfileController } from './controllers/getProfileController';
import { getAreaController, getTopParentAreaByIdController } from './controllers/getAreaController';
import { setAreaController } from './controllers/setAreaController';
import { getMockTestsController, getMockTestsByDecrescentDateController,
            getMockTestsByDateAndProfileController
 } from './controllers/getMockTestController';
import { setMockTestController } from './controllers/setMockTestController';
import { getArea_ProfileController } from './controllers/getArea_ProfileController';
import { getAreaByIdController } from './controllers/getAreaByIdController';
import { getQuestionWithFiltersController, getQuestionByWeightsAndProfileController,
        getQuestionByIdController, getQuestionController
 } from './controllers/getQuestionController';
import { putQuestionByIdController } from './controllers/putQuestionController';
import { deleteQuestionByIdController } from './controllers/deleteQuestionController';
import { getAnswersByQuestionIdController } from './controllers/getAnswerController';

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
    app.get('/getProfile', getProfileController);
    app.get('/getAreas', getAreaController);
    app.get('/getArea/:id', getAreaByIdController);
    app.get('/getTopArea', getTopParentAreaByIdController);
    app.post('/setArea', setAreaController);
    app.get('/getMockTests', getMockTestsController);
    app.get('/getMockTestbyDate', getMockTestsByDecrescentDateController);
    app.post('/setMockTest', setMockTestController);
    app.post('/getArea_Profile', getArea_ProfileController);
    app.get('/getQuestions/:filter', getQuestionWithFiltersController);
    app.get('/getQuestions/:weight', getQuestionByWeightsAndProfileController);
    app.get('/getQuestion/:id', getQuestionByIdController);
    app.get('/getQuestions', getQuestionController);
    app.get('/getMockTestsByDateAndProfile/:date', getMockTestsByDateAndProfileController);
    app.get('/getQuestions_MockTest/:id', getQuestionController);
    app.put('/questions/:id', putQuestionByIdController);
    app.delete('/question/:id', deleteQuestionByIdController);
    app.get('/getAnswers/question/:question_id', getAnswersByQuestionIdController);

}