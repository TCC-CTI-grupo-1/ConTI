export interface questionInterface{
    id: number,
    subject: string,
    difficulty: string,
    year: number,
    enunciado: string,
    alternativas: string[],
    alternativaCorreta: string,
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
    questions: Map<number, string | null>,
    date: Date,
    time: number,
}