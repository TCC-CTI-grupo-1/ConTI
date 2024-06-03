// QuestionDetail.js
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

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
                    <div className='questão'>
                        <p>CTI &gt; 2023 &gt; Ciências Humanas &gt; Fontes Energéticas </p>
                        <h3>O aumento da demanda global por recursos energéticos tem gerado preocupações quanto à segurança energética 
                            e um maior interesse em buscar fontes de energia  consideradas  sustentáveis e renováveis.  Diante desse cenário, 
                            são exemplos de fontes sustentáveis e renováveis as que constam em: </h3>
                        
                        {/* Aqui você pode carregar os detalhes da pergunta com base no ID */}
                        </div>
                    </div>
            </div>
        </div>

  );
}

export default QuestionDetail;
