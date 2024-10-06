

export interface SubjectCategory {
    name: string;
    sub?: SubjectCategory; // Tornando `sub` opcional
}
export interface questionFilters{
    ano: number[];
    dificuldade: string[];
    disciplina: number[];
    alreadyAnswered?: boolean;
    myMockTests: boolean;
}
export interface questionInterface{
    additional_info: string;
    area_id: number;
    has_image: boolean;
    has_latex: boolean;
    difficulty: 'facil' | 'medio' | 'dificil',
    id: number,
    official_test_name: string;
    question_creator: string;
    question_number: number;
    question_text: string,
    question_year: number, 

    total_answers: number;
    total_correct_answers: number;
}

export interface question_MockTestInterface{
    question_id: number,
    mockTest_id: number,
    answer_id: number | null
}

//Usado para mostrar o histórico de simulados
export interface simuladoInterface{
    UUID: string,
    creation_date_tz: Date,
    id: number,
    profile_id: number,
    test_type: string,
    time_limit: number,
    time_spent: number,
    title: string,
    total_answers: number,
    total_correct_answers: number,

    subjects: {
        [key: string]: {
            total_answers: number,
            total_correct_answers: number,
        }
    },
}
// NÃO DÁ PRA SÓ PEGAR DO DTO? EM SERVER... MELHOR, NÃO?...

export interface areaInterface{
    id: number,
    name: string,
    parent_id: number | null,
}

export interface respostaInterface{
    id:number;
    question_id:number;
    answer:string;
    is_correct:boolean;
    question_letter:string;
    total_answers:number;
}

export interface area_ProfileInterface{
    area_id: number,
    profile_id: number,
    total_correct_answers: number,
    total_answers: number
}

export interface profileInterface{
    id: number;
    name: string;
    email: string;
    password: string;
    profile_picture: (string | null);
    creation_date: Date;
    total_correct_answers: number;
    total_answers: number;
    total_mock_tests: number;
}