import { ProfileDTO } from './ProfileDTO';

class TeacherDTO extends ProfileDTO {
    constructor(id: number, name: string, email: string, password: string, profile_picture: string, creation_date: Date, total_correct_answers: number, total_incorrect_answers: number, total_questions: number) {
        super(id, name, email, password, profile_picture, creation_date, total_correct_answers, total_incorrect_answers, total_questions);
    }
}