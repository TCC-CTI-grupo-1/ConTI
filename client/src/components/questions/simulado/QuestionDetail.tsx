import { Button } from '@chakra-ui/react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { questionInterface } from '../../../controllers/interfaces';
import { showAlert } from '../../../App';

interface Props {
    question: questionInterface;
    qNumber?: number; //Numero da questão no simulado
    isSimulado?: boolean;
    isAwnserSelected?: (value: string | null) => void; //Executado quando o usuario marca/desmarca uma alternativa
    isCorrecao?: string | null | undefined; //Se o usuario está vendo a correção de uma prova - passa a alternativa
}

function QuestionDetail({ question, isSimulado=false, isAwnserSelected, isCorrecao = undefined, qNumber }: Props) {

    const [selectedAwnser, setSelectedAwnser] = useState<string | null>(null);

    useEffect(() => {
        isAwnserSelected && isAwnserSelected(selectedAwnser);
    }, [selectedAwnser]);


    const questionRef = useRef<HTMLDivElement>(null);

    const [showAnswer, setShowAnswer] = useState(false);

    const correctAnswer = isCorrecao !== undefined ? question.alternativaCorreta.toUpperCase() : null;

    const addClassToAlternative = useCallback((letter: string) => {
        if (questionRef.current === null) return showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente.');

        const alternatives = questionRef.current.querySelectorAll('.alternatives div');

        alternatives.forEach((alternative) => {
            alternative.classList.remove('active');
            const alternativeLetter = alternative.querySelector('p')?.textContent;
            if (alternativeLetter === letter) {
                alternative.classList.add('active');
                setSelectedAwnser(letter);
            }
        });
    }, []);

    const handleClick = useCallback((event: Event) => {
        const target = event.currentTarget as HTMLElement;

        if (questionRef.current === null) return showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente.');

        const selectedLetter = target.querySelector('p')?.textContent;
        if (typeof (selectedLetter) === 'string') {
            addClassToAlternative(selectedLetter);
        } else {
            showAlert('Ocorreu um erro ao computar a alternativa. Tente novamente.');
        }
    }, [addClassToAlternative]);


    function checkAlternativas(){
        const alternatives = questionRef.current?.querySelectorAll('.alternatives div');
        if (!showAnswer) {
            //console.log('add click event listener');
            alternatives?.forEach((alternative) => {
                alternative.addEventListener('click', handleClick);
                
                if (alternative.querySelector('h3')?.textContent === correctAnswer) {
                    alternative.classList.add('correct');
                }
            });
        } else {
            // remove click event listener
            //console.log('remove click event listener');
            alternatives?.forEach((alternative) => {
                alternative.removeEventListener('click', handleClick);
            });
        }

        return () => {
            //console.log('cleanup event listeners');
            alternatives?.forEach((alternative) => {
                alternative.removeEventListener('click', handleClick);
            });
        };
    }

    useEffect(() => {
        
        checkAlternativas();

        // Cleanup function to remove event listeners when the component unmounts or when showAnswer changes
        
    }, [showAnswer, handleClick]);

    useEffect(() => {
        if (isCorrecao !== undefined) {
            setSelectedAwnser(isCorrecao);
            addClassToAlternative(isCorrecao === null ? '' : isCorrecao);
            setShowAnswer(true);
        }
    }, []);

    //saporranfunciona
    function validateWordText(word: string): string {
        //aqui está como "line" mas na verdade é cada palavra.
        const n_caracteres = 100;
        let returnedWord = '';
        if (word.length > n_caracteres) {
            returnedWord = word.substring(0, n_caracteres) + '- ' + word.substring(n_caracteres);
        }
        else{
            returnedWord = word;
        }
        return returnedWord;
    }

    //
    //OiFernando
    return (
    <>
        {question === undefined ? <h1>Erro ao carregar questão</h1> : 
        <div className='box question'>
            {isSimulado ? <p id='question-number-container'>{qNumber}</p> : 
            <p>CTI &gt; 2023 &gt; Ciências Humanas &gt; Fontes Energéticas </p>}
            <h4>
            {question.enunciado}
            </h4>
            <div className={"alternatives " + (showAnswer ? 'showCorrect' : '')} ref={questionRef}>
                
                {question.alternativas.map((alternative, index) => (
                    <div key={index}>
                        <span>
                            <p> {String.fromCharCode(65 + index)} </p>
                        </span>
                        <p> {alternative} </p>
                    </div>
                ))}

            </div>
            {!isSimulado && 
            <div className="options">
                {isCorrecao === undefined &&
                    <Button colorScheme="blue" size="lg"
                    onClick={() => {
                        setShowAnswer(!showAnswer);
                    }}>{showAnswer ? 'Ocultar' : 'Responder'}</Button>
                }
                    <Button colorScheme="blue" size="lg" variant='outline'>Ver resolução comentada</Button>
                
            </div>
            }
        </div>
        }
    </>
    
    );
}

export default QuestionDetail;
