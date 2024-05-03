class TeacherDTO extends UserDTO {
    constructor(id: number, name: string, email: string, password: string, profile_picture: string, creation_date: Date) {
        super(id, name, email, password, profile_picture, creation_date);
    }
}