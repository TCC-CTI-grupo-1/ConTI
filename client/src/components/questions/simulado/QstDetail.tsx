import { useState, useRef, useEffect, useCallback } from 'react';
import { questionInterface, respostaInterface } from '../../../controllers/interfaces';
import LocalButton from '../../Button';
import { showAlert } from '../../../App';
import LatexRenderer from '../../LatexRenderer';

interface Props {
    question: questionInterface;
    answers: respostaInterface[];
    type?: "small" | "big";
}

const QstDetail = ({question, answers, type="small"}: Props) => {

    const [showAnswer, setShowAnswer] = useState(false);
    const questionRef = useRef<HTMLDivElement>(null);
    const alternativasRef = useRef(new Array());
    const correctAnswer = answers.map((answer, index) => answer.is_correct ? String.fromCharCode(65 + index) : null).filter((answer) => answer !== null)[0];

    function cleanupEvenListeners(){
        alternativasRef.current.forEach((alternativa) => {
            if(alternativa === null) return;
            alternativa.removeEventListener('click', handleClick);
        });
    }

    const addClassToAlternative = useCallback((letter: string) => {
        if (questionRef.current === null) return showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente.');

        const alternatives = questionRef.current.querySelectorAll('.alternatives div');


        console.log(letter);

        alternatives.forEach((alternative) => {
            alternative.classList.remove('active');
            const alternativeLetter = alternative.querySelector('p')?.textContent;
            if (alternativeLetter === letter) {
                alternative.classList.add('active');            }
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
        if (!showAnswer) {
            //Eu literalmente não faço ideia do que isso faz
            console.log('add click event listener');
            console.log(alternativasRef.current);
            alternativasRef.current.forEach((alternativa) => {
                console.log("alternativa");
                console.log(alternativa);
                if(alternativa === null || alternativa === undefined) return;   
                
                //console.log(alternativa.current);
                alternativa.addEventListener('click', handleClick);
                
                const letra = alternativa.querySelector('p')
                if(letra){
                    if (letra.textContent == correctAnswer) {
                        alternativa.classList.add('correct');
                    }
                    else{
                        if (letra.textContent == null) return showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente. [2]');
                        letra.textContent = letra.textContent?.replace(/\s/g, '');
                        correctAnswer?.replace(/\s/g, '');
                        console.log('letra: ' + letra.textContent + " correctAnswer: " + correctAnswer + " letra=correctAnswer: " + (letra.textContent == correctAnswer));
                    }
                }
                else{
                    showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente. [2]');
                }
                
            });
        } else {
            // remove click event listener

            cleanupEvenListeners();
        }

        return () => {
            console.log('cleanup event listeners');
            cleanupEvenListeners();
        };
    }

    useEffect(() => {
        
        checkAlternativas();

        // Cleanup function to remove event listeners when the component unmounts or when showAnswer changes
        
    }, [showAnswer, handleClick]);

    return (
        <>
            {question === undefined ? <h1>Erro ao carregar questão</h1> : 
            <div className={'box question ' + (type == "small" ? "small" : "")}>
                <p>Questão #{question.id}</p>

                <h4>
                <LatexRenderer text={question.question_text}></LatexRenderer>
                </h4>

                {question.has_image && <img src={import.meta.env.VITE_ADDRESS + "/" + question.id + '.png'} alt="Imagem da questão" />}
                
                <div className="additional_info">
                    {question.additional_info !== '' && <h3>Texto de apoio:</h3>}
                    <p>{question.additional_info}</p>
                </div>
                
                <div className={"alternatives " + (showAnswer ? 'showCorrect' : '')} ref={questionRef}>
                    
                    {answers.map((alternative, index) => (
                        <div className="item">
                            <div key={index} ref={(element) => alternativasRef.current.push(element)} className={String(index)
                                + ' ' + (alternative.is_correct ? 'correct' : '')
                            }>
                                <span>
                                    <p> {alternative.question_letter} </p>
                                </span>
                                <p> <LatexRenderer text={alternative.answer}></LatexRenderer> </p>           
                            </div>
                        </div>
                    ))}
    
                </div>
                <div className="options">
                        <LocalButton colorScheme="blue" size={type === "small" ? "sm" : undefined}
                        onClick={() => {
                            setShowAnswer(!showAnswer);
                        }}
                        
                        >{showAnswer ? 'Ocultar' : 'Responder'}</LocalButton>
                        {type !== "small" && <LocalButton colorScheme="blue" variant='outline'
                        onClick={() => {showAlert("Em construção", "warning")}}>Ver resolução comentada</LocalButton>}
                    
                </div>
            </div>
            }
        </>
        
        );
}

export default QstDetail