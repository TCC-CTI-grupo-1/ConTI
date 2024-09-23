
import { Request, Response } from "express";
import { AnswerDAO } from "../../DAO/AnswerDAO";
import { AnswerDTO } from "../../DTO/AnswerDTO";

export async function putAnswerController(req: Request, res: Response) {
    const answerDAO = new AnswerDAO();
    try {
        let idQuestao = req.params.id;
        let data: AnswerDTO[] = req.body;

        let tudoPreenchido = true;

        for (let i = 0; i < data.length; i++) {
            if (data[i].answer === '' || data[i].is_correct === null || data[i].question_id === null) {
                tudoPreenchido = false;
                break;
            }
        }

        if (tudoPreenchido === false) {
            throw new Error('Preencha todos os campos');
        }

        data.forEach(async (element) => {
            await answerDAO.updateAnswer(element);
        });
        res.status(200).json({ message: 'Respostas atualizadas com sucesso' });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export async function putAnswersController(req: Request, res: Response) {
    const answerDAO = new AnswerDAO();
    try {
        await answerDAO.updateAnswers(req.body);
        res.status(200).json({ message: 'Respostas atualizadas com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function putAnswersIncrementController(req: Request, res: Response) {
    const answerDAO = new AnswerDAO();
    try {
        const answersIds = JSON.parse(req.params.ids) as number[];
        let answers: AnswerDTO[];
        answers = [];
        for (let i = 0; i < answersIds.length; ++i) {
            answers.push({
                id: answersIds[i],
                //demais valores são inúteis. Só fiz assim para terminar hoje
                question_id: 0,
                answer: "",
                is_correct: false,
                question_letter: "",
                total_answers: 0
            });
        }
        await answerDAO.incrementAnswers(answers);
        res.status(200).json({ message: 'Respostas atualizadas com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
