import { Button } from '@chakra-ui/react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { questionInterface } from '../../../controllers/interfaces';

interface Props {
    question?: questionInterface;
}

function QuestionDetail({ question }: Props) {

    const questionRef = useRef<HTMLDivElement>(null);

    const [showAnswer, setShowAnswer] = useState(false);

    const correctAnswer = 'C';

    const handleClick = useCallback((event: Event) => {
        const target = event.currentTarget as HTMLElement;
        const alternatives = questionRef.current?.querySelectorAll('.alternatives div');

        if (target.classList.contains('active')) {
            target.classList.remove('active');
        } else {
            alternatives?.forEach((alternative) => {
                alternative.classList.remove('active');
            });
            target.classList.add('active');
        }

    }, []);

    useEffect(() => {
        const alternatives = questionRef.current?.querySelectorAll('.alternatives div');
        if (!showAnswer) {
            console.log('add click event listener');
            alternatives?.forEach((alternative) => {
                alternative.addEventListener('click', handleClick);
                
                if (alternative.querySelector('h3')?.textContent === correctAnswer) {
                    alternative.classList.add('correct');
                }
            });
        } else {
            // remove click event listener
            console.log('remove click event listener');
            alternatives?.forEach((alternative) => {
                alternative.removeEventListener('click', handleClick);
            });
        }

        // Cleanup function to remove event listeners when the component unmounts or when showAnswer changes
        return () => {
            console.log('cleanup event listeners');
            alternatives?.forEach((alternative) => {
                alternative.removeEventListener('click', handleClick);
            });
        };
    }, [showAnswer, handleClick]);

    return (
    <>
        <div className='box question'>
            <h1>Questão {question?.id}</h1>
            <p>CTI &gt; 2023 &gt; Ciências Humanas &gt; Fontes Energéticas </p>
            <h3>O aumento da demanda global por recursos energéticos tem gerado preocupações quanto à segurança energética 
                e um maior interesse em buscar fontes de energia  consideradas  sustentáveis e renováveis.  Diante desse cenário, 
                são exemplos de fontes sustentáveis e renováveis as que constam em: 
            </h3>
            <div className={"alternatives " + (showAnswer ? 'showCorrect' : '')} ref={questionRef}>
                <div>
                    <span>
                        <h3>A</h3>
                    </span>
                    <p>Também acho</p>
                </div>
                <div>
                    <span>
                        <h3>B</h3>
                    </span>
                    <p>Também acho</p>
                </div>
                <div>
                    <span>
                        <h3>C</h3>
                    </span>
                    <p>Também acho</p>
                </div>
                <div>
                    <span>
                        <h3>D</h3>
                    </span>
                    <p>Também acho</p>
                </div>
                <div>
                    <span>
                        <h3>E</h3>
                    </span>
                    <p>Também acho</p>
                </div>
            </div>
            <div className="options">
                <Button colorScheme="blue" size="lg"
                onClick={() => {
                    setShowAnswer(!showAnswer);
                }}>{showAnswer ? 'Ocultar' : 'Responder'}</Button>
                <Button colorScheme="blue" size="lg" variant='outline'>Ver resolução comentada</Button>
            </div>
        </div>

    </>
    );
}

export default QuestionDetail;
