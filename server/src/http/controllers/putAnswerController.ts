
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
