import { difficulty } from "@prisma/client";

export class QuestionDTO {
    id: number;
    question_text: string;
    question_year: number;
    total_answers: number;
    total_correct_answers: number;
    difficulty: difficulty;
    additional_info: (string | null);
    area_id: number;
    question_creator: string;
    official_test_name: (string | null);
    question_number: (number | null);
    has_image: boolean;
    has_latex: boolean;

    constructor(id: number, question_text: string, question_year: number, total_answers: number, total_correct_answers: number, difficulty: difficulty, additional_info: string, area_id: number, question_creator: string, official_test_name: string, question_number: number, has_image: boolean, has_latex: boolean) {
        this.id = id;
        this.question_text = question_text;
        this.question_year = question_year;
        this.total_answers = total_answers;
        this.total_correct_answers = total_correct_answers;
        this.difficulty = difficulty;
        this.additional_info = additional_info;
        this.area_id = area_id;
        this.question_creator = question_creator;
        this.official_test_name = official_test_name;
        this.question_number = question_number;
        this.has_image = has_image;
        this.has_latex = has_latex;
    }
}