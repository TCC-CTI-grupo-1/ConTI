import { MockTestType } from "../types/database/MockTestType";

export class MockTestDTO {
    id: number;
    title: string;
    creation_date: Date;
    profile_id: number;
    total_wrong_answers: number;
    total_correct_answers: number;
    time_limit: number;
    time_spent: number;
    test_type: MockTestType;
    UUID: string;

    constructor(id: number, title: string, creation_date: Date, profile_id: number, total_wrong_answers: number, total_correct_answers: number, time_limit: number, time_spent: number, test_type: MockTestType, UUID: string) {
        this.id = id;
        this.title = title;
        this.creation_date = creation_date;
        this.profile_id = profile_id;
        this.total_wrong_answers = total_wrong_answers;
        this.total_correct_answers = total_correct_answers;
        this.time_limit = time_limit;
        this.time_spent = time_spent;
        this.test_type = test_type;
        this.UUID = UUID;
    }
}