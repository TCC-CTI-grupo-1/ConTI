import { mocktesttype } from "@prisma/client";

export class MockTestDTO {
    id: number;
    title: string;
    creation_date_tz: Date;
    profile_id: number;
    total_answers: number;
    total_correct_answers: number;
    time_limit: number;
    time_spent: number;
    test_type: mocktesttype;
    UUID: string;

    constructor(id: number, title: string, creation_date_tz: Date, profile_id: number, total_answers: number, total_correct_answers: number, time_limit: number, time_spent: number, test_type: mocktesttype, UUID: string) {
        this.id = id;
        this.title = title;
        this.creation_date_tz = creation_date_tz;
        this.profile_id = profile_id;
        this.total_answers = total_answers;
        this.total_correct_answers = total_correct_answers;
        this.time_limit = time_limit;
        this.time_spent = time_spent;
        this.test_type = test_type;
        this.UUID = UUID;
    }
}