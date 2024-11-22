import Simulado from "./Simulado"
import {  useEffect, useState } from "react"
import { areaInterface, questionInterface } from "../../../controllers/interfaces"
import { handlePostSimulado, generateNewSimulado } from "../../../controllers/mockTestController";
import { respostaInterface } from "../../../controllers/interfaces";
import { handleGetAnswersByQuestionsIds } from "../../../controllers/answerController";
import { simuladoInterface } from "../../../controllers/interfaces";
import { showAlert } from "../../../App";
import { useNavigate } from "react-router-dom";
import { handleIncrementAreas_Profile, handleIncrementProfileAnswers, handleIncrementProfileMockTest } from "../../../controllers/userController"
import { handlePutSimulado } from "../../../controllers/mockTestController";
import { handleIncrementAnswers } from "../../../controllers/answerController";
import { handleGetAllParentAreasByIds } from "../../../controllers/areasController";
import LoadingScreen from "../../LoadingScreen";
import { useParams } from "react-router-dom";
import { handleIncrementQuestionsAnswers } from "../../../controllers/questionController";
// import date from 'date-and-time'
// import { useNavigate } from "react-router-dom"

// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     useDisclosure,
//     Button,
//     Spinner
//   } from '@chakra-ui/react'

type questionMapInterface = {
    question: questionInterface;
    answers: respostaInterface[];
}[];

type questionMapResultInterface = [number, (number | null)][]; 
// type questionMapResultInterface = [number, (string | null)][];  


const SimuladoFrame = () => {

    const { id } = useParams();

    const questionsParams = JSON.parse(localStorage.getItem("questoes_simulado_"+id) || '[]') as questionInterface[];
    const simuladoParams = JSON.parse(localStorage.getItem("simulado_"+id) || 'null') as simuladoInterface;
    const[loading, setLoading] = useState(true);
    const[questionsHashMap, setQuestionsHashMap] = useState<questionMapInterface>([]);
    const[simulado, setSimulado] = useState<simuladoInterface | null>(simuladoParams);

    const navigate = useNavigate();

    useEffect(() => {
        let newQuestionMapInterface: questionMapInterface = []; 
        const getQuestions = async () => {
            
                let questions: questionInterface[] = questionsParams;
                
                const answers = await handleGetAnswersByQuestionsIds(questions.map(q => q.id));

                questions.forEach(question => {
                    let qstAnswer: respostaInterface[] | undefined = answers.filter(ans => ans.question_id === question.id);
                    //Organiza as alternativas na ordem "A" "B" "C" "D" "E", por answer.question_letter;
                    qstAnswer.sort((a, b) => a.question_letter.charCodeAt(0) - b.question_letter.charCodeAt(0));
                    newQuestionMapInterface.push({question: question, answers: qstAnswer});

                }); 
                setQuestionsHashMap(newQuestionMapInterface);
                if(questions.length === 0) return;
        }
        
        getQuestions();
    }, []);

    useEffect(() => {
        if(questionsHashMap && questionsHashMap.length > 0){
            setLoading(false);
        }
    }, [questionsHashMap]);

    const finishSimulado = (respostas: questionMapResultInterface) => {
        if(!simulado){
            showAlert("Erro ao finalizar simulado", "error");
            return;
        };
        showAlert("Finalizando simulado...", "info");
        //setIsSimuladoAwaitActive(true);
        let totalCorrectAnswers = 0;
        let totalAnswers = 0;
        const date = new Date();
        const dateSimulado = new Date(simulado.creation_date_tz);
        const timeSpentInMinutes = Math.floor((date.getTime() - dateSimulado.getTime()) / 60000);
        
        if(questionsHashMap === null) return;
        const areasAndAnswers: {[key: number]: {total_correct_answers: number, total_answers: number}} = {};
        
        respostas.forEach((value, index) => {
            ++totalAnswers;
            const question = questionsHashMap[index];
            if (question === undefined) {
                return;
            }
            if(areasAndAnswers[question.question.area_id] === undefined){
                areasAndAnswers[question.question.area_id] = {total_correct_answers: 0, total_answers: 0};
            }
            ++areasAndAnswers[question.question.area_id].total_answers;

            if (value[1] !== null) {
                const correctAnswer = question.answers.find((answer) => answer.is_correct === true);
                if (correctAnswer === undefined) {
                    showAlert("Erro na questão " + question.question.id, "error");
                    return;
                }
                
                if (correctAnswer.id === value[1]) {
                    ++areasAndAnswers[question.question.area_id].total_correct_answers;
                    ++totalCorrectAnswers;
                }
            }
        });
        
        const novoSimulado = {
            ...simulado,
            total_correct_answers: totalCorrectAnswers,
            total_answers: totalAnswers,
            time_spent: timeSpentInMinutes
        }
        
        handlePutSimulado(novoSimulado).then((result) => {
            if (result !== null) {
                setSimulado(novoSimulado);
            }
        })

        const respostasIds = respostas.map((value) => value[1]).filter((id) => id !== null);
        handleIncrementAreas_Profile(areasAndAnswers);
        handleIncrementAnswers(respostasIds);
        handleIncrementProfileAnswers(totalCorrectAnswers, totalAnswers);
        handleIncrementProfileMockTest();
        handleIncrementQuestionsAnswers(respostasIds);

        localStorage.removeItem("questoes_simulado_"+id);
        localStorage.removeItem("simulado_"+id);

        
        navigate('/history');
        showAlert("Simulado finalizado com sucesso!", "success");
    }
    // function returnJSXOverlay(): JSX.Element{

    //     if (isSimuladoFinished === null) {
    //         return (
    //         <div id="historyOverlay">
    //             <div id="loading">
    //                 <h2>Tudo pronto!</h2>
    //                 <p>Aguarde enquanto corrigimos sua prova...</p>
    //                 <Spinner size="xl" />
    //             </div>
    //         </div>
    //         )
    //     }
    //     else{
    //         return (
    //         <div id="historyOverlay">
    //                 <h2>Simulado #{simulado.id}</h2>
    //                 <p>Tempo consumudo: {simulado.time_spent} minutos</p>
    //                 <p>Feito dia: {date.format(simulado.creation_date, 'DD/MM/YYYY')}</p>
    //                 <h3>{simulado.total_correct_answers}/{simulado.total_answers}</h3>
    //                 <div className="progress">
    //                     <div style={{width: (simulado.total_correct_answers * 100 / simulado.total_answers ) + '%'}}></div>
    //                 </div>
    //                 <div className="materias">
    //                     {
    //                         Object.keys(simulado.subjects).map((subject, index) => {
    //                             return (
    //                                 <div key={index}>
    //                                     <p>{subject} [{simulado.subjects[subject].total_correct_answers}/{simulado.subjects[subject].total_answers}]</p>
    //                                     <div className="progress">
    //                                         <div style={{width: (simulado.subjects[subject].total_correct_answers * 100 / simulado.subjects[subject].total_answers ) + '%'}} />
    //                                     </div>
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </div>
    //         </div>
    //         )
    //     }

    // }

  
    return (
        loading ? <LoadingScreen /> :
        <>
            {questionsHashMap === null ? <h1>Erro ao carregar simulado</h1> :
                <Simulado questionsHashMap={
                    questionsHashMap.sort((a, b) => a.question.id - b.question.id)
                } handleFinishSimulado={finishSimulado} 
                mockTestId={simulado!.id}     
                /> 
            }
            </>
            //<Modal
            //     isCentered
            //     onClose={onClose}
            //     isOpen={isOpen}
            //     motionPreset='slideInBottom'
            //     closeOnEsc={false}
            //     closeOnOverlayClick={false}
            // >
            //     <ModalOverlay />
            //     <ModalContent>
            //     <ModalHeader>{simulado === null ? 'Corrigindo...' : 'Informações detalhadas'}</ModalHeader>
            //     <ModalBody>
            //         {returnJSXOverlay()}
            //     </ModalBody> 
            //         <ModalFooter>
            //             {simulado !== null && <>
            //                 <Button variant='ghost' mr={3} onClick={() => {
            //                     navigate('/');
            //                 }}>Voltar ao home</Button>
            //                 <Button colorScheme='blue' onClick={onClose}>
            //                 Ver prova
            //                 </Button>
            //                 </>
            //             }

            //         </ModalFooter>
            //     </ModalContent>
            //</Modal>
        
  )
}

export default SimuladoFrame