import { getProfileSessionController } from './controllers/getProfileSessionController';
import { loginController } from './controllers/loginController';
import { signupController } from './controllers/signupController';
import { logoutController } from './controllers/logoutController';
import { deleteProfileController } from './controllers/deleteProfileController';
import { Request, Response } from "express";
import { updateProfileController } from './controllers/updateProfileController';
import { getProfileController } from './controllers/getProfileController';
import { getAreaController, getTopParentAreaByIdController,
         getAreaByIdController, getAreasIdsByQuestionsIdsController,
         getAreaIdByQuestionIdController
 } from './controllers/getAreaController';
import { postAreaController } from './controllers/setAreaController';
import { getMockTestsController, getMockTestsByDecrescentDateController,
            getMockTestsByDateAndProfileController
 } from './controllers/getMockTestController';
import { setMockTestController } from './controllers/setMockTestController';
import { getArea_ProfileController } from './controllers/getArea_ProfileController';
import { getQuestionWithFiltersController, getQuestionsForNewMockTestByProfileController,
        getQuestionByIdController, getQuestionController,
        getQuestionsByIdsController
 } from './controllers/getQuestionController';
import { putQuestionByIdController } from './controllers/putQuestionController';
import { deleteQuestionByIdController } from './controllers/deleteQuestionController';
import { getAnswersByQuestionIdController, getAnswersByQuestionsIdsController } from './controllers/getAnswerController';

import { postQuestionController } from './controllers/postQuestionController';
import { getQuestion_MockTestsController } from './controllers/getQuestion_MockTest';
import { putAnswerController } from './controllers/putAnswerController';
export async function routes(app: any) {
    app.post('/signup', signupController);
    app.post('/login', loginController);
    app.post('/logout', logoutController);


    // '/user/'
    //Recebe (sabe qual é) o usuario pela sessão
    app.get('/user', getProfileSessionController);

    app.post('/user', updateProfileController);

    app.delete('/user', deleteProfileController); 


    // '/questions/'
    app.get('/questions', getQuestionController);
    app.get('/questions/:id', getQuestionByIdController);
    app.get('/questions/filter/:filter', getQuestionWithFiltersController);
    app.get('/questions/ids/:ids', getQuestionsByIdsController);
    app.get('/questions/newMockTest', getQuestionsForNewMockTestByProfileController);



    app.put('/questions/:id', putQuestionByIdController);

    app.post('/questions', postQuestionController);

    app.delete('/questions/:id', deleteQuestionByIdController);


    // '/area/'
    app.get('/areas', getAreaController);
    app.get('/area/:id', getAreaByIdController);
    app.get('/areas/questions', getAreasIdsByQuestionsIdsController);
    app.get('/area/question/:question_id', getAreaIdByQuestionIdController);

    app.get('/areas/top/:id', getTopParentAreaByIdController);

    app.post('/areas', postAreaController);

    // '/answers/'
    app.get('/answers/question/:question_id', getAnswersByQuestionIdController);
    app.put('/answers/question/:question_id', putAnswerController);
    app.get('/answers/questions/:questions_ids', getAnswersByQuestionsIdsController);


    // '/mockTest/'
    app.get('/mockTests', getMockTestsController);
    app.get('/mockTests/date/:date', getMockTestsByDateAndProfileController);
    app.get('/mockTests/date', getMockTestsByDecrescentDateController); //sem funcionamento

    app.post('/mockTests', setMockTestController);

    // '/profile/'
    app.get('/profile', getProfileController);

    // '/areaProfile/'
    app.get('/areaProfile', getArea_ProfileController);

    // '/question_MockTest/'
    app.get('/question_MockTests/:id', getQuestion_MockTestsController);

}