// QuestionDetail.js

import { Button } from '@chakra-ui/react';

interface Props{
    questionID: string;
}

function QuestionDetail({questionID}: Props) {

  return (
    <>
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
        <div className="more-options">
            <p>Explorar questões similares</p>
            <div>
                <Button colorScheme="blue" size="lg" variant='outline'>Anterior</Button>
                <Button colorScheme="blue" size="lg" variant='outline'>Próxima</Button>
            </div>
        </div>
    </>
  );
}

export default QuestionDetail;
