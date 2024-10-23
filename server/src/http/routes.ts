import { getProfileSessionController } from './controllers/getProfileSessionController';
import { loginController } from './controllers/loginController';
import { signupController } from './controllers/signupController';
import { logoutController } from './controllers/logoutController';
import { deleteProfileController } from './controllers/deleteProfileController';
import { Request, Response } from "express";
import { incrementProfile_MockTestController, incrementProfileAnswersController, updateProfileController } from './controllers/putProfileController';
import { getProfileController } from './controllers/getProfileController';
import { getAreaController, getTopParentAreaByIdController,
         getAreaByIdController, getAreasIdsByQuestionsIdsController,
         getAreaIdByQuestionIdController,
         getTopParentAreasByIdsController,
         getAllParentAreasByIdsController
 } from './controllers/getAreaController';
import { postAreaController } from './controllers/postAreaController';
import { getMockTestsController, getMockTestsByDecrescentDateController,
            getMockTestsByDateAndProfileController
 } from './controllers/getMockTestController';
import { postMockTestController } from './controllers/postMockTestController';
import { getArea_ProfileController } from './controllers/getArea_ProfileController';
import { getQuestionsWithFiltersController, getQuestionsForNewMockTestByProfileController,
        getQuestionByIdController, getQuestionController,
        getQuestionsByIdsController
 } from './controllers/getQuestionController';
import { putQuestionByIdController } from './controllers/putQuestionController';
import { deleteQuestionByIdController } from './controllers/deleteQuestionController';
import { getAnswersByQuestionIdController, getAnswersByQuestionsIdsController } from './controllers/getAnswerController';

import { postQuestionController } from './controllers/postQuestionController';
import { getQuestion_MockTestsController } from './controllers/getQuestion_MockTest';
import { putAnswerController, putAnswersController, putAnswersIncrementController } from './controllers/putAnswerController';
import { postQuestions_MockTestController } from './controllers/postQuestions_MockTestController';
import { putQuestion_MockTestController } from './controllers/putQuestion_MockTestController';
import { putMockTestController } from './controllers/putMockTestController';
import { postImageController, deleteImageController } from './controllers/ImageController';
import { getAreaTreeController } from './controllers/getAreaController';
import { deleteAreaController } from './controllers/deleteAreaController';
import { incrementArea_ProfileController, incrementAreas_ProfileController } from './controllers/putArea_ProfileController';

export async function routes(app: any) {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World');
    });


    app.post('/signup', signupController);
    app.post('/login', loginController);
    app.post('/logout/:uuid', logoutController);

    app.post('/image', postImageController);
    app.delete('/image/:id', deleteImageController);

    // '/user/'
    //Recebe (sabe qual é) o usuario pela sessão
    app.get('/profileSession', getProfileSessionController);
    app.put('/profile/:id', updateProfileController);
    app.delete('/profile/:id', deleteProfileController); 
    app.put('/profile/increment/mockTest/:id', incrementProfile_MockTestController);
    app.get('/profile/:id', getProfileController);
    app.put('/profile/increment/answers/:id', incrementProfileAnswersController);


    // '/questions/'
    app.get('/questions', getQuestionController);
    app.get('/question/:id', getQuestionByIdController);
    app.get('/questions/filter/:filter', getQuestionsWithFiltersController);
    app.get('/questions/ids/:ids', getQuestionsByIdsController); //nomeclatura sem "/ids" conflita com "/newMockTest"
    app.get('/questions/newMockTest/:uuid', getQuestionsForNewMockTestByProfileController);



    app.put('/questions/:id', putQuestionByIdController);

    app.post('/questions', postQuestionController);

    app.delete('/questions/:id', deleteQuestionByIdController);


    // '/area/'
    app.get('/areas', getAreaController);
    app.get('/area/:id', getAreaByIdController);
    app.delete('/area/:id', deleteAreaController);
    app.get('/areas/questions', getAreasIdsByQuestionsIdsController);
    app.get('/area/question/:question_id', getAreaIdByQuestionIdController);
    app.get('/areas/allparents/:ids', getAllParentAreasByIdsController);

    app.get('/areas/top/:id', getTopParentAreasByIdsController);

    app.post('/areas', postAreaController);

    // '/answers/'
    app.get('/answers/question/:question_id', getAnswersByQuestionIdController);
    app.put('/answer/:id', putAnswerController);
    app.get('/answers/questions/:questions_ids', getAnswersByQuestionsIdsController);
    app.put('/answers', putAnswersController);
    app.put('/answers/increment/:ids', putAnswersIncrementController);


    // '/mockTest/'
    app.get('/mockTests', getMockTestsController);
    app.get('/mockTests/date/:date/:userid', getMockTestsByDateAndProfileController);
    app.get('/mockTests/date', getMockTestsByDecrescentDateController); //sem funcionamento
    app.put('/mockTest/:id', putMockTestController);
    app.post('/mockTest/:userid', postMockTestController);

    // '/area_Profile/'
    app.get('/area_Profile/:userid', getArea_ProfileController);

    app.get('/question_MockTests/:id', getQuestion_MockTestsController);
    app.post('/questions_MockTest', postQuestions_MockTestController);
    app.put('/question_MockTest/', putQuestion_MockTestController);

}