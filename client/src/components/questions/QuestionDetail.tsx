// QuestionDetail.js
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import { Button } from '@chakra-ui/react';

function QuestionDetail() {
  const { id } = useParams(); // Acessando o ID da pergunta da rota
  // Aqui você pode usar o ID para carregar os detalhes da pergunta
  return (
    <div id="database" className="flex-container full-screen-size">
            <Navbar screen="database"/>
            <div className="container">
                <div className="header">
                    <h1><a>Banco de questões</a> &gt; <a>{id}</a></h1>
                </div>
                <div className="inversed-border"></div>
                <div className="content">

                    <div className='box question'>
                        <p>CTI &gt; 2023 &gt; Ciências Humanas &gt; Fontes Energéticas </p>
                        <h3>O aumento da demanda global por recursos energéticos tem gerado preocupações quanto à segurança energética 
                            e um maior interesse em buscar fontes de energia  consideradas  sustentáveis e renováveis.  Diante desse cenário, 
                            são exemplos de fontes sustentáveis e renováveis as que constam em: 
                        </h3>
                        <div className="alternatives">
                            <div className='active'>
                                <span>
                                    <h3>A</h3>
                                </span>
                                <p>Também acho</p>
                            </div>
                            <div>
                                <span>
                                    <h3>A</h3>
                                </span>
                                <p>Também acho</p>
                            </div>
                            <div>
                                <span>
                                    <h3>A</h3>
                                </span>
                                <p>Também acho</p>
                            </div>
                            <div>
                                <span>
                                    <h3>A</h3>
                                </span>
                                <p>Também acho</p>
                            </div>
                            <div>
                                <span>
                                    <h3>A</h3>
                                </span>
                                <p>Também acho</p>
                            </div>
                        </div>
                        <div className="options">
                            <Button colorScheme="blue" size="lg">Responder</Button>
                            <Button colorScheme="blue" size="lg" variant='outline'>Ver resolução comentada</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
}

export default QuestionDetail;
