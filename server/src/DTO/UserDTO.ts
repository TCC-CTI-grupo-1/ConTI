export class UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    profile_picture: (string | null);
    creation_date: Date;

    constructor(id: number, name: string, email: string, password: string, profile_picture: (string | null), creation_date: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profile_picture = profile_picture;
        this.creation_date = creation_date;
    }
}