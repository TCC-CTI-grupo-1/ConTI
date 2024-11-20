import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";

export async function postQuestionController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        delete req.body.id;
        let data: {
            question_text: string,
            question_year:  string,
            total_answers: number,
            total_correct_answers: number,
            difficulty: string,
            additional_info: string,
            area_id: string,
            question_creator: string,
            official_test_name: string,
            question_number: number,
            has_image: boolean,
            has_latex: boolean
        } = req.body;

        let tudoPreenchido = true;  

        console.log(req.body);

        for (let key in data) {
            if (typeof data[key as keyof typeof data] === 'string') {
                if(data[key as keyof typeof data] === '' && key !== 'additional_info') {
                    console.log("Preencher isso: " + key + " " + data[key as keyof typeof data]);
                    tudoPreenchido = false;
                    break;
                }
            }
        }
        if(tudoPreenchido === false) {
            throw new Error('Preencha todos os campos');
        }
        await questionDAO.registerQuestion(req.body);
        res.status(200).json({ message: 'Questão cadastrada com sucesso' });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}