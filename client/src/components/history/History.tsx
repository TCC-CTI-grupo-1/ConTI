import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import DaySelector from './DaySelector'
import { useState } from 'react'
import date from 'date-and-time'
import { handleGetAnswersByQuestionId, handleGetAnswersByQuestionsIds, handleGetAreaById, handleGetAreaIdByQuestionId, handleGetAreasByQuestionsIds, handleGetQuestion, handleGetQuestion_MockTestsByMockTestId, 
    handleGetMockTestsByDateAndProfile, handleGetTopParentAreaById, handleGetTopParentAreasByIds, handleGetQuestionsByIds, handleGetAreasMap, handleGetQuestions } from '../../controllers/userController'
import { areaInterface, questionInterface, simuladoInterface } from '../../controllers/interfaces'
import { useNavigate } from 'react-router-dom'


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Spinner
  } from '@chakra-ui/react'
import { showAlert } from '../../App'

const History = () => {

    const {onOpen, onClose, isOpen} = useDisclosure();

    const [activeDate, setActiveDate] = useState<Date>(new Date());

    const [simulados, setSimulados] = useState<simuladoInterface[]>([]);
    const [listas, setListas] = useState<simuladoInterface[]>([]);

    const [activeQuestionOverlay, setActiveQuestionOverlay] = useState<number>(11); //[simulados, listas

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const navegate = useNavigate();

    const [areas, setAreas] = useState<{[key: string]: areaInterface}>({});

    const [questionsGlobal, setQuestionsGlobal] = useState<questionInterface[]>([]);

    async function handleSetAreasMap(){
        const areasMap = await handleGetAreasMap();

        if(Object.keys(areasMap).length === 0){
            showAlert("Erro ao carregar areas");
            return;
        }

        setAreas(areasMap);
        console.log(areasMap);
    }

    useEffect(() => {
        setLoading(true);
        handleSetAreasMap();
    }, []);

    useEffect(() => {
        if(Object.keys(areas).length !== 0){
            setLoading(false);
        }
    }, [areas]);

    useEffect(() => {
        setLoading2(true);
        handleSimuladosAndListas();
    }, [activeDate]);


    async function handleSimuladosAndListas()
    {
        let response = await getSimulados(activeDate);

        setSimulados(response);

        let response2 = await getListas(activeDate);

        setListas(response2);

        setLoading2(false);
    }

    //[simulados, listas]
    async function getSimulados(date: Date): Promise<simuladoInterface[]>{
        //Pega os simulados e listas feitos no dia
        let day = new Date(date);

        let responseSimulados: simuladoInterface[] = await handleGetMockTestsByDateAndProfile(day);

        responseSimulados.forEach(async (simulado) => {
            const questionMockTests = await handleGetQuestion_MockTestsByMockTestId(simulado.id);
            let questions = await handleGetQuestionsByIds(questionMockTests.map(qmt => qmt.question_id));
            const answers = await handleGetAnswersByQuestionsIds(questions.map(q => q.id));

            const answersMockTests = answers.filter(answer => questionMockTests.find(qmt => qmt.answer_id === answer.id) !== undefined);
            let subjects: {
                [key: string]: {
                    total_answers: number;
                    total_correct_answers: number;
                };
            } = {};
            questions.forEach(question => {
                const areaID = question.area_id;
                const area = areas[areaID];
                const areaName = area.name;
                if(subjects[areaName] === undefined){
                    subjects[areaName] = {total_answers: 0, total_correct_answers: 0};
                }
                subjects[areaName].total_answers++;
                if (answersMockTests.find(answer => answer.question_id === question.id && answer.is_correct) !== undefined){
                    subjects[areaName].total_correct_answers++;
                }
            })
            console.log("subjects", subjects);
            simulado.subjects = subjects
        });
        return responseSimulados;
    }

    async function getListas(date: Date): Promise<simuladoInterface[]>{
        //Pega os simulados e listas feitos no dia
        let day = new Date(date);

        let responseSimulados: simuladoInterface[] = await handleGetMockTestsByDateAndProfile(day);

        responseSimulados.forEach(async (simulado) => {
            const questionMockTests = await handleGetQuestion_MockTestsByMockTestId(simulado.id);
            const questions = await handleGetQuestionsByIds(questionMockTests.map(qmt => qmt.question_id));
            const answers = await handleGetAnswersByQuestionsIds(questions.map(q => q.id));
            const answersMockTests = answers.filter(answer => questionMockTests.find(qmt => qmt.answer_id === answer.id) !== undefined);
            let subjects: {
                [key: string]: {
                    total_answers: number;
                    total_correct_answers: number;
                };
            } = {};
            questions.forEach(question => {
                const areaID = question.area_id;
                const area = areas[areaID];
                const areaName = area.name;
                if(subjects[areaName] === undefined){
                    subjects[areaName] = {total_answers: 0, total_correct_answers: 0};
                }
                subjects[areaName].total_answers++;
                if (answersMockTests.find(answer => answer.question_id === question.id && answer.is_correct) !== undefined){
                    subjects[areaName].total_correct_answers++;
                }
            })
            console.log("subjects", subjects);
            simulado.subjects = subjects
        });
        return responseSimulados;
    }
  

    function openOverlay(questionClicked: number){
        //Abre o overlay com a questão clicada
        onOpen();
        setActiveQuestionOverlay(questionClicked);
    }

    function retrurnActiveQuestionId(): number{
        //Retorna o id da questão clicada
        let i = activeQuestionOverlay % 10 === 1 ? 0 : 1; //0 = simulados, 1 = listas
        let j = Math.floor(activeQuestionOverlay/10) - 1; //Index do simulado ou lista
        return i === 0 ? simulados[j].id : listas[j].id;
    }

    function returnJSXOverlay(): JSX.Element{

        //Retorna o JSX do overlay
        let i = activeQuestionOverlay % 10 === 1 ? 0 : 1;
        let j = Math.floor(activeQuestionOverlay/10) - 1;
        if (i === 0 ? simulados[j] !== undefined : listas[j] !== undefined)
        {
            return (
                <div id="historyOverlay">
                    <h2>Simulado #{i === 0 ? simulados[j].id : listas[j].id}</h2>
                    <p>Tempo consumudo: {i === 0 ? simulados[j].time_spent : listas[j].time_spent} minutos</p>

                    <h3>{i === 0 ? simulados[j].total_correct_answers : listas[j].total_correct_answers}
                        /
                        {i === 0 ? simulados[j].total_answers : listas[j].total_answers}</h3>
                    <div className="progress">
                        <div style={{width: (i === 0 ? simulados[j].total_answers : listas[j].total_answers * 100 / i === 0 ? simulados[j].total_correct_answers : listas[j].total_correct_answers ) + '%'}}></div>
                    </div>
                    <div className="materias">
                        {
                            (i === 0 ? simulados[j].subjects : listas[j].subjects) &&
                            Object.keys(i === 0 ? simulados[j].subjects : listas[j].subjects).map((subject, index) => {
                                
                                let subjectts = i === 0 ? simulados[j].subjects : listas[j].subjects;

                                return (
                                    <div key={index}>
                                        <p>{subject} [{subjectts[subject].total_correct_answers}/{subjectts[subject].total_answers}]</p>
                                        <div className="progress">
                                            <div style={{width: (subjectts[subject].total_correct_answers * 100 / subjectts[subject].total_correct_answers) + '%'}} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>Ops! Ocorreu um erro.</h1>
                    <p>Favor recarregar a pagina.</p>
                </div>
            )
        }

    }

    function showDate(){
        let date = new Date(activeDate);
    }

    return (
        <>{loading ? <h1>Carrregando</h1> :
            <div id="history" className="flex-container full-screen-size">
                    <Navbar screen="history"/>
                    <div className="container">
                        <div className="header">
                            <h1 onClick={showDate}>Histórico</h1>
                        </div>
                        <div className="inversed-border"></div>
                        <div className="content">
                            <h3>Veja seus simulados anteriores e quais são os pontos com mais dificuldade.</h3>
                            <DaySelector handleChangeDay={setActiveDate} />
                            <div>
                                {
                                    loading2 ?
                                    <h1>Carregando...</h1>
                                    :
                                    <>
                                        <div id="simulados">
                                            <h2>Simulados</h2>
                                            <div>        
                                                {
                                                    simulados.length === 0 ? <p>Nenhum simulado feito nesse dia</p> :
                                                    simulados.map((simulado, index) => {
                                                        return (
                                                            <div key={index} className="provaCard"
                                                            onClick={() => {
                                                                let number = (index + 1) * 10 + 1;
                                                                openOverlay(number);
                                                            }}>
                                                                <h3>[ {simulado.id} ] - {simulado.total_correct_answers}/{simulado.total_answers}</h3>
                                                                <div className="progress">
                                                                    <div style={{width: `${(simulado.total_correct_answers/simulado.total_answers)*100}%`}}></div>
                                                                </div>
                                                                <p>Tempo consumido: {simulado.time_spent}min</p>
                                                                <div className="materias">
                                                                    {
                                                                        (simulado.subjects) &&
                                                                        Object.keys(simulado.subjects).map((subject, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <p>{subject}</p>
                                                                                    <h4>{simulado.subjects![subject].total_correct_answers}/{simulado.subjects![subject].total_answers}</h4>
                                                                                    <div className="progress">
                                                                                        <div style={{width: `${(simulado.subjects![subject].total_correct_answers/simulado.subjects![subject].total_answers)*100}%`}}></div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                
                                            </div>
                                        </div>
                                        <div id="listas">
                                            <h2>Listas</h2>
                                            <div>
                                                {
                                                    listas.length === 0 ? <p>Nenhuma lista feita nesse dia</p> :
                                                    listas.map((lista, index) => {
                                                        return (
                                                            <div key={index} className="provaCard"
                                                            onClick={() => {
                                                                let number = (index + 1) * 10 + 2;
                                                                openOverlay(number);
                                                            }}>
                                                                <h3>[ {lista.id} ] - {lista.total_correct_answers}/{lista.total_answers}</h3>
                                                                <div className="progress">
                                                                    <div style={{width: `${(lista.total_correct_answers/lista.total_answers)*100}%`}}></div>
                                                                </div>
                                                                <p>Tempo consumido: {lista.time_spent}min</p>
                                                                <div className="materias">
                                                                    {
                                                                        (lista.subjects) &&
                                                                        Object.keys(lista.subjects).map((subject, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <p>{subject}</p>
                                                                                    <h4>{lista.subjects![subject].total_correct_answers}/{lista.subjects![subject].total_answers}</h4>
                                                                                    <div className="progress">
                                                                                        <div style={{width: `${(lista.subjects![subject].total_correct_answers/lista.subjects![subject].total_answers)*100}%`}}></div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                    </div>
            </div>
            }
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Informações detalhadas</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {returnJSXOverlay()}
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>Fechar</Button>
                    <Button colorScheme='blue' onClick={() => {
                        navegate(`/simulado/${retrurnActiveQuestionId()}`);
                    }}>
                    Ver prova
                    </Button>   

                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
      )
    }
export default History