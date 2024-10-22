import { ConnectionDAO } from "./ConnectionDAO";
import { Area_ProfileDTO } from "../DTO/Area_ProfileDTO";
import { AreaDAO, AreaTree } from "./AreaDAO";
import { AreaDTO } from "../DTO/AreaDTO";
import { profile } from "node:console";
const connectionDAO = new ConnectionDAO();
export interface Rooted_AreaProfileTree{
    tree:{[key:number]:Area_ProfileDTO[]},
    root:Area_ProfileDTO
}
export type AreaProfileTree = {[key:number]:Area_ProfileDTO[]};
export type Inverted_AreaProfileTree = {[key:number]:Area_ProfileDTO};

export class Area_ProfileDAO {
    private toAreaProfileDTO = (areaDTO:AreaDTO,profile_id:number) => {
        return {area_id:areaDTO.id,profile_id:profile_id,total_answers:0,total_correct_answers:0} as Area_ProfileDTO
    }
    registerArea_Profile = async (area_profile: Area_ProfileDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            const createdAreaProfile = await client.area_profile.create({
                data: {
                    area_id: area_profile.area_id,
                    profile_id: area_profile.profile_id,
                    total_correct_answers: area_profile.total_correct_answers,
                    total_answers: area_profile.total_answers
                }
            });
            
            return createdAreaProfile;
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Área já cadastrada');
            }
        }
    }
    
    listArea_ProfileByProfileId = async (profile_id: number):Promise<Area_ProfileDTO[]>=> {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area_profile.findMany({
                where: {
                    profile_id: profile_id
                }
            });

            const areas_profile: Area_ProfileDTO[] = [];

            result.forEach((result: any) => {
                const area_profile: Area_ProfileDTO = {
                    area_id: result.area_id,
                    profile_id: result.profile_id,
                    total_correct_answers: result.total_correct_answers,
                    total_answers: result.total_answers
                }
                areas_profile.push(area_profile);
            });

        return areas_profile;

        } catch (error) {
            throw error;
        }
    }

    buildAreaProfileTree = async(profile_id:number):Promise<AreaProfileTree> => {
        const instance = new AreaDAO();
        const areatree:AreaTree = await instance.buildAreaTree();
        let areaMap:{[key:number]:Area_ProfileDTO} = {};
        const areaProfileList = await this.listArea_ProfileByProfileId(profile_id);
        for(const area of areaProfileList)
        {
            console.log(area)
            areaMap[area.area_id] = area;
        }
        let tree:AreaProfileTree = {};
        for(const key in areatree)
        {
            const parent_id:number = Number(key);       
            for(const area of areatree[parent_id])
            {
                if(!tree[parent_id])
                {
                    tree[parent_id] = [];
                }
                tree[parent_id].push(areaMap[area.id]);
            }
        
        }
        return tree;
    }

    
    buildRootedAreaProfileTree = async(profile_id:number):Promise<Rooted_AreaProfileTree> => {
        const areadao = new AreaDAO();
        const rooted_areatree = await areadao.buildRootedAreaTree();
        const areatree = rooted_areatree.tree;
        const arearoot = rooted_areatree.root;
        const areaProfile_list = await this.listArea_ProfileByProfileId(profile_id);
        let tree:AreaProfileTree = {};
        let root:Area_ProfileDTO|null = null;
        let areaMap:{[id:number]:Area_ProfileDTO} = {};
        for(const node of areaProfile_list)
        {
            areaMap[node.area_id] = node;
        }
        if(areaMap[arearoot.id])
        {
            root = areaMap[arearoot.id];
        }
        else {
            root = {area_id:arearoot.id,profile_id:profile_id,total_answers:0,total_correct_answers:0};
        }
        for(const key in areatree)
        {
            const id = Number(key);
            tree[id] = [];
            for(const node of areatree[id])
            {
                if(!node.parent_id && node.parent_id !==0) continue;
                if(areaMap[node.parent_id])
                {
                    tree[id].push(areaMap[node.parent_id])
                }
                else{
                    tree[id].push({area_id:node.id, profile_id:profile_id, total_answers:0, total_correct_answers:0});
                }
            }            
        }
        return {tree:tree, root:root}
    }
    buildInverted_AreaProfileTree = async(profile_id:number):Promise<Inverted_AreaProfileTree> => {
        const instance = new Area_ProfileDAO();
        const areaInstance = new AreaDAO();
        const areaList = await areaInstance.listAreas();
        const area_profilelist = await instance.listArea_ProfileByProfileId(profile_id);
        const areaMap:{[id:number]:Area_ProfileDTO} = {};
        for(const area of area_profilelist)
        {
            areaMap[area.area_id] = area;
        }
        for(const area of areaList)
        {
            if(!areaMap[area.id])
            {
                areaMap[area.id] = this.toAreaProfileDTO(area,profile_id);
            }
        }
        let tree:Inverted_AreaProfileTree = {};
        for(const area of areaList)
        {
            if(area.parent_id || area.parent_id===0)
            {
                tree[area.id] = areaMap[area.parent_id];
            }
        }
        return tree;
    }   
}