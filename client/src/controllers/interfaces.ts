

export interface SubjectCategory {
    name: string;
    sub?: SubjectCategory; // Tornando `sub` opcional
}
export interface questionFilters{
    ano: number[];
    dificuldade: string[];
    disciplina: string[];
    alreadyAnswered?: boolean;
    myMockTests: boolean;
}
export interface questionInterface{
    additional_info: string;
    area_id: number;
    has_image: boolean;
    has_latex: boolean;
    difficulty: string,
    id: number,
    official_test_name: string;
    question_creator: string;
    question_number: number;
    question_text: string,
    question_year: number, 

    correct_answer: string,
    answers: string[],
}

export interface question_MockTestInterface{
    question_id: number,
    mocktest_id: number,
    answer_id: number,
}

//Usado para mostrar o histórico de simulados
export interface simuladoInterface{
    UUID: string,
    creation_date: Date,
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
    }[],
}

//Usado quando carregamos o simulado em si (Com os id's das questões a as letras marcadas)
export interface simuladoInterface{
    id: number,
    questions: [number, string | null][],
    date: Date,
    time: number,
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