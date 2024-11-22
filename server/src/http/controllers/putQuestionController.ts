import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";
import { AnswerDAO } from "../../DAO/AnswerDAO";

export async function putQuestionByIdController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        if (!req.body.id || 
            !req.body.question_text
        ) {
            throw new Error('Preencha todos os campos');
        }
        
        await questionDAO.updateQuestion(req.body);
        res.status(200).json({ message: 'Questão atualizada com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function incrementQuestionAnswersController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        if (!req.params.answersIds) {
            throw new Error('Preencha todos os campos');
        }

        const answersIds = JSON.parse(req.params.answersIds);
        const answerDAO = new AnswerDAO();
        const answers = await answerDAO.listAnswersByIds(answersIds);
        let questions: { [key: number]: { total_correct_answers: number; total_answers: number; } } = {};

        for (let answer of answers) {
            if (questions[answer.question_id]) {
                questions[answer.question_id].total_correct_answers += answer.is_correct ? 1 : 0;
                questions[answer.question_id].total_answers += 1;
            } else {
                questions[answer.question_id] = {
                    total_correct_answers: answer.is_correct ? 1 : 0,
                    total_answers: 1
                };
            }
        }

        console.warn("aqui!@!")
        await questionDAO.incrementQuestionAnswers(questions);
        res.status(200).json({ message: 'Respostas incrementadas com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}