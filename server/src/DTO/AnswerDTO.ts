export class AnswerDTO {
    id:number;
    question_id:number;
    answer:string;
    is_correct:boolean;
    question_letter:string;
    total_answers:number;

    constructor(id: number, question_id: number, answer: string, is_correct: boolean, question_letter: string,total_selections:number) {
        this.id = id;
        this.question_id = question_id;
        this.answer = answer;
        this.is_correct = is_correct;
        this.question_letter = question_letter;
        this.total_answers = total_selections;
    }
}