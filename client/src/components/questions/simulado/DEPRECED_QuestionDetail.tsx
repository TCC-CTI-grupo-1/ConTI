import  LocalButton from '../../Button';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { questionInterface, respostaInterface } from '../../../controllers/interfaces';
import { showAlert } from '../../../App';

//Esse é tipo, o pior código ja escrito na historia, ele faz 4 coisas quando deveria fazer uma
//boa sorte

interface Props {
    question: questionInterface;
    answers: respostaInterface[];
    qNumber?: number; //Numero da questão no simulado
    isSimulado?: boolean;
    isAnswersSelected?: (value: string | null) => void; //Executado quando o usuario marca/desmarca uma alternativa
    isCorrecao?: string | null | undefined | true;
    /*
    --> Se for string coloca a alernativa correta na string que o cara marcou
    --> Se for null, o cara esta vendo a correção, mas não marcou nada (sem alternativa marcada)
    --> Se for undefined, o cara não esta vendo a correção (Está fazendo o simulado)
    --> Se for true, o cara está na tela de filtros/questão individual e pode ver a resposta a qualquer momento
    
    */
    type?: "small" | "big";
}

function QuestionDetail({ question, answers, isSimulado=false, isAnswersSelected, isCorrecao = undefined, qNumber, type = "big" }: Props) {

    const [selectedAnswers, setSelectedAnswers] = useState<string | null>(null);

    useEffect(() => {
        isAnswersSelected && isAnswersSelected(selectedAnswers);
    }, [selectedAnswers]);

    const questionRef = useRef<HTMLDivElement>(null);

    const [showAnswer, setShowAnswer] = useState(false);

    const correctAnswer = isCorrecao !== undefined ? 
    answers.map((answer, index) => answer.is_correct ? String.fromCharCode(65 + index) : null).filter((answer) => answer !== null)[0] : null;

    const addClassToAlternative = useCallback((letter: string) => {
        if (questionRef.current === null) return showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente.');

        const alternatives = questionRef.current.querySelectorAll('.alternatives div');

        console.log(letter);

        alternatives.forEach((alternative) => {
            alternative.classList.remove('active');
            const alternativeLetter = alternative.querySelector('p')?.textContent;
            if (alternativeLetter === letter) {
                alternative.classList.add('active');
                setSelectedAnswers(letter);
            }
        });
    }, []);

    const handleClick = useCallback((event: any) => {
        const target = event.currentTarget as HTMLElement;
        if (questionRef.current === null) return showAlert('Ocorreu um erro ao encontrar a alternativa. Tente novamente.');

        const selectedLetter = target.querySelector('p')?.textContent;
        if (typeof (selectedLetter) === 'string') {
            addClassToAlternative(selectedLetter);
        } else {
            showAlert('Ocorreu um erro ao computar a alternativa. Tente novamente.');
        }
    }, [addClassToAlternative]);

    useEffect(() => {
        if (isCorrecao !== undefined && isCorrecao !== true) {
            setSelectedAnswers(isCorrecao);
            addClassToAlternative(isCorrecao === null ? '' : isCorrecao);
            setShowAnswer(true);
        }
    }, []);

    //saporranfunciona
    /*function validateWordText(word: string): string {
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
    }*/

    //
    //OiFernando
    return (
    <>
        {question === undefined ? <h1>Erro ao carregar questão</h1> : 
        <div className={'box question ' + (type == "small" ? "small" : "")}>
            {isSimulado ? <p id='question-number-container'>{qNumber}</p> : type !== "small" &&
            <p>CTI &gt; 2023 &gt; Ciências Humanas &gt; Fontes Energéticas </p>}
            <h4>
            {question.question_text}
            </h4>
            {question.has_image && <img src={import.meta.env.VITE_ADDRESS + "/" + question.id + '.png'} alt="Imagem da questão" />}

            <div className={"alternatives " + (showAnswer ? 'showCorrect' : '')} ref={questionRef}>
                
                {answers.map((alternative, index) => (
                    <div className='item'>
                        <div key={index} className={String(index) + ' ' + (alternative.is_correct ? 'correct' : '')}
                        onClick={(e) => {
                            handleClick(e);
                        }}
                        >
                            <span>
                                <p> {alternative.question_letter} </p>
                            </span>
                            <p> {alternative.answer} </p>
                        </div>
                    </div>
                ))}

            </div>
            {!isSimulado && 
            <div className="options">
                {isCorrecao === undefined || isCorrecao == true &&
                    <LocalButton colorScheme="blue" size={type === "small" ? "sm" : undefined}
                    onClick={() => {
                        setShowAnswer(!showAnswer);
                    }}
                    
                    >{showAnswer ? 'Ocultar' : 'Responder'}</LocalButton>
                }
                    {type !== "small" && <LocalButton colorScheme="blue" variant='outline'
                    onClick={() => {showAlert("Em construção", "warning")}}>Ver resolução comentada</LocalButton>}
                
            </div>
            }
        </div>
        }
    </>
    
    );
}

export default QuestionDetail;
