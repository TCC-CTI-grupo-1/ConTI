

export interface SubjectCategory {
    name: string;
    sub?: SubjectCategory; // Tornando `sub` opcional
}
export interface questionFilters{
    ano?: number[];
    dificuldade?: string[];
    disciplina?: string[];
    alreadyAnswered?: boolean;
    myMockTests?: boolean;
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

    areaName: string,
    correct_answer: string,
    awnsers: string[],
}

//Usado para mostrar o histórico de simulados
export interface simuladoSimpleInterface{
    id: number,
    totalQuestions: number,
    totalCorrect: number,
    date: Date,
    time: number,
    subjects: {
        [key: string]: {
            totalQuestions: number,
            totalCorrect: number
        }
    }
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

export interface area_ProfileInterface{
    area_id: number,
    profile_id: number,
    total_correct_answers: number,
    total_answers: number
}