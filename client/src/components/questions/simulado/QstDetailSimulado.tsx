import { useState, useRef, useEffect, useCallback } from 'react';
import { questionInterface, respostaInterface } from '../../../controllers/interfaces';
import { showAlert } from '../../../App';

interface Props {
    question: questionInterface;
    answers: respostaInterface[];
    isAnswersSelected: (value: string | null) => void
    qNumber: number; //Numero da questão no simulado
}

const QstDetailSimulado = ({question, answers, isAnswersSelected, qNumber}: Props) => {

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    useEffect(() => {
        isAnswersSelected && isAnswersSelected(selectedAnswer);
    }, [selectedAnswer]);

    const questionRef = useRef<HTMLDivElement>(null);
    const alternativasRef = useRef(new Array());

    const addClassToAlternative = useCallback((letter: string) => {
        if (questionRef.current === null) return showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente.');

        const alternatives = questionRef.current.querySelectorAll('.alternatives div');


        console.log(letter);

        alternatives.forEach((alternative) => {
            alternative.classList.remove('active');
            const alternativeLetter = alternative.querySelector('p')?.textContent;
            if (alternativeLetter === letter) {
                alternative.classList.add('active');  
                setSelectedAnswer(letter);
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
        if(alternativasRef.current.length === 0) return showAlert('Ocorreu um erro ao encontrar as alternativas. Tente novamente. [0]');    
        alternativasRef.current.forEach((alternativa) => {
            //console.log("alternativa");
            //console.log(alternativa);
            if(alternativa === null || alternativa === undefined) return;   
            
            //console.log(alternativa.current);
            alternativa.addEventListener('click', handleClick);         
        });
    }

    useEffect(() => {
        
        checkAlternativas();

        // Cleanup function to remove event listeners when the component unmounts or when showAnswer changes
        
    }, [handleClick]);

    return (
        <>
            {question === undefined ? <h1>Erro ao carregar questão</h1> : 
            <div className={'box question'}>
                <p id='question-number-container'>{qNumber}</p>
                <h4>
                {question.question_text}
                </h4>
                <div className={"alternatives"} ref={questionRef}>
                    
                    {answers.map((alternative, index) => (
                        <div key={index} ref={(element) => alternativasRef.current.push(element)} className={String(index)}>
                            <span>
                                <p> {alternative.question_letter} </p>
                            </span>
                            <p> {alternative.answer} </p>
                        </div>
                    ))}
    
                </div>
                <div className="options">               
                </div>
            </div>
            }
        </>
        
        );
}

export default QstDetailSimulado