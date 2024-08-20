import { getProfileSessionController } from './controllers/getProfileSessionController';
import { loginController } from './controllers/loginController';
import { signupController } from './controllers/signupController';
import { logoutController } from './controllers/logoutController';
import { deleteProfileController } from './controllers/deleteProfileController';
import { Request, Response } from "express";
import { updateProfileController } from './controllers/updateProfileController';
import { getProfileController } from './controllers/getProfileController';
import { getAreaController, getTopParentAreaByIdController,
         getAreaByIdController, getTopParentAreasByIdsController,
         getAreasIdsByQuestionsIdsController
 } from './controllers/getAreaController';
import { setAreaController } from './controllers/setAreaController';
import { getMockTestsController, getMockTestsByDecrescentDateController,
            getMockTestsByDateAndProfileController
 } from './controllers/getMockTestController';
import { setMockTestController } from './controllers/setMockTestController';
import { getArea_ProfileController } from './controllers/getArea_ProfileController';
import { getQuestionWithFiltersController, getQuestionByWeightsAndProfileController,
        getQuestionByIdController, getQuestionController
 } from './controllers/getQuestionController';
import { putQuestionByIdController } from './controllers/putQuestionController';
import { deleteQuestionByIdController } from './controllers/deleteQuestionController';
import { getAnswersByQuestionIdController, getAnswersByQuestionsIdsController } from './controllers/getAnswerController';

import { postQuestionController } from './controllers/postQuestionController';
import { getQuestion_MockTestController } from './controllers/getQuestion_MockTest';

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
    app.get('/questions/weight/:weight', getQuestionByWeightsAndProfileController);
    app.get('/questions/filter/:filter', getQuestionWithFiltersController); //De novo, não seria melhor enviar o filtro pelo body?



    app.put('/questions/:id', putQuestionByIdController);

    app.post('/questions', postQuestionController);

    app.delete('/questions/:id', deleteQuestionByIdController);


    // '/area/'
    app.get('/areas', getAreaController);
    app.get('/areas/:id', getAreaByIdController);
    app.get('/areas/questions', getAreasIdsByQuestionsIdsController); //Não seria mudar isso aqui pra enviar os ID's pelo body?
    app.get('/areas/top/:id', getTopParentAreaByIdController);
    app.get('/areas/top', getTopParentAreasByIdsController); //Acho melhor, aqui támbem, enviar os ID's pelo body

    app.post('/areas', setAreaController);

    // '/answers/'
    app.get('/answers/question/:question_id', getAnswersByQuestionIdController); //ver se deixo no plural aqui
    app.get('/answers/questions', getAnswersByQuestionsIdsController); //Acho melhor, aqui támbem, enviar os ID's pelo body

    // '/mockTest/'
    app.get('/mockTests', getMockTestsController);
    app.get('/mockTests/:id', getQuestion_MockTestController); //praq isso serve?
    app.get('/mockTests/date/:date', getMockTestsByDateAndProfileController);
    app.get('/mockTests/date', getMockTestsByDecrescentDateController); //sem funcionamento

    app.post('/mockTests', setMockTestController);

    // '/profile/'
    app.get('/profile', getProfileController);


    // '/areaProfile/'
    app.get('/areaProfile', getArea_ProfileController);


}