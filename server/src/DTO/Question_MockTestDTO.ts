export class Question_MockTestDTO {
    question_id: number;
    mockTest_id: number;
    answer_id: (number | null);

    constructor(question_id: number, mockTest_id: number, answer_id: number) {
        this.question_id = question_id;
        this.mockTest_id = mockTest_id;
        this.answer_id = answer_id;
    }
}


