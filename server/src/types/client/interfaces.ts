import { difficulty } from "@prisma/client";

export interface questionFilters{
    ano?: number[];
    dificuldade?: difficulty[];
    disciplina?: string[];
    alreadyAnswered?: boolean;
}