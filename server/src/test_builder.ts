import {ConnectionDAO} from "./DAO/ConnectionDAO";
import { QuestionDTO } from "./DTO/QuestionDTO";
import { Area_ProfileDTO } from "./DTO/Area_ProfileDTO";
import { AreaProfileTree, Area_ProfileDAO, Rooted_AreaProfileTree } from "./DAO/Area_ProfileDAO";
import { QuestionDAO } from "./DAO/QuestionDAO";
import { questionFilters, Tree } from "./types/client/interfaces";
import { difficulty, difficulty as Difficulty , question } from "@prisma/client";
import internal from "stream";
import { DiffieHellman } from "crypto";
import { AreaDTO } from "./DTO/AreaDTO";
import { AreaDAO, AreaTree } from "./DAO/AreaDAO";
import { OptimizedQuestionDAO } from "./DAO/OptimizedQuestionDAO";
const conn = new ConnectionDAO();


export enum DifficultyLevel{
    EASY = "facil",
    MEDIUM = "medio",
    HARD = "dificil",
    MIMIC = "mimic",
    IRRELEVANT = "irrelevant"
};

export enum DifficultyType{
    AREA = 1,
    INDIVIDUAL = 2
}
const buildratio = (a:number,b:number) => {
    if(b===0) return 0.05;
    else return a/b;
}

let cachedTestInformation = {individual:{},area:{}};

class ProportionHandler {
    private buildProportions = function(...args:number[]){
        const retobj:{[key:string]:number} = {};
        retobj[DifficultyLevel.EASY] = args[0];
        retobj[DifficultyLevel.MEDIUM] = args[1];
        retobj[DifficultyLevel.HARD] = args[2];
        return retobj;
    }
    difficultyToProportions = (difficulty:string):{[key:string]:number} => {
        if(difficulty === DifficultyLevel.EASY) return this.buildProportions(3,2,1);
        if(difficulty === DifficultyLevel.HARD) return this.buildProportions(1,2,3);
        if(difficulty === DifficultyLevel.MIMIC) return cachedTestInformation.individual;
        else return this.buildProportions(1,1,1);
        
    }
    divideWithinDifficulties = (fractions:{[dif:string]:number},value:number) =>
    {
        const retobj:{[key:string]:number} = {};
        let sofar = 0;
        let last:string = "medium";
        for(const dif in fractions)
        {
            last = dif;
            retobj[dif] = Math.floor(value * fractions[dif]);
            sofar += retobj[dif];
        }
        if(value !==sofar){
            retobj[last] += value-sofar;
        }
        console.log("Resultado do divide: ", retobj);
        return retobj;
    }
    classifyRatio = (a:number,b:number):string =>
    {
        if(b<3) return DifficultyLevel.IRRELEVANT    
        if(a/b > 0.75) return DifficultyLevel.EASY;
        if(a/b > 0.5) return DifficultyLevel.MEDIUM;
        return DifficultyLevel.HARD;
    }
    private difficultyToAreaDifficulty = (difficulty:string):string => {
        if(difficulty === DifficultyLevel.EASY) return DifficultyLevel.HARD;
        if(difficulty === DifficultyLevel.HARD) return DifficultyLevel.EASY;
        return difficulty;
    }
    classifyAreaRatio = (a:number,b:number):string =>{
        return this.difficultyToAreaDifficulty(this.classifyRatio(a,b));
    }
    proportionToFraction = (proportion:{[key:string]:number}) =>{
    const fractions:{[key:string]:number} = {};
    let total = 0;
    for(const key in proportion)
    {
        total+=proportion[key];
    }
    for(const key in proportion)
    {
        fractions[key] = proportion[key]/total;
    }
    return fractions;
    }
    difficultyToRatioCondition = (difficulty:string) => {
        const innerFunc = function(val:number) {return val<=3;}
        const trueFunc = function(a:number,b:number){return true;}
        if(difficulty === DifficultyLevel.EASY) return function(a:number,b:number){return innerFunc(b)? true : a/b > 0.75};
        if(difficulty === DifficultyLevel.HARD) return function(a:number,b:number){return innerFunc(b)? true : a/b <= 0.5};
        if(difficulty === DifficultyLevel.MEDIUM) return function(a:number,b:number){return innerFunc(b)? true : a/b > 0.5 && a/b <= 0.75};
        return trueFunc;
    }
    addMaps = (m1:{[key:string]:number},m2:{[key:string]:number}) => {
        const retobj:{[key:string]:number} = {};
        for(const key in m1)
        {
            if(!m2[key])
            {
                m2[key] = 0;
            }
            retobj[key] = m1[key] + m2[key];
        }
        return retobj;
    }
    make_indice = (diff:string,ratio:number,total_denom:number) => {
        if(diff===DifficultyLevel.EASY) return ratio/total_denom;
        if(diff===DifficultyLevel.MEDIUM) return Math.abs(0.75 - ratio)/total_denom;
        return (1-ratio)/total_denom;
    }
    divideWithinArea = (diff:string,areas:Area_ProfileDTO[],count:number) => {
        const n = count;
        let retobj:{[id:number]:number} = {};
        let done = 0;
        let indice_total =0;
        for(const area of areas)
        {
            indice_total += buildratio(area.total_correct_answers,area.total_answers);
            console.log("indice,total" ,indice_total);
        }
        for(const area of areas)
        {
            const valor = buildratio(area.total_correct_answers,area.total_answers);
            console.log("Valor de n:",n);
            if(diff!==DifficultyLevel.IRRELEVANT)
                retobj[area.area_id] = Math.floor(n * this.make_indice(diff,buildratio(area.total_correct_answers,area.total_answers),indice_total));
            else{
                retobj[area.area_id] = Math.floor(n/areas.length);
            }
            done+= retobj[area.area_id];
        }
        let left = n - done;
        let i =0;
        while(left>0)
        {   
            for(const area in retobj)
            {
                const id = Number(area);
                retobj[id]++;
                left--;
                if(left<=0) break;
            }
        }
        
        return retobj;
    }
    getTestProportions = async(testName:string) => {
        const client = await conn.getConnection();
        const questions = await client.question.findMany({
            where: {
                official_test_name: testName
            }
        });
        
        const n = questions.length;
        const individual:{[key:string]:number} = {};
        const area:{[key:number]:number} = {};
        for(const question of questions)
        {
            const individualDifficulty = this.classifyRatio(question.total_correct_answers,question.total_answers);
            if(!individual[individualDifficulty])
                individual[individualDifficulty] = 0;
            individual[individualDifficulty]++;
            if(!area[question.area_id]){
                area[question.area_id] = 0;
            }
            area[question.area_id]++;       
        }
        for(const ar in area)
        {
            const id = Number(ar);
            area[id] /= n;
        }
        for(const diff in individual)
        {
            //individual[diff] /= n;
        }
        return {individual:individual,area:area};

    }
    
    proportionList_toQuestionNumberList = (map:{[key:number]:number},total:number) =>
    {
        let left = total;
        const retobj:{[key:number]:number} = {};
        for(const val in map)
        {
            if(left<=0) break;
            const id = Number(val);
            retobj[id] = Math.round(total * map[id]);
            left-=retobj[id];
        }
        if(left===0) return retobj;
        let sinal = left<0? -1 : 1;
        for(const val in map)
        {
            if(left===0) break;
            retobj[Number(val)]+=sinal;
            left -= sinal;
        }
        return retobj;
    }
}

interface ITestBlueprint{
    totalQuestions:number,
    questionsInArea:{[key:string]:number},
    difficulty:{[difficulty_type:number]:DifficultyLevel}
}

interface ITestBuilder{
    testBlueprint:TestBlueprint[] | undefined
}





const shuffle = function(array:any[])
{
    let count = array.length,
    randomnumber,
    temp;
    while( count ){
    randomnumber = Math.random() * count-- | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp
    }
}

const LINGUA_PORTUGUESA = 2;
const MATEMATICA = 1;
const CIENCIAS_HUMANAS = 4;
const CIENCIAS_DA_NATUREZA = 3;

interface AreaData
{
    questionCount_inDifficulty: {[key:string]:number}
}



export class TestBlueprint implements ITestBlueprint{
    totalQuestions: number;
    questionsInArea: {[key:number]:number};
    difficulty:{[difficulty_type:number]:DifficultyLevel}
    user_id:number;
    constructor(totalQuestions=50,questionsInArea:{[key:number]:number}={},difficulty:{1:DifficultyLevel.MEDIUM,2:DifficultyLevel.MEDIUM},user_id:number)
    {
        this.totalQuestions = totalQuestions;
        this.questionsInArea = questionsInArea;
        this.questionsInArea[0] = totalQuestions;
        this.difficulty = difficulty;
        this.user_id = user_id;
    }
}
export class TestBuilder{
    testBlueprintList:TestBlueprint[] | undefined
    helper:ProportionHandler = new ProportionHandler();
    constructor(testBlueprint:TestBlueprint[] | undefined)
    {
        this.testBlueprintList = testBlueprint;
        this.helper = new ProportionHandler();
    }
    buildAll = () =>
    {
        if(this.testBlueprintList) {
            let listOfQuestionList = [{}] 
            for(const test of this.testBlueprintList){
                listOfQuestionList.push(this.buildTest(test));
            }
            return listOfQuestionList;
        }        
    }

    private buildSizeMap = async(rooted_tree:Rooted_AreaProfileTree, blueprint:TestBlueprint):Promise<{[key:number]:AreaData}>=>{
        if(blueprint.difficulty[DifficultyType.AREA] === DifficultyLevel.MIMIC)
        {
            blueprint.questionsInArea = this.helper.proportionList_toQuestionNumberList(cachedTestInformation.area,blueprint.totalQuestions);
        }
        let sizeMap:{[key:number]:AreaData} = {};
        let questionsInArea = blueprint.questionsInArea;
        let marked:{[key:string]:boolean} = {};
        for(const key in questionsInArea)
        {
            marked[key] = true;
        }
        const tree = rooted_tree.tree;
        const root = rooted_tree.root;
        const instance = new Area_ProfileDAO();
        console.log(tree);
        const inverted_tree = await instance.buildInverted_AreaProfileTree(root.area_id);
        const fractionInType:{[key:number]:{[key:string]:number}} = {};
        questionsInArea[root.area_id] = blueprint.totalQuestions;
        marked[root.area_id] = true;
        for(const type in blueprint.difficulty)
        {
            fractionInType[type] = this.helper.proportionToFraction(this.helper.difficultyToProportions(blueprint.difficulty[type]));
        }
        const normalizeValues = (node:number,sender:number) => {
            if(marked[node] && node !== sender) return;
            console.log(`node: ${node}, sender: ${sender}`);
            if(node!==sender) 
            {
                if(!questionsInArea[node]) questionsInArea[node] = 0;
                
                questionsInArea[node] +=questionsInArea[sender];
            }
            if(!inverted_tree[node]) return;
            normalizeValues(inverted_tree[node].area_id,sender);
        }
        /*
            Se o usuário definiu áreas que ele quer que tenha na prova, sobe a árvore para levar isso em consideração
            em outras áreas. 
            a->b
            |->c
            se tem c=3 e b=2, a = b+c=5, no mínimo.

        */
        for(const value in questionsInArea)
        {
            const key = Number(value);
            normalizeValues(key,key);
        }
        console.log("Normalização passada");
        /*
            Se ele não liga para área, a gente só retorna as áreas definidas pelo usuário
        */
        if(blueprint.difficulty[DifficultyType.AREA] === DifficultyLevel.IRRELEVANT || blueprint.difficulty[DifficultyType.AREA] === DifficultyLevel.MIMIC)
        {
            for(const key in questionsInArea)
            {
                const id = Number(key);
                if(blueprint.difficulty[DifficultyType.INDIVIDUAL] === DifficultyLevel.IRRELEVANT)
                {
                    sizeMap[id].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT] = questionsInArea[id]; 
                    continue;
                }
                const fraction = fractionInType[DifficultyType.INDIVIDUAL];
                const n = questionsInArea[id];
                let nsofar = 0;
                for(const diff in fraction)
                {
                    const val = Math.floor(n/fraction[diff]);
                    sizeMap[id].questionCount_inDifficulty[diff] = val;
                }
                sizeMap[id].questionCount_inDifficulty[DifficultyLevel.MEDIUM] = n-nsofar;
            }
            const rootid = root.area_id;
            //Possivelmente o usuário não selecionou nenhuma área
            if(!questionsInArea)
            {
                questionsInArea = {};
                questionsInArea[rootid] = 0;
            }
            /*
                Após isso, teremos na raiz somente uma parcela das questões totais. Na estrutura
                a -> (b,c)
                a terá somente b+c questões. Estará faltando n-(b+c) questões.
                1. Fazemos a verificação do caso trivial.
                2. Se tiver um tipo de dificuldade não irrelevante, faz a divisão de acordo com as frações
            */
           if(blueprint.difficulty[DifficultyType.INDIVIDUAL]===DifficultyLevel.IRRELEVANT)
           {
                sizeMap[rootid].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT] = questionsInArea[rootid];
                return sizeMap;
           }
           /* Processamento padrão de dificuldade */
           const left = blueprint.totalQuestions - questionsInArea[rootid]; 
           let sofar = 0;
           for(const diff in fractionInType[DifficultyType.INDIVIDUAL])
           {
                const val = Math.floor(left*fractionInType[DifficultyType.INDIVIDUAL][diff]);
                sofar+=val;
                sizeMap[rootid].questionCount_inDifficulty[diff] = val;
           }
           // Minha vida seria muito mais fácil se desse para existir uma fração de questão.
           sizeMap[rootid].questionCount_inDifficulty[DifficultyLevel.MEDIUM] = left-sofar;
           return sizeMap;
        }
        console.log("Casos bases passados--- Sabemos que ÁREA não é IRRELEVANT");

        /* É com muita dor que reescrevo esse algoritmo pela quarta vez.
        Passos que fazemos (tenha em mente que isso é feito em BFS)
        PASSO 1. Pegamos todos os filhos de um nó e adicionamos eles na queue
        PASSO 2. Classificação de área em DIFICULDADE DE ÁREA
              2.1. Achamos a porcentagem de acerto (certa/total).
                2.1.1. Questões com menos de 3 respostas são colocadas como IRRELEVANTES
        PASSO 3. Separação de quantidade de questão em cada dificuldade de área. SEGREGAMOS IRRELEVANT
              3.1 Fórmulas para individual, por dificuldade de blueprint.:
                    3.1.1 Para EASY: indice_i/indice_total * n
                    3.2.2 Para MEDIUM : abs(0.75-indice_i)/indice_total * n
                    3.3.3 Para HARD: (1-indice_i)/indice_total * n
              3.2 Após fazer todas as individuais, haverá restos. Colocamos todas na área mais difícil.
        PASSO 4. Do total verdadeiro, haverá faltas (não existe área MÉDIA, por exemplo)
            4.1 SE existem áreas IRRELEVANTES, divida igualmente todas as questões entre elas.
            4.2 SENÃO, divida igualmente entre uma área pré-existente (PRIORIDADE: blueprint.areadiff -> medium -> hard/easy)

        */
        const queue:Area_ProfileDTO[] = [];
        queue.push(root);
        if(!questionsInArea) questionsInArea = {};
        //console.log("\n\n\n\n", tree, "\n\n\n\n");
        console.log("Chegando na queue");
        try {
        while(queue.length!==0)
        {
            const node = queue.shift();
            if(!node) break;
            const id = node.area_id;

            if(!tree[id]) break; // Os valores são sempre definidos pelo pai. 

            //Setup individual
            if(!questionsInArea[id]) questionsInArea[id] = 0;
            if(!sizeMap[id])
            {
                sizeMap[id] = {questionCount_inDifficulty:{}};
            }
            if(sizeMap[id].questionCount_inDifficulty && id===root.area_id){
                for(const dif in sizeMap[id].questionCount_inDifficulty)
                {
                    questionsInArea[id] += sizeMap[id].questionCount_inDifficulty[dif];
                }
            }
            const fractions = this.helper.proportionToFraction(this.helper.difficultyToProportions(blueprint.difficulty[DifficultyType.INDIVIDUAL]));
            if(id === root.area_id) {
                const dlist = this.helper.divideWithinDifficulties(fractions,questionsInArea[id]);
                sizeMap[id].questionCount_inDifficulty = dlist;
            }
            //Fim do setup individual

            //Classificação entre filhos 
            const childrenInDiff:{[diff:string]:Area_ProfileDTO[]} = {}; //Refere-se a dificuldade de área
            if(tree[id]) {
                for(const child of tree[id]){
                    if(!sizeMap[child.area_id])
                    {
                        sizeMap[child.area_id] = {questionCount_inDifficulty:{}};
                    }
                    queue.push(child);
                    const individual_diff = this.helper.classifyAreaRatio(child.total_correct_answers,child.total_answers);
                    console.log("NOTA: Individual_diff é ", individual_diff);
                    if(!childrenInDiff[individual_diff]) childrenInDiff[individual_diff] = [];
                    childrenInDiff[individual_diff].push(child);
                }
            }
            //Fim da classificação

            //Divisão de valores entre áreas
            const areaFractions = this.helper.proportionToFraction(this.helper.difficultyToProportions(blueprint.difficulty[DifficultyType.INDIVIDUAL]));
            console.log("Valor de questions in area: ", questionsInArea[node.area_id]);
            const countin_areadiff = this.helper.divideWithinDifficulties(areaFractions,questionsInArea[node.area_id]);
            console.log("Countinareadiff: ",countin_areadiff);
            const done:{[key:string]:boolean} = {};
            for(const areadiff in childrenInDiff)
            {
                if(areadiff === DifficultyLevel.IRRELEVANT) continue;
                done[areadiff] = true;
                console.log("AREADIFF É: ",areadiff)
                const lookingfor = countin_areadiff[areadiff];

                let countin_childarea = this.helper.divideWithinArea(areadiff,childrenInDiff[areadiff],lookingfor);
                for(const area in countin_childarea)
                {
                    const child_id = Number(area);
                    console.log("Countin childarea: ",countin_childarea);
                    sizeMap[child_id].questionCount_inDifficulty = this.helper.divideWithinDifficulties(fractions,countin_childarea[child_id]);
                }
            }
            if(childrenInDiff[DifficultyLevel.IRRELEVANT])
            {
                let total =0;
                for(const diff in countin_areadiff)
                {
                    if(!done[diff])
                    {
                        total+= countin_areadiff[diff];
                    }
                }
                let countin_childarea = this.helper.divideWithinArea(DifficultyLevel.IRRELEVANT,childrenInDiff[DifficultyLevel.IRRELEVANT],total);
                for(const area in countin_childarea)
                {
                        const child_id = Number(area);
                        console.log("Countin childarea: ",countin_childarea);
                        console.log(total);
                        sizeMap[child_id].questionCount_inDifficulty = this.helper.divideWithinDifficulties(fractions,countin_childarea[child_id]);
                }
            }
            //Fim da divisão

        }
    }
    catch(error)
    {
        console.log(error);
    }
        console.log(sizeMap);
        
        console.log = function(){};
        console.warn = console.log;
        return sizeMap;
    }

    private getQuestionList = async(rooted_tree:Rooted_AreaProfileTree, testMap:{[key:number]:AreaData}):Promise<QuestionDTO[]> => 
    {
        console.log("Chegando no getquestion list")
        let questionMap: Set<number> = new Set();
        let questionList: QuestionDTO[] = [];
        const optimizedInstance = new OptimizedQuestionDAO();
        await optimizedInstance.initialize();
        const tree = rooted_tree.tree;
        const root = rooted_tree.root;
        const helper = this.helper;
        const dfs = async(node:Area_ProfileDTO) => {
            try {
            const sucessos:{[key:string]:number} = {};
            const id = node.area_id;
            for(const diff in testMap[id]?.questionCount_inDifficulty)
            {
                sucessos[diff] = 0;
            }
            if(tree[id])
            for(const child of tree[id])
            {
                const suc_child = await dfs(child);
                for(const dif in suc_child)
                {
                    sucessos[dif] += suc_child[dif];
                }
            }
            //ATRIBUIR QUESTÕES
            const priorityList:string[] = [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD,DifficultyLevel.IRRELEVANT];
            if(testMap[id] && testMap[id]?.questionCount_inDifficulty) {
                for (const dif in testMap[id].questionCount_inDifficulty) {
                    const index = priorityList.indexOf(dif as DifficultyLevel);
                    if (index === -1) {
                        console.error(`Difficulty ${dif} not found in priorityList`);
                        continue;
                    }
                    
                    const numerodequestoesqueagentetemquepegar = testMap[id].questionCount_inDifficulty[dif] - sucessos[dif];
                    console.error(`O nó de ID ${id} deve pegar ${testMap[id].questionCount_inDifficulty[dif]} - ${sucessos[dif]} em ${dif}`);
                    
                    let agentepegounquestoes = 0;
                    for (let a = 0; a < 4; a++) {
                        if (agentepegounquestoes >= numerodequestoesqueagentetemquepegar) break;
                        let nesselooppegamosnquestoes=0;
                        let i = (index + a) % 4;
                        let filtros: questionFilters = {};
                        filtros.dificuldade = [priorityList[i] as difficulty];
                        filtros.disciplina = [id];
                        let filtered_list: QuestionDTO[] = [];
                        if (priorityList[i] === DifficultyLevel.IRRELEVANT)
                            filtered_list = optimizedInstance.optimizedGetQuestionList();
                        else
                            filtered_list = optimizedInstance.optimizedGetFilteredQuestions(filtros);
                        if (!filtered_list) continue;
                        shuffle(filtered_list);
                        for (const question of filtered_list) {
                            if (agentepegounquestoes >= numerodequestoesqueagentetemquepegar) break;
                            if (questionMap.has(question.id)) {
                                continue;
                            } else {
                                if (agentepegounquestoes >= numerodequestoesqueagentetemquepegar) break;
                                questionMap.add(question.id);
                                questionList.push(question);
                                agentepegounquestoes++;
                            }
                        }

                        console.error(`(ID: ${id}, Dificuldade: ${dif}, sucessos:${sucessos[dif]}): Objetivo ${numerodequestoesqueagentetemquepegar} pegamos ${agentepegounquestoes}`)
                        if (agentepegounquestoes >= numerodequestoesqueagentetemquepegar) break;
                    }
                    sucessos[dif] += agentepegounquestoes 
                }
        }
            for(const dif in sucessos)
            {
                if(sucessos[dif] > testMap[id]?.questionCount_inDifficulty[dif])
                {
                    console.error(`\n\n\n-----GRANDE ERRO-----\n\n\n`);
                }
            }
            //console.error(`Sucesso que tivemos em cada área (ID: ${node.area_id}):`, sucessos);
            //console.error(`QuestionMap que tivemos para (ID: ${node.area_id}): `, testMap[id]?.questionCount_inDifficulty)
            return sucessos;
        }
        catch(error)
        {
            console.error("ERRO FATAL: ", error);
        }
        }
        console.log("CHEGAMOS NO FINAL!!!!!!");
        await dfs(root);
        shuffle(questionList);
        return questionList;
    } 

    buildTest = async(blueprint:TestBlueprint):Promise<QuestionDTO[]> => {
        //console.log("Test blueprint:",blueprint);
        if(blueprint.difficulty[DifficultyType.AREA] === DifficultyLevel.MIMIC || blueprint.difficulty[DifficultyType.INDIVIDUAL] === DifficultyLevel.MIMIC)
        {
            cachedTestInformation = await this.helper.getTestProportions("CTI");
        }
        console.error = () => {};
        console.log = console.error;
        const instance = new Area_ProfileDAO();
        const rooted_tree = await instance.buildRootedAreaProfileTree(blueprint.user_id); 
        const sizeMap = await this.buildSizeMap(rooted_tree,blueprint);
        const questionList = await this.getQuestionList(rooted_tree,sizeMap);
        return questionList;
    }
}
