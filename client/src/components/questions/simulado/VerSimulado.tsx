import Simulado from "./Respostas"
import { useState, useEffect } from "react"
import { questionInterface, simuladoSimpleInterface } from "../../../controllers/interfaces"
import { handleGetQuestion, handlePostSimulado } from "../../../controllers/userController"
import date from 'date-and-time'
import { useNavigate } from "react-router-dom"
import { handleGetSimulado } from "../../../controllers/userController"
import { useParams } from "react-router-dom"
import { simuladoInterface } from "../../../controllers/interfaces"


  type questionResultsInterface = [questionInterface, (string | null)][];

const SimuladoFrame = () => {
    const { id } = useParams();

    const [questionsHashMap, setQuestionsHashMap] = useState<questionResultsInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [pontuacao, setPontuacao] = useState<boolean[]>([]);

    const navegate = useNavigate();

    useEffect(() => {
        const getSimulado = async () => {
            
            let newQuestionsHashMap: questionResultsInterface = [];

            const simulado = await handleGetSimulado(Number(id));

            console.log(typeof(simulado));

            if(simulado === null){
                console.log("SUICIDIO")
                return;
            }

            let newPontuacao: boolean[] = [];
            await Promise.all(simulado.questions.map(async (question, index) => {
                const questionData = await handleGetQuestion(question[0]);
                newQuestionsHashMap.push([questionData, question[1]]);

                if(questionData.alternativaCorreta.toUpperCase() === question[1]?.toUpperCase()){
                    newPontuacao.push(true);
                }
                else{
                    newPontuacao.push(false);
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