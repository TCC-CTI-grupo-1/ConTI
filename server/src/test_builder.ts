import {ConnectionDAO} from "./DAO/ConnectionDAO";
import { QuestionDTO } from "./DTO/QuestionDTO";


const conn = new ConnectionDAO();


enum DifficultyLevel{
    EASY = 1,
    MEDIUM = 2,
    HARD = 3 ,
    MIMIC = 4,
    RANDOM = 5
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
let difficultyProportions:{[key:number]:{[key:string]:number}};

difficultyProportions = {
    [DifficultyLevel.EASY] : buildProportions(3,2,1),
    [DifficultyLevel.MEDIUM] : buildProportions(1,1,1),
    [DifficultyLevel.HARD] : buildProportions(1,2,3)
}

const difficultyToErrorRatioCondition:{[key:string]:Function} = {
    "easy" : function(a:number,b:number){return a / b > 0.75},
    "medium" : function(a:number,b:number){return a / b > 0.5 && a/b <=0.75},
    "hard" : function(a:number,b:number){return a / b <=0.5}
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

const nameToId = async function(subject:string):Promise<number>
{
    try {
        const client = await conn.getConnection();
        let parent_id:number|null = 0;
        let subject_id = -1;
        while(parent_id !=null){
        const area = await client.area.findMany({
            where: {
                name:subject
            }
        });
        parent_id = area[0].parent_id;
        subject_id = area[0].id;
    }
    return subject_id;
        
    }
    catch(e)
    {
        throw e;
    }
}

const idToName= async function(id:number):Promise<string>
{
    try{
        const client = await conn.getConnection();
        const result = await client.area.findUnique({
            where: {
                id: id
            }
        });
        if(result)
        return result.name;
        else
        return "Deu erro :(";
    }
    catch(e)
    {
        throw e;
    }
}

const getTestProportions = async function(test:string)
{
    const client = await conn.getConnection();
    const rows = await client.question.findMany({
        where: {
            official_test_name: test
        }
    });
    type simpleMap = { [key:string|number]:number};
    const difficultyCount:simpleMap = {};
    const areaCount:simpleMap = {};
    const idToNameCache:{[key:number]:string} = {};
    let totalQuestions = 0;

    for(const row of rows)
    {
        totalQuestions++;
        if(!areaCount[row.area_id])
        {
            const name = await row.area_id;
            areaCount[name] = 1;
        }
        else {
            areaCount[idToNameCache[row.area_id]]++;
        }
        difficultyCount[row.difficulty]++;
    }
    const difficultyProportions:simpleMap = {};
    const areaProportions:simpleMap = {};
    const testProportions:{[key:string]:simpleMap} = {};
    for(const a in areaCount)
    {
        areaProportions[a] = areaCount[a]/rows.length;
    }
    for(const a in difficultyCount)
    {
        difficultyProportions[a] = difficultyCount[a]/rows.length;
    }
    testProportions['difficulty'] = difficultyProportions;
    testProportions['area'] = areaProportions;
    return testProportions;
}

const shuffle = function(array:any[])
{
    var count = array.length,
    randomnumber,
    temp;
    while( count ){
    randomnumber = Math.random() * count-- | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp
    }
}


export class TestBlueprint implements ITestBlueprint{
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
            const value = this.questionBySubject[key];
            totalSum+=value;
            
        }
        console.error("Erro na construção da planta da prova: Número de questões por matéria deve ser igual ao número total");
        this.difficultyLevel = difficultyRating;
        this.difficultyType = difficultyType;
    }
}

export class TestBuilder{
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
    async buildTest(blueprint:TestBlueprint)
    {
        let questionList: { [key: string]: QuestionDTO[] } = {};
        const proportions = difficultyProportions[blueprint.difficultyLevel];
        let maxval = 0;
        for (const val in proportions) maxval+=proportions[val];
        const difficultyCountInSubject:{[key:string]:{[key:string]:number}} = {};
        for (const subject in blueprint.questionBySubject) {
            const numberOfQuestions = blueprint.questionBySubject[subject];
            if(blueprint.difficultyLevel === DifficultyLevel.RANDOM)
            {
                const client= await conn.getConnection();
                const row = await client.question.findMany({
                    where:{
                        area_id: await nameToId(subject)
                    }
                });
                shuffle(row);
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
                        const client = await conn.getConnection();
                        const rows = await client.question.findMany({
                            where:{    
                                area_id: await nameToId(subject)
                            }
                        });
                        const row = rows.filter(r => {
                            const totalC = r.total_correct_answers;
                            const totalA = r.total_answers;
                            difficultyToErrorRatioCondition[subject](totalC,totalA);
                        })
                        shuffle(row);
                        for(let i=0;i<difficultyCountInSubject[subject][difficulty];i++)
                        {
                            questionList[subject].push(row[i]);
                        }
                    }
                   
            }
            if(blueprint.difficultyType === DifficultyType.AREA)
            {   
                console.warn("Não implementei ainda!");
                
                //TODO: pensar no algoritmo que constrói baseado nos indicadores do usuário
            }
            if(blueprint.difficultyLevel === DifficultyLevel.MIMIC)
            {
                console.warn("Não implementado")
                //A ideia disso é imitar a forma das provas do CTI: a proporção de questões fáceis/médias/difíceis e 
                //o número de áreas.
            }
        }
        const questionDTOList: QuestionDTO[] = [];
        for (const subject in questionList) {
            const questions = questionList[subject];
            for (const question of questions) {
                const questionDTO: QuestionDTO = {
                    id: question.id,
                    area_id: question.area_id,
                    question_text: question.question_text,
                    question_year: question.question_year,
                    total_answers: question.total_answers,
                    total_correct_answers: question.total_correct_answers,
                    difficulty: question.difficulty,
                    additional_info: question.additional_info,
                    question_creator: question.question_creator,
                    official_test_name: question.official_test_name,
                    question_number: question.question_number,
                    has_image: question.has_image,
                    has_latex: question.has_latex
                };
                questionDTOList.push(questionDTO);
            }
        }
        return questionDTOList;
    }
}

