import { useState, useEffect } from "react";
import { Skeleton } from "@chakra-ui/react";
import { ProgressBar } from "../../ProgressBar";
import { handleGetArea_Profile } from "../../../controllers/userController";
import { area_ProfileInterface } from "../../../controllers/interfaces";
import { areaInterface } from "../../../controllers/interfaces";
import { handleGetAreas } from "../../../controllers/areasController";
//import { useNavigate } from "react-router-dom";
import mat from '../../../assets/areasIcons/1.png';
import port from '../../../assets/areasIcons/2.png';
import naturais from '../../../assets/areasIcons/3.png';
import humanas from '../../../assets/areasIcons/4.png';
import expand from '../../../assets/expand.png';
import { showAlert } from "../../../App";
import AreaTree from "../../AreaTree";

const Status = () => {

    //const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [doesProfileExist, setDoesProfileExist] = useState<boolean>(false);
    const [profileStatus, setProfileStatus] = useState<{[id:number]: area_ProfileInterface}>({});
    const [areas, setAreas] = useState<{ [id: number]: areaInterface }>({}); //Array chave-valor com todas as areas do usuario
    const [areasPai, setAreasPai] = useState<areaInterface[]>([]); //As areas que não dependem de ninguem
    
    const [materiaAtiva, setMateriaAtiva] = useState<number>(1019); //id da materia ativa

    function getPercentage(id: number):number
    {
        if(profileStatus[id] === undefined)
        {
            return 0;
        }
        return Math.trunc(((profileStatus[id].total_correct_answers / profileStatus[id].total_answers)*100));
    }

    const [hasPlayedAnimation, setHasPlayedAnimation] = useState<hasPlayedAnimationI>({});
    //matematica, portugues, ciencias naturais e ciencias humanas


    async function handleGetAreasLocalProfile(): Promise<{[id:number]: area_ProfileInterface} | null>{
        await loadConfig();
        const status = await handleGetArea_Profile();
        if(status)
        {
            let newStatus: {[id:number]: area_ProfileInterface} = {};
            status.forEach(s => {
                newStatus[s.area_id] = s;
            })
            return newStatus;
        }
        else{
            //navigate('/login');
            showAlert("Você não está logado");
            return null;
        }

    }

    async function handleGetAreasLocal(): Promise<{ [id: number]: areaInterface } | null>{
        if(profileStatus){
            const areas = await handleGetAreas();
            
            let areasMap: { [id: number]: areaInterface } = {};
            areas.forEach((area) => {
                areasMap[area.id] = area;
            });
            return (areasMap);       

        }
        else{
            showAlert("Erro ao carregar as areas");
            return null;
        }
    }

    function handleSetAreasPai(){
        let areasPaiList: areaInterface[] = [];
        Object.values(areas).forEach(area => {
            if(area.parent_id == 0){
                areasPaiList.push(area);
            }
        });        
        areasPaiList.sort((a, b) => a.id - b.id);
        setAreasPai(areasPaiList);
    }


    const updateHasPlayedAnimation = () => {
        const newHasPlayedAnimation: hasPlayedAnimationI = {};
        
        areasPai.forEach(area => {
            newHasPlayedAnimation[area.name] = false; // Define o valor padrão para `false`
        });

        setHasPlayedAnimation(newHasPlayedAnimation);
    };          

    async function loadConfig():Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 10));
        return true;
    }


    async function handleRunOtherFunctions(){
        const profileNew = await handleGetAreasLocalProfile();
        const areasNew = await handleGetAreasLocal();
        updateHasPlayedAnimation();

        if(!areasNew){
            console.log("Erro ao renderizar as áreas");
            return;
        }

        if(!profileNew){
            console.log("Erro ao renderizar o perfil");
            return;
        }

        setAreas(areasNew);
        setProfileStatus(profileNew);     
    }

    useEffect(() => {
        handleRunOtherFunctions();
    }, []);

    useEffect(() => {
        if(Object.keys(areas).length > 0)
        {   
            if(areas[materiaAtiva] === undefined)
            {
                showAlert("Ocorreu um erro ao carrgar a área: " + materiaAtiva);
                console.log("Areas:");
                console.log(areas);
                return;
            }
            handleSetAreasPai();
        }
        
    }, [areas])


    useEffect(() => {
        if(Object.keys(profileStatus).length > 0)
        {   
            if(profileStatus[materiaAtiva] === undefined)
            {
                showAlert("Ocorreu um erro ao carrgar o perfil: " + materiaAtiva);
                console.log("Areas:");
                console.log(profileStatus);
                return;
            }
            //showAlert("Perfil foi!", "success");
            setDoesProfileExist(true);
        }
        
    }, [profileStatus])

    useEffect(() => {
        if(areasPai.length > 0)
        {
            console.log("Areas pai");
            console.log(areasPai);
            setLoading(false);
        }
    }, [areasPai])

    
    
    interface hasPlayedAnimationI {
        [name: string]: boolean,
    } 

    /*Valores que serão recebidos pelo banco de dados*/




    /*useEffect(() => {
        //alert('Materia Ativa: ' + materiaAtiva);

        const materias = document.querySelectorAll('#status > .info-area > #content > #materias > div');
        console.log(materias);
        materias?.forEach((materia) => {
            console.log(materia);
            materia.id = '';
        });
        
        materias?.forEach((materia) => {
            console.log(materia);
            if(materia.classList.contains(materiaAtiva)){
                materia.id = 'active';
            }
        });

        for (const [key, value] of Object.entries(profileInformation.subjects)) {
            if(key === materiaAtiva){
                setMateriaAtivaDados(value);
            }
        }
        
    }, [materiaAtiva]);*/

    /*function modifyMateriaAtiva(materiaAtiva: number):void
    {
        if(profileStatus[materiaAtiva] === undefined ||
            Object.values(profileStatus[materiaAtiva]).length <= 0)
        {
            showAlert("Você não fez atividade dessa matéria!", "warning");
            return;
        }

        setMateriaAtiva(materiaAtiva);

        if(!hasPlayedAnimation[materiaAtiva]){
            let newHPA = hasPlayedAnimation;
            newHPA[materiaAtiva] = true;
            setHasPlayedAnimation(newHPA);
        }  
    }*/

        const localUserPercentageAreas: { [id: number]: number } = {
            45180: 0.45,
            0: 0.5,
            1000: 0.9,
            1019: 0.8,
            45177: 0.6,
            45178: 0.65,
            45179: 0.55,
            1001: 0.75,
            1002: 0.7,
            1003: 0.6,
            1004: 0.68,
            1005: 0.72,
            1006: 0.66,
            1007: 0.64,
            1008: 0.69,
            1009: 0.61,
            1010: 0.62,
            1011: 0.67,
            1012: 0.71,
            1013: 0.63,
            1014: 0.65,
            1015: 0.73,
            1016: 0.77,
            1017: 0.7,
            1018: 0.74,
            1020: 0.68,
            1021: 0.7,
            1022: 0.69,
            1023: 0.72,
            1024: 0.64,
            1025: 0.66,
            1026: 0.75,
            1027: 0.68,
            1028: 0.67,
            1029: 0.7,
            1030: 0.62,
            1031: 0.76,
            1032: 0.65,
            1033: 0.69,
            1034: 0.71,
            1035: 0.63,
            1036: 0.67,
            1038: 0.74,
            1039: 0.69,
            1040: 0.65,
            1041: 0.72,
            1042: 0.7,
            1043: 0.68,
            1044: 0.73,
            1045: 0.71,
            1046: 0.64,
            1047: 0.67,
            1048: 0.75,
            1049: 0.66,
            1050: 0.7,
            1051: 0.69,
            1052: 0.72,
            1053: 0.65,
            1054: 0.68,
            1055: 0.74,
            1056: 0.7,
            1057: 0.72,
            1058: 0.67,
            1059: 0.71,
            1060: 0.66,
            1061: 0.73,
            1062: 0.75,
            1063: 0.69,
            1064: 0.64,
            1065: 0.68,
            1066: 0.67,
            1067: 0.71,
            1068: 0.66,
            1069: 0.74,
            1070: 0.7,
            1071: 0.72,
            1073: 0.69,
            1074: 0.65,
            1075: 0.68,
            1076: 0.72,
            1077: 0.64,
            1079: 0.67,
            1080: 0.7,
            1081: 0.73,
            1082: 0.75,
            1083: 0.69,
            1084: 0.66,
            1085: 0.68,
            1086: 0.67,
            1087: 0.71,
            1088: 0.74,
            1089: 0.7,
            1090: 0.72,
            1091: 0.69,
            1092: 0.65,
            1093: 0.68,
            1094: 0.67,
            1095: 0.73,
            1096: 0.66,
            1097: 0.71,
            1098: 0.64,
            1099: 0.75,
            1100: 0.72,
            1101: 0.69,
            1102: 0.68,
            1103: 0.67,
            1104: 0.71,
            1105: 0.74,
            1106: 0.7,
            1107: 0.72,
            1037: 0.73,
            1072: 0.75,
          };
          
    return (
        <>
        {loading && <div id="status">
            <div className="info-geral">
                    <Skeleton>
                        <div id="porcentagem">
                            <h3>Taxa de acerto nos simulados</h3>
                            <div id="percentage"></div>
                        </div>
                    </Skeleton>

                    <div id="info">
                        <Skeleton><div><h3>Provas já feitas</h3></div></Skeleton>
                        <Skeleton><div><h3>Provas já feitas</h3></div></Skeleton>
                        <Skeleton><div><h3>Provas já feitas</h3></div></Skeleton>
                    </div>
                </div>
                <Skeleton height={'500px'} />
        </div>
        }
        {
            !loading && <div id="status">
                <div className="info-user">
                    <span>
                        <h1>Mateus</h1>
                        <h3>(Taxa geral de acertos)</h3>
                        <h2>70%</h2>
                    </span>
                    <div className="progress">
                        <div style={{width: `70%`}}></div>
                    </div>
                    <div className="more">
                        <div>
                            <h3>213</h3>
                            <p>Simulados á feitos</p>
                        </div>
                        <div>
                            <h3>764326</h3>
                            <p>Questões respondidas</p>
                        </div>
                        <div>
                            <h3>1/30</h3>
                            <p>Acertos em física</p>
                        </div>
                    </div>
                </div>
                <div className="info-area">
                    <div id="header">
                        <h2>Informações por área</h2>
                        <p>Clique para receber informação específica de cada uma das áreas exigidas no vestibulinho do CTI</p>
                    </div>
                    {doesProfileExist ?
                    <>
                    <div id="content">
                        
                        <div id="info"  style={{width: '100%'}}>
                            <AreaTree onActiveAreasChange={() => {}}
                            rootID={0}
                            userPercentageAreas={localUserPercentageAreas}
                            isBlocks
                            />
                            {/*<div id="header">
                                <div id="title">
                                    <h2 className="title">{areas[materiaAtiva].name}</h2>
                                    <h2>{getPercentage(materiaAtiva)}%</h2>
                                </div>
                                <div id="progress-bar">
                                    <div id="progress"
                                    style={{
                                        width: `${getPercentage(materiaAtiva)}%`
                                    }}></div>
                                </div>
                            </div>
                            <div id="content">
                                <div id="total-questions">
                                    <p>Total de questões feitas: {profileStatus[materiaAtiva].total_answers}</p>
                                    <p>Total de questões corretas: {profileStatus[materiaAtiva].total_correct_answers}</p>
                                    <p>Total de questões erradas: {(profileStatus[materiaAtiva].total_answers - 
                                    profileStatus[materiaAtiva].total_correct_answers)}</p>
                                </div>

                                <div id="sub-subjects">
                                    <div className="sub-subject header">
                                        <p>Nome</p>
                                        <p>Porcentagem</p>
                                        <p>Total de questões feitas</p>
                                        <p>Total de questões corretas</p>
                                        <p>Total de questões erradas</p>
                                    </div>
                                    {Object.values(areas).map(area => {
                                        if(area.parent_id == materiaAtiva)
                                        {
                                            if(profileStatus[area.id] === undefined)
                                            {
                                                return null;
                                            }
                                            return (
                                                <>
                                                    <div className="sub-subject" key={area.id}>
                                                        <p>{area.name}</p>
                                                        <p>{getPercentage(area.id)}%</p>
                                                        <p>{profileStatus[area.id].total_answers}</p>
                                                        <p>{profileStatus[area.id].total_correct_answers}</p>
                                                        <p>{(profileStatus[area.id].total_answers -
                                                            profileStatus[area.id].total_correct_answers)}</p>
                                                    </div>
                                                    {getSubAreas(area.id)}
                                                </>
                                            );
                                        }
                                    })
                                    
                                    
                                    
                                    /*Object.entries(materiaAtivaDados.sub_subjects).map(([index, value]) => {
                                        return (
                                            <div className="sub-subject" key={index}>
                                                <h3>{value.name}</h3>
                                                <p>{value.percentage * 100}%</p>
                                                <p>{value.totalQuestions}</p>
                                                <p>{value.totalSuccess}</p>
                                                <p>{value.totalErrors}</p>
                                            </div>
                                        );
                                    })
                                    
                                </div>
                            </div>*/}
                        </div>
                    </div>
                    </>
                    :
                    <>
                    <div>
                        <h3>Você não fez nenhuma questão ainda</h3>
                        <p>Não há dados disponíveis</p>
                    </div>
                    </>
                    }   
                </div>
            </div>
        }
        </>
        
    );
};

export default Status;