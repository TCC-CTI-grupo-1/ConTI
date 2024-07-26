
import Background from '../user/Background'
import Navbar from '../Navbar'
import Filters from './Filters'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuestionDetail from './simulado/QuestionDetail';
import { useNavigate } from 'react-router-dom';
import { questionInterface } from '../../controllers/interfaces';
import { handleGetQuestion } from '../../controllers/userController';

const QuestionDatabase = () => {
    const { id } = useParams(); // Acessando o ID da pergunta da rota
    const navigate = useNavigate();
    const [hasQuestion, setHasQuestion] = useState<questionInterface | null>(null);
    const [loading, setLoading] = useState(true);

    async function chechQuestion(){
        if (id) {
            const question = await handleGetQuestion(parseInt(id));
            setHasQuestion(question);
            setLoading(false);
            //alert('Question ID: ' + id);
        } else {
            setHasQuestion(null);
            setLoading(false);
            //alert('No question ID');
        }
    }

    useEffect(() => {
        chechQuestion();
    }, [id]);

    return (<> {loading ? <h1>Carregando...</h1> :
        <div id="database" className="flex-container full-screen-size">
                <Background variant='white'/>
                <Navbar screen="database"/>
                <div className="container">
                    <div className="header">
                        
                        {hasQuestion ? <h1><a
                        onClick={() => {
                            navigate('/questions');
                        }}>Banco de questões</a> &gt; <a>{id}</a></h1> :<h1>Banco de questões</h1>}

                        {hasQuestion 
                        ? <a onClick={() => {
                            navigate('/questions');
                        }}>Voltar a tela de filtros</a>
                        : <p>Todas as questões do nosso sistema em um só lugar, aplique os filtros desejados e aproveite as questões</p>}
                    
                    </div>
                    <div className="inversed-border"></div>
                    <div className="content">
                        {hasQuestion ? <QuestionDetail question={hasQuestion} /> : <Filters />}
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default QuestionDatabase