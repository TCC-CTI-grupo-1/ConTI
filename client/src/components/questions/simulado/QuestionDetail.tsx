import { Button } from '@chakra-ui/react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { questionInterface } from '../../../controllers/interfaces';
import { showAlert } from '../../../App';

interface Props {
    question: questionInterface;
    isSimulado?: boolean;
    isAwnserSelected?: (value: string | null) => void; // Define the prop for the function
}

function QuestionDetail({ question, isSimulado=false, isAwnserSelected }: Props) {

    const [selectedAwnser, setSelectedAwnser] = useState<string | null>(null);

    useEffect(() => {
        isAwnserSelected && isAwnserSelected(selectedAwnser); // Call the function and pass the value from the state
    }, [selectedAwnser]);


    const questionRef = useRef<HTMLDivElement>(null);

    const [showAnswer, setShowAnswer] = useState(false);

    const correctAnswer = 'C';

    const handleClick = useCallback((event: Event) => {
        const target = event.currentTarget as HTMLElement;
        const alternatives = questionRef.current?.querySelectorAll('.alternatives div');

        if (target.classList.contains('active')) {
            target.classList.remove('active');
            setSelectedAwnser(null);
        } else {
            let selected = target.querySelector('h3')?.textContent;
            if(typeof(selected) == 'string'){
                alternatives?.forEach((alternative) => {
                    alternative.classList.remove('active');
                });
                target.classList.add('active');
                setSelectedAwnser(selected);
            }
            else{
                showAlert('Ocorreu um erro ao computar a alternativa. Tente novamente.');
            }
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

    function validateWordText(word: string): string {
        //aqui está como "line" mas na verdade é cada palavra.
        let n_caracteres = 120;
        let returnedWord = '';
        if (word.length > n_caracteres) {
            returnedWord = word.substring(0, n_caracteres) + '- ' + word.substring(n_caracteres);
        }
        else{
            returnedWord = word;
        }
        return returnedWord;
    }

    function validateTextText(text: string): string {
        let text22 = ''
        text.split(' ').map((line: string, index) => (
            text22 += validateWordText(line) + ' '
        ));
        return text22;
    }

    return (
    <>
        <div className='box question'>
            <h1>Questão {question?.id}</h1>
            <p>CTI &gt; 2023 &gt; Ciências Humanas &gt; Fontes Energéticas </p>
            <h3>
            {validateTextText(question?.enunciado)}
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
            {!isSimulado && 
            <div className="options">
                <Button colorScheme="blue" size="lg"
                onClick={() => {
                    setShowAnswer(!showAnswer);
                }}>{showAnswer ? 'Ocultar' : 'Responder'}</Button>
                <Button colorScheme="blue" size="lg" variant='outline'>Ver resolução comentada</Button>
            </div>
            }
        </div>

    </>
    );
}

export default QuestionDetail;
