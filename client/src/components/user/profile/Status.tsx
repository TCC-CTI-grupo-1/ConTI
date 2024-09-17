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

const Status = () => {

    //const navegate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [doesProfileExist, setDoesProfileExist] = useState<boolean>(false);
    const [profileStatus, setProfileStatus] = useState<{[id:number]: area_ProfileInterface}>({});
    const [areas, setAreas] = useState<{ [id: number]: areaInterface }>({}); //Array chave-valor com todas as areas do usuario
    const [areasPai, setAreasPai] = useState<areaInterface[]>([]); //As areas que não dependem de ninguem

    const logos = [mat, port, naturais, humanas]
    
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
            //navegate('/login');
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
            if(area.parent_id == null){
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
            console.log("Erro ao renderizar as areas");
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
                showAlert("Ocorreu um erro ao carrgar a area: " + materiaAtiva);
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

    const [materiaAtiva, setMateriaAtiva] = useState<number>(1); //id da materia ativa
    
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

    function modifyMateriaAtiva(materiaAtiva: number):void
    {
        if(profileStatus[materiaAtiva] === undefined ||
            Object.values(profileStatus[materiaAtiva]).length <= 0)
        {
            showAlert("Você não fez atividade dessa materia!", "warning");
            return;
        }

        setMateriaAtiva(materiaAtiva);

        if(!hasPlayedAnimation[materiaAtiva]){
            let newHPA = hasPlayedAnimation;
            newHPA[materiaAtiva] = true;
            setHasPlayedAnimation(newHPA);
        }  
    }


    function getSubAreas(areaID: number): JSX.Element {
        const subAreas = Object.values(areas).map(area => {
            if (area.parent_id === areaID) {
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
            return null; // Retorna null para áreas que não são subáreas
        });
    
        return <>{subAreas}</>; // Retorna um elemento pai com as subáreas
    }
    

    const primaryColor = '#0066FF';

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
                <div className="info-area">
                    <div id="header">
                        <h2>Informações por área</h2>
                        <p>Clique para receber informação específica de cada uma das áreas exigidas no vestibulinho do CTI</p>
                    </div>
                    {doesProfileExist ?
                    <>
                    <div id="content">
                        <div id="materias">
                            <>
                            {areasPai.map((areaPai) => (
                                <div
                                    key={areaPai.id}
                                    className={areaPai.name}
                                    id={materiaAtiva == areaPai.id ? 'active' : ''}
                                    onClick={() => modifyMateriaAtiva(areaPai.id)}
                                >
                                    <div id="header">
                                        <img src={logos[areaPai.id-1]} alt={areaPai.name} />
                                        <h4>{areaPai.name}</h4>
                                        <img src={expand} className="expand" alt="expand" />
                                    </div>
                                    <div id="content">
                                        <ProgressBar
                                            color={primaryColor}
                                            radius={100}
                                            filledPercentage={getPercentage(areaPai.id)}
                                            animation={hasPlayedAnimation[areaPai.name]}
                                        />
                                    </div>
                                </div>
                            ))}
                            </>
                        </div>
                        <div id="info">
                            <div id="header">
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
                                    })*/
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                    :
                    <>
                    <div>
                        <h3>Você não fez nenhuma questão ainda</h3>
                        <p>Não há dados disponiveis</p>
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