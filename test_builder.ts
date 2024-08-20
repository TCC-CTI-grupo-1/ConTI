import {MockTestDTO} from "./server/src/DTO/MockTestDTO";
1




enum DifficultyLevel{
    EASY,
    MEDIUM,
    HARD,
    MIMIC,
    RANDOM
};

enum DifficultyType{
    AREA,INDIVIDUAL,SPECIAL
}
const buildProportions = function(...args:number[])
{
    return {
        easy: args[0],
        medium: args[1],
        hard: args[2]
    }
}

const difficultyProportions =  {
    [DifficultyLevel.EASY] : buildProportions(3,2,1),
    [DifficultyLevel.MEDIUM] : buildProportions(1,1,1),
    [DifficultyLevel.HARD] : buildProportions(1,2,3)
}

const difficultyToErrorRatioCondition = {
    "easy" : "total_correct_answers / total_answers > 0.75",
    "medium" : "total_correct_answers / total_answers > 0.5 AND total_correct_answers / total_answers <=0.5",
    "hard" : "total_correct_answers / total_answers < 0.5"
}



interface ITestBlueprint{
    totalQuestions:number,
    questionBySubject:{[key:string]:number},
    difficultyLevel:DifficultyLevel,
    difficultyType:DifficultyType
}

interface ITestBuilder{
    testBlueprint:TestBlueprint[] | undefined
}

const nameToId = {
    "portugues" : 2
}

function getRandomInInterval(min,max)
{
    return Math.floor(Math.random() * (max-min) +min);
} 

class TestBlueprint implements ITestBlueprint{
    totalQuestions: number;
    questionBySubject: {[key:string]:number};
    difficultyLevel: DifficultyLevel;
    difficultyType: DifficultyType;
    constructor(totalQuestions=50,questionBySubject={"lingua_portuguesa":15,"matematica":15,"ciencias_biologicas":15,"ciencias_humanas":5},difficultyRating=DifficultyLevel.MEDIUM,difficultyType=DifficultyType.INDIVIDUAL)
    {
        this.totalQuestions = totalQuestions;
        this.questionBySubject = questionBySubject;
        let totalSum = 0;
        for (const key in questionBySubject) {
            if (questionBySubject.hasOwnProperty(key)) {
                const value = questionBySubject[key];
                totalSum+=value;
            }
        }
        console.error("Erro na construção da planta da prova: Número de questões por matéria deve ser igual ao número total");
        this.difficultyLevel = difficultyRating;
        this.difficultyType = difficultyType;
    }
}

class TestBuilder{
    testBlueprintList:TestBlueprint[] | undefined
    constructor(testBlueprint:TestBlueprint[] | undefined)
    {
        this.testBlueprintList = testBlueprint;
    }
    buildAll()
    {
        if(this.testBlueprintList) {
            let listOfQuestionList = [{}] 
            for(const test of this.testBlueprintList){
                listOfQuestionList.push(this.buildTest(test));
            }
            return listOfQuestionList;
        }
        else {
            console.error("Erro: TestBlueprintList está vazio");
        }
        
    }
    buildTest(blueprint:TestBlueprint)
    {
        let questionList: { [key: string]: any[] } = {};
        const proportions = difficultyProportions[blueprint.difficultyLevel];
        let maxval = 0;
        for (const val of proportions) maxval+=val;
        const difficultyCountInSubject =  {}
        for (const subject in blueprint.questionBySubject) {
            const numberOfQuestions = blueprint.questionBySubject[subject];
            if(blueprint.difficultyLevel === DifficultyLevel.RANDOM)
            {
                const row = this.runQuery(`SELECT * FROM questions WHERE subject_id = ${nameToId[subject]} ORDER BY RANDOM()`) //<- nn tem conexão com o BD
                questionList[subject] = []
                for(let i=0;i<numberOfQuestions;i++)
                {
                    questionList[subject].push(row[i]);
                }
            }
            if(blueprint.difficultyType === DifficultyType.INDIVIDUAL)
            {
                //Ou seja, a dificuldade é construída pela dificuldade individual das questões. Uma questão difícil sempre vai ser difícil
                    const questionCount = blueprint.questionBySubject[subject]
                    difficultyCountInSubject[subject] = {}
                    questionList[subject] = []
                    for (const proportion in proportions)
                    {
                        if(proportion == "medium")
                        {
                            difficultyCountInSubject[subject] = {proportion: Math.ceil(questionCount - Math.floor(questionCount * proportions['easy'] /maxval) - Math.floor(questionCount * proportions['hard'] / maxval))}
                        }
                        else
                            difficultyCountInSubject[subject] = {proportion: Math.floor(proportions[proportion] * questionCount / maxval)}
                    }
                    for (const difficulty in difficultyCountInSubject[subject])
                    {
                        const row = this.runQuery(`SELECT * FROM question WHERE ${difficultyToErrorRatioCondition[difficulty]} ORDER BY RANDOM()`) //<- nn tem conexão com o BD
                        for(let i=0;i<difficultyCountInSubject[subject][difficulty];i++)
                        {
                            questionList[subject].push(row[i]);
                        }
                    }
                   
            }
            if(blueprint.difficultyType === DifficultyType.AREA)
            {   
                alert("Não implementei ainda!");
                
                //TODO: pensar no algoritmo que constrói baseado nos indicadores do usuário
            }
            if(blueprint.difficultyLevel === DifficultyLevel.MIMIC)
            {
                alert("Não implementado")
                //A ideia disso é imitar a forma das provas do CTI: a proporção de questões fáceis/médias/difíceis e 
                //o número de áreas.
            }
        }
        return questionList;
    }
    runQuery(query:string)
    {
        return ["porra nenhuma"]
    }
}

