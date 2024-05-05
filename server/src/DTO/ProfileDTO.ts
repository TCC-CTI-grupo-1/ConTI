import { UserDTO } from './UserDTO'; // Add this import statement

export class ProfileDTO extends UserDTO {
    total_correct_answers: number;
    total_incorrect_answers: number;

    constructor(id: number, name: string, email: string, password: string, profile_picture: string, creation_date: Date, total_correct_answers: number, total_incorrect_answers: number) {
        super(id, name, email, password, profile_picture, creation_date);
        this.total_correct_answers = total_correct_answers;
        this.total_incorrect_answers = total_incorrect_answers;
    }
}