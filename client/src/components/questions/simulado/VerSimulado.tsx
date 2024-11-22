import Simulado from "./Respostas"
import { useState, useEffect } from "react"
import { questionInterface, respostaInterface } from "../../../controllers/interfaces"
/*import { handleGetQuestion } from "../../../controllers/questionController"
import { handleGetAnswersByQuestionId } from "../../../controllers/answerController"*/
//import { useNavigate } from "react-router-dom"
import { handleGetQuestion_MockTestsByMockTestId } from "../../../controllers/questionMockTestController"
import { useParams } from "react-router-dom"
import { handleGetQuestionsByIds } from "../../../controllers/questionController"
import { handleGetAnswersByQuestionsIds } from "../../../controllers/answerController"

  type questionResultsInterface = [questionInterface, (respostaInterface | null), answers:respostaInterface[]][];

const SimuladoFrame = () => {
    const { id } = useParams();

    const [questionsHashMap, setQuestionsHashMap] = useState<questionResultsInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [pontuacao, setPontuacao] = useState<boolean[]>([]);

    //const navigate = useNavigate();

    useEffect(() => {
        const getSimulado = async () => {
            
            let newQuestionsHashMap: questionResultsInterface = [];

            const simulado = await handleGetQuestion_MockTestsByMockTestId(Number(id));


            console.log(typeof(simulado));

            if(simulado === null){
                console.log("Simulado não encontrado");
                return;
            }

            let newPontuacao: boolean[] = [];

            const allQuestions = await handleGetQuestionsByIds(simulado.map((q) => q.question_id));
            const allAnswers = await handleGetAnswersByQuestionsIds(simulado.map((q) => q.question_id));

            if(allQuestions === null || allAnswers === null){
                console.error("Erro ao carregar questões");
                return;
            }

            allQuestions.forEach((question) => {
                let respostas = allAnswers.filter((a) => a.question_id === question.id);
                let correctAnswer = respostas.find((a) => a.is_correct === true);

                if(correctAnswer === undefined || respostas === undefined){
                    console.error("Erro ao carregar questão " + question.id);
                    return;
                }
                
                let simuladoAlternativaMarcada = simulado.find((s) => s.question_id === question.id);
                if(simuladoAlternativaMarcada === undefined){
                    console.error("Erro ao carregar questionMockTest " + question.id);
                    return;
                }

                let alternativaMarcada = respostas.find((a) => a.id === simuladoAlternativaMarcada.answer_id);

                if(alternativaMarcada === undefined){
                    console.error("Erro ao carregar alternativa marcada");
                    console.error(respostas);
                    console.error(simuladoAlternativaMarcada);
                    newQuestionsHashMap.push([question, null, respostas]);

                    return;
                }

                newQuestionsHashMap.push([question, alternativaMarcada, respostas]);
            });

            /*await Promise.all(simulado.map(async (question) => {
                const questionData = await handleGetQuestion(question.question_id); 
                const answers = await handleGetAnswersByQuestionId(question.question_id);
                if(questionData !== null)
                    {
                        let respostas = answers.find((a) => a.id === question.answer_id)
                        newQuestionsHashMap.push([questionData, respostas !== undefined ? respostas : null, answers]);
                        let correctAnswer = answers.find((a) => a.is_correct === true);
                        if(correctAnswer === undefined){
                            console.error("Erro ao carregar questão " + question.question_id);
                        }
                        else{
                            if(correctAnswer.id === question.answer_id){
                                newPontuacao.push(true);
                            }
                            else{
                                newPontuacao.push(false);
                            }
                        }
                        
                    }
                else{
                    console.error("Erro ao carregar questão " + question.question_id);
                }
                
            })); */

            setQuestionsHashMap(newQuestionsHashMap);
            setLoading(false);
            setPontuacao(newPontuacao);

            console.log(newQuestionsHashMap);
        }

        console.log(id);

        getSimulado();
    }, []);

    return (
        loading ? <h2>Aguarde enquanto finalizamos o seu simulado... </h2> :
        <>
            {questionsHashMap === null ? <h1>Erro ao carregar simulado</h1> :
                <Simulado questionsHashMap={
                    questionsHashMap.sort((a, b) => a[0].id - b[0].id)
                } pontuacao={pontuacao}    
                /> 
            }
        </>
        
  )
}

export default SimuladoFrame