export interface questionInterface{
    id: number,
    subject: string,
    difficulty: string,
    year: number,
    enunciado: string,
    alternativas: string[],
    alternativaCorreta: string,
}
