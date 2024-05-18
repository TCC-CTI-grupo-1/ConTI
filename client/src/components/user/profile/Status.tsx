import { useState, useEffect } from "react";
import { Skeleton } from "@chakra-ui/react";

import mat from '../../../assets/mat.png';
import port from '../../../assets/port.png';
import naturais from '../../../assets/naturais.png';
import humanas from '../../../assets/humanas.png';
import expand from '../../../assets/expand.png';

const Status = () => {

    const [loading, setLoading] = useState<boolean>(true);

    async function loadConfig():Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }

    useEffect(() => {
        loadConfig().then(() => setLoading(false));
    }, []);


    interface SubSubjectInformation{
        name: string;
        percentage: number;
        totalQuestions: number;
        totalSuccess: number;
        totalErrors: number;
    }

    interface SubjectInformation {
        name: string;
        percentage: number;
        totalQuestions: number;
        totalSuccess: number;
        totalErrors: number;
        sub_subjects: {
            [key: string]: SubSubjectInformation;
        }
    }

    interface ProfileInformation {
        percentage: number;
        totalTests: number;
        totalQuestions: number;
        totalSuccess: number;
        totalErrors: number;
        subjects: {
            [key: string]: SubjectInformation;
        };
    }

    const profileInformation: ProfileInformation = {
        percentage: 0.42,
        totalTests: 42,
        totalQuestions: 2246,
        totalSuccess: 8765887765,
        totalErrors: 0,
        subjects: {
            math: {
                name: 'Matemática',
                percentage: 0.89,
                totalQuestions: 42,
                totalSuccess: 42,
                totalErrors: 0,
                sub_subjects: {
                    algebra: {
                        name: 'Álgebra',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    geometry: {
                        name: 'Geometria',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    trigonometry: {
                        name: 'Trigonometria',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                }
            },
            port: {
                name: 'Português',
                percentage: 0.22,
                totalQuestions: 42,
                totalSuccess: 42,
                totalErrors: 0,
                sub_subjects: {
                    grammar: {
                        name: 'Gramática',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    literature: {
                        name: 'Literatura',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    writing: {
                        name: 'Redação',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                }
            },
            naturais: {
                name: 'Ciências Naturais',
                percentage: 0.68,
                totalQuestions: 42,
                totalSuccess: 42,
                totalErrors: 0,
                sub_subjects: {
                    biology: {
                        name: 'Biologia',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    chemistry: {
                        name: 'Química',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    physics: {
                        name: 'Física',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                }
            },
            humanas: {
                name: 'Ciências Humanas',
                percentage: 0.42,
                totalQuestions: 42,
                totalSuccess: 42,
                totalErrors: 0,
                sub_subjects: {
                    history: {
                        name: 'História',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    geography: {
                        name: 'Geografia',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                    philosophy: {
                        name: 'Filosofia',
                        percentage: 0.42,
                        totalQuestions: 42,
                        totalSuccess: 42,
                        totalErrors: 0,
                    },
                }
            }
            
        }
    }

    const [materiaAtiva, setMateriaAtiva] = useState<'math' | 'port' | 'naturais' | 'humanas'>('math');

    const [materiaAtivaDados, setMateriaAtivaDados] = useState<SubjectInformation>(profileInformation.subjects.math);

    /*Valores que serão recebidos pelo banco de dados*/




    useEffect(() => {
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
        
    }, [materiaAtiva]);


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
                <div className="info-geral">
                    <div id="porcentagem">
                        <h3>Taxa de acerto nos simulados</h3>
                        <div id="percentage"></div>
                    </div>
                    <div id="info">
                        <div><h2>{profileInformation.totalTests}</h2><h3>Provas já feitas</h3></div>
                        <div><h2>{profileInformation.totalQuestions}</h2><h3>Questões já respondidas</h3></div>
                        <div><h2>{profileInformation.totalSuccess}</h2><h3> provas amanha</h3></div>
                    </div>
                </div>
                <div className="info-area">
                    <div id="header">
                        <h2>Informações por área</h2>
                        <p>Clique para receber informação específica de cada uma das áreas exigidas no vestibulinho do CTI</p>
                    </div>
                    <div id="content">
                        <div id="materias">
                            <div id="active" className="math"
                            onClick={() => {
                                setMateriaAtiva('math');
                            }}>
                                <div id="header">
                                    <img src={mat}></img>
                                    <h3>Matemática</h3>
                                    <img src={expand} className="expand"></img>
                                </div>
                                <div id="content">
                                    <div id="percentage-2"></div>
                                </div>
                            </div>
                            <div className="port"
                            onClick={() => {
                                setMateriaAtiva('port');
                            }}>
                                <div id="header">
                                    <img src={port}></img>
                                    <h3>Português</h3>
                                    <img src={expand} className="expand"></img>
                                </div>
                                <div id="content">
                                    <div id="percentage-2"></div>
                                </div>
                            </div>
                            <div className="naturais"
                            onClick={() => {
                                setMateriaAtiva('naturais');
                            }}>
                                <div id="header">
                                    <img src={naturais}></img>
                                    <h3>Ciências Naturais</h3>
                                    <img src={expand} className="expand"></img>
                                </div>
                                <div id="content">
                                    <div id="percentage-2"></div>
                                </div>
                            </div>
                            <div className="humanas"
                            onClick={() => {
                                setMateriaAtiva('humanas');
                            }}>
                                <div id="header">
                                    <img src={humanas}></img>
                                    <h3>Ciências Humanas</h3>
                                    <img src={expand} className="expand"></img>
                                </div>
                                <div id="content">
                                    <div id="percentage-2"></div>
                                </div>
                            </div>
                        </div>
                        <div id="info">
                            <div id="header">
                                <div id="title">
                                    <h2 className="title">{materiaAtivaDados.name}</h2>
                                    <h2>{materiaAtivaDados.percentage * 100}%</h2>
                                </div>
                                <div id="progress-bar">
                                    <div id="progress"
                                    style={{
                                        width: `${materiaAtivaDados.percentage * 100}%`
                                    }}></div>
                                </div>
                            </div>
                            <div id="content">
                                <div id="total-questions">
                                    <p>Total de questões feitas: {materiaAtivaDados.totalQuestions}</p>
                                    <p>Total de questões corretas: {materiaAtivaDados.totalSuccess}</p>
                                    <p>Total de questões erradas: {materiaAtivaDados.totalErrors}</p>
                                </div>

                                <div id="sub-subjects">
                                    <div className="sub-subject header">
                                        <p>Nome</p>
                                        <p>Porcentagem</p>
                                        <p>Total de questões feitas</p>
                                        <p>Total de questões corretas</p>
                                        <p>Total de questões erradas</p>
                                    </div>
                                    {Object.entries(materiaAtivaDados.sub_subjects).map(([, value]) => {
                                        return (
                                            <div className="sub-subject">
                                                <h3>{value.name}</h3>
                                                <p>{value.percentage * 100}%</p>
                                                <p>{value.totalQuestions}</p>
                                                <p>{value.totalSuccess}</p>
                                                <p>{value.totalErrors}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
        
    );
};

export default Status;