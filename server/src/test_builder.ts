import {ConnectionDAO} from "./DAO/ConnectionDAO";
import { QuestionDTO } from "./DTO/QuestionDTO";
import { Area_ProfileDTO } from "./DTO/Area_ProfileDTO";
import { AreaProfileTree, Area_ProfileDAO, Rooted_AreaProfileTree } from "./DAO/Area_ProfileDAO";
import { QuestionDAO } from "./DAO/QuestionDAO";
import { questionFilters } from "./types/client/interfaces";
import { difficulty, difficulty as Difficulty , question } from "@prisma/client";
import internal from "stream";
import { DiffieHellman } from "crypto";
import { AreaDTO } from "./DTO/AreaDTO";
import { AreaDAO } from "./DAO/AreaDAO";
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
        return this.buildProportions(1,1,1);
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
        return retobj;
    }
    classifyRatio = (a:number,b:number):string =>
    {
        if(b<4) return DifficultyLevel.IRRELEVANT    
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
}

interface ITestBlueprint{
    totalQuestions:number,
    questionsInArea:{[key:string]:number},
    difficulty:{[difficulty_type:number]:DifficultyLevel}
}

interface ITestBuilder{
    testBlueprint:TestBlueprint[] | undefined
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
        if(blueprint.difficulty[DifficultyType.AREA] === DifficultyLevel.IRRELEVANT)
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
        }
        console.log("Casos bases passados--- Sabemos que ÁREA não é IRRELEVANT");
        
  
        const queue:Area_ProfileDTO[] = [];
        queue.push(root);
        if(!questionsInArea) questionsInArea = {};
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
        const buildratio = (a:number,b:number) => {
            if(b===0) return 0.0001;
            else return a/b;
        }
        //console.log("\n\n\n\n", tree, "\n\n\n\n");
        console.log("Chegando na queue");
        while(queue.length!==0)
        {
            const parent = queue.shift();
            if(!parent) break;
            if(!tree[parent.area_id]) continue;
            if(!questionsInArea[parent.area_id])
            {
                questionsInArea[parent.area_id] = 0;
                for(const diff in sizeMap[parent.area_id].questionCount_inDifficulty)
                {
                    questionsInArea[parent.area_id]+= sizeMap[parent.area_id].questionCount_inDifficulty[diff];
                } 
            }
            //console.log("Pai: ",parent, "\n Valor: ", questionsInArea[parent.area_id]);

            const parentid = parent.area_id;
            const quest_parent = questionsInArea[parentid];
            type wrapper = {id:number,ratio:number}
            const childrenInDiff:{[key:string]:wrapper[]} = {};
            for(const child of tree[parentid])
            {
                queue.push(child);
                const diff = this.helper.classifyRatio(child.total_correct_answers,child.total_correct_answers);
                if(!childrenInDiff[diff])
                {
                    childrenInDiff[diff] = [];
                }
                childrenInDiff[diff].push({id: child.area_id, ratio:buildratio(child.total_correct_answers,child.total_answers)} as wrapper);
            }
            const make_indice = (diff:string,ratio:number,total_denom:number) => {
                if(diff===DifficultyLevel.EASY) return ratio/total_denom;
                if(diff===DifficultyLevel.MEDIUM) return Math.abs(0.75 - ratio)/total_denom;
                return (1-ratio)/total_denom;
            }
            let sofar = 0;
            for(const diff in childrenInDiff)
            {
                if(diff===DifficultyLevel.IRRELEVANT) continue;
                let total_denominator = 0;
                const list = childrenInDiff[diff];
                for(const val of list)
                {
                    total_denominator += val.ratio;
                }
                const n = Math.floor(questionsInArea[parentid] * fractionInType[DifficultyType.AREA][diff]);
                sofar+=n;
                let n_sofar = 0;
                for(const area of list)
                {
                    const val = Math.floor(make_indice(diff,area.ratio,total_denominator) * n);
                    if(!questionsInArea[area.id]) questionsInArea[area.id] = 0;
                    questionsInArea[area.id] += val;
                    n_sofar += val;
                }
                questionsInArea[list[0].id] += n-n_sofar;
                for(const area of list)
                {
                    sizeMap[area.id].questionCount_inDifficulty[diff] = questionsInArea[area.id];
                }
            } 
            /* Segundo processamento: vemos as questões faltando */
            if(quest_parent - sofar !==0)
            {
                const divide_equally = (list:wrapper[], left:number, diff:string) => {
                    const n = list.length;
                    for(const area of list)
                    {
                        if(!sizeMap[area.id])
                        {
                            sizeMap[area.id] = {questionCount_inDifficulty:{}};
                        }
                        if(!sizeMap[area.id].questionCount_inDifficulty[diff])
                        {
                            sizeMap[area.id].questionCount_inDifficulty[diff] = 0;
                        }
                        sizeMap[area.id].questionCount_inDifficulty[diff]+= Math.floor(left/n);
                        left-=sizeMap[area.id].questionCount_inDifficulty[diff];
                    }
                    sizeMap[list[0].id].questionCount_inDifficulty[diff] += left;
                }
                const build_prior = (currentDifficulty:DifficultyLevel) =>{
                    switch (currentDifficulty) {
                        case DifficultyLevel.EASY:
                            return [DifficultyLevel.EASY,DifficultyLevel.IRRELEVANT, DifficultyLevel.MEDIUM, DifficultyLevel.HARD];
                        case DifficultyLevel.MEDIUM:
                            return [DifficultyLevel.MEDIUM,DifficultyLevel.IRRELEVANT, DifficultyLevel.HARD, DifficultyLevel.EASY];
                        case DifficultyLevel.HARD:
                            return [DifficultyLevel.HARD,DifficultyLevel.IRRELEVANT, DifficultyLevel.MEDIUM, DifficultyLevel.EASY];
                        default:
                            return [DifficultyLevel.EASY,DifficultyLevel.IRRELEVANT, DifficultyLevel.MEDIUM, DifficultyLevel.HARD];
                    }
                }
                const priority = build_prior(blueprint.difficulty[DifficultyType.AREA]);
                for(let i=0;i<priority.length;i++)
                {
                    if(priority[i] in childrenInDiff)
                    {
                        divide_equally(childrenInDiff[priority[i]],quest_parent-sofar,priority[i]);
                        break;
                    }
                }
            }           
            
        }
        const ph = new ProportionHandler();
        const fractions = ph.proportionToFraction(ph.difficultyToProportions(blueprint.difficulty[DifficultyType.AREA]));

        if (!sizeMap[0]) {
            sizeMap[0] = {questionCount_inDifficulty:{}};
            sizeMap[0].questionCount_inDifficulty = ph.divideWithinDifficulties(fractions,blueprint.totalQuestions);
        }
        if(blueprint.difficulty[DifficultyType.INDIVIDUAL] !== DifficultyLevel.IRRELEVANT)
        {
            for(const area in sizeMap){
                if(DifficultyLevel.IRRELEVANT in sizeMap[area].questionCount_inDifficulty)
                {
                    const val = sizeMap[area].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT];
                    const retobj = ph.divideWithinDifficulties(fractions,val);
                    sizeMap[area].questionCount_inDifficulty = ph.addMaps(retobj,sizeMap[area].questionCount_inDifficulty);
                }
            }
        }
        console.log(sizeMap);
        

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
            console.log(node);
            const sucessos:{[key:string]:number} = {};
            const id = node.area_id;
            for(const diff in testMap[id])
            {
                sucessos[diff] = 0;
            }
            if(tree[id])
            for(const child of tree[id])
            {
                const suc_child = await dfs(child);
                for(const dif in suc_child)
                {
                    sucessos[dif] = suc_child[dif];
                }
            }
            console.log("EU SOU GAY");
            //ATRIBUIR QUESTÕES

            if(testMap[id].questionCount_inDifficulty)
            for(const dif in testMap[id].questionCount_inDifficulty){
                const priorityList:string[] = [DifficultyLevel.EASY,DifficultyLevel.MEDIUM,DifficultyLevel.HARD,DifficultyLevel.IRRELEVANT];
                let index = priorityList.indexOf(dif);
                const numerodequestoesqueagentetemquepegar = testMap[id].questionCount_inDifficulty[dif] - sucessos[dif];
                let agentepegounquestoes = 0;
                for(let a=0;a<4;a++)
                {
                    let i = (a+index)%4;
                    let filtros:questionFilters = {};
                    filtros.dificuldade = [priorityList[i] as difficulty];
                    filtros.disciplina = [id];
                    let filtered_list = await optimizedInstance.optimizedGetQuestionList();
                    if(priorityList[i] !== DifficultyLevel.IRRELEVANT)
                        filtered_list = await optimizedInstance.optimizedGetFilteredQuestions(filtros);
                    shuffle(filtered_list);
                    for(const question of filtered_list)
                    {
                        console.log(question.official_test_name + '\n');
                        if(questionMap.has(question.id))
                        {
                            continue;
                        }
                        else{
                            questionMap.add(question.area_id);
                            questionList.push(question);
                            agentepegounquestoes++;
                            if(agentepegounquestoes >= numerodequestoesqueagentetemquepegar) break
                        }
                    }
                sucessos[dif] = sucessos[dif] + agentepegounquestoes;
                if(agentepegounquestoes >= numerodequestoesqueagentetemquepegar) break;
                } 
            }
            return sucessos;
        }
        catch(error)
        {
            console.log(error);
        }
        }
        console.log("CHEGAMOS NO FINAL!!!!!!");
        await dfs(root);
        shuffle(questionList);
        return questionList;
    } 

    buildTest = async(blueprint:TestBlueprint):Promise<QuestionDTO[]> => {
        //console.log("Test blueprint:",blueprint);
        const instance = new Area_ProfileDAO();
        const rooted_tree = await instance.buildRootedAreaProfileTree(blueprint.user_id); 
        const sizeMap = await this.buildSizeMap(rooted_tree,blueprint);
        const questionList = await this.getQuestionList(rooted_tree,sizeMap);
        return questionList;
    }
}
