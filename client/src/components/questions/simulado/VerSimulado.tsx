import Simulado from "./Respostas"
import { useState, useEffect } from "react"
import { questionInterface, respostaInterface } from "../../../controllers/interfaces"
import { handleGetQuestion, handleGetAnswersByQuestionId } from "../../../controllers/userController"
//import { useNavigate } from "react-router-dom"
import { handleGetQuestion_MockTestsByMockTestId } from "../../../controllers/userController"
import { useParams } from "react-router-dom"


  type questionResultsInterface = [questionInterface, (respostaInterface | null), answers:respostaInterface[]][];

const SimuladoFrame = () => {
    const { id } = useParams();

    const [questionsHashMap, setQuestionsHashMap] = useState<questionResultsInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [pontuacao, setPontuacao] = useState<boolean[]>([]);

    //const navegate = useNavigate();

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
            await Promise.all(simulado.map(async (question) => {
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
                
            }));

            setQuestionsHashMap(newQuestionsHashMap);
            setLoading(false);
            setPontuacao(newPontuacao);
        }

        console.log(id);

        getSimulado();
    }, []);
  
    return (
        loading ? <h2>Aguarde enquanto finalizamos o seu simulado... </h2> :
        <>
            {questionsHashMap === null ? <h1>Erro ao carregar simulado</h1> :
                <Simulado questionsHashMap={questionsHashMap} pontuacao={pontuacao}    
                /> 
            }
        </>
        
  )
}

export default SimuladoFrame