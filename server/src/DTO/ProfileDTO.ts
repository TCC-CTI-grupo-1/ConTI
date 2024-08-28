export class ProfileDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    profile_picture: (string | null);
    creation_date: Date;
    total_correct_answers: number;
    total_answers: number;

    constructor(id: number, name: string, email: string, password: string, profile_picture: string, creation_date: Date, total_correct_answers: number, total_answers: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profile_picture = profile_picture;
        this.creation_date = creation_date;
        this.total_correct_answers = total_correct_answers;
        this.total_answers = total_answers;
    }
}