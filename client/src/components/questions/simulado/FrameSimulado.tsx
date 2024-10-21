import Simulado from "./Simulado"
import {  useEffect, useState } from "react"
import { questionInterface } from "../../../controllers/interfaces"
import { handlePostSimulado, generateNewSimulado } from "../../../controllers/mockTestController";
import { respostaInterface } from "../../../controllers/interfaces";
import { handleGetAnswersByQuestionsIds } from "../../../controllers/answerController";
import { simuladoInterface } from "../../../controllers/interfaces";
import { showAlert } from "../../../App";
import { useNavigate } from "react-router-dom";
import { handleIncrementProfileAnswers, handleIncrementProfileMockTest } from "../../../controllers/userController"
import { handlePutSimulado } from "../../../controllers/mockTestController";
import { handleIncrementAnswers } from "../../../controllers/answerController";
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

    const[loading, setLoading] = useState(true);
    const[questionsHashMap, setQuestionsHashMap] = useState<questionMapInterface>([]);
    const[simulado, setSimulado] = useState<simuladoInterface | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        let newQuestionMapInterface: questionMapInterface = []; 
        const getQuestions = async () => {
            
                let questions = await generateNewSimulado();
                
                const answers = await handleGetAnswersByQuestionsIds(questions.map(q => q.id));

                questions.forEach(question => {
                    let qstAnswer: respostaInterface[] | undefined = answers.filter(ans => ans.question_id === question.id);
                    //Organiza as alternativas na ordem "A" "B" "C" "D" "E", por answer.question_letter;
                    qstAnswer.sort((a, b) => a.question_letter.charCodeAt(0) - b.question_letter.charCodeAt(0));
                    newQuestionMapInterface.push({question: question, answers: qstAnswer});

                }); 
                setQuestionsHashMap(newQuestionMapInterface);
                console.log("newQuestionMapInterface: ");
                console.log(newQuestionMapInterface);
        }
        
        getQuestions();
    }, []);

    useEffect(() => {
        
        const postSimulado = async () => {
            let questionsarray: questionInterface[] = questionsHashMap.map(q => q.question);
            const simulado = await handlePostSimulado(questionsarray, "automatico", 50);
            if (simulado !== null) {
                setSimulado(simulado);
                setLoading(false);
            }
            else{
                showAlert("Erro ao Iniciar simulado", "error");
                showAlert("Por favor, tente novamente", "error");
            }
        }

        if(questionsHashMap && questionsHashMap.length > 0){
            postSimulado();
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
        
        respostas.forEach((value, index) => {
            ++totalAnswers;
            const question = questionsHashMap[index];
            if (question !== undefined && value[1] !== null) {
                const correctAnswer = question.answers.find((answer) => answer.is_correct === true);
                if (correctAnswer !== undefined && correctAnswer.id === value[1]) {
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
                setSimulado(simulado);
            }
            return true;
        })

        const respostasIds = respostas.map((value) => value[1]).filter((id) => id !== null);
        handleIncrementAnswers(respostasIds);
        handleIncrementProfileAnswers(totalCorrectAnswers, totalAnswers);
        handleIncrementProfileMockTest();

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
        loading ? <h2>Aguarde enquanto finalizamos o seu simulado... </h2> :
        <>
            {questionsHashMap === null ? <h1>Erro ao carregar simulado</h1> :
                <Simulado questionsHashMap={questionsHashMap} handleFinishSimulado={finishSimulado} 
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