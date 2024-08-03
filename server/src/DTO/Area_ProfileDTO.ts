export class Area_ProfileDTO {
    area_id: number;
    profile_id: number;
    total_correct_answers: number;
    total_answers: number;

    constructor(area_id: number, profile_id: number, total_correct_answers: number, total_answers: number) {
        this.area_id = area_id;
        this.profile_id = profile_id;
        this.total_correct_answers = total_correct_answers;
        this.total_answers = total_answers;
    }
}