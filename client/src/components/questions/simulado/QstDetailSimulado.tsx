import { useState, useRef, useEffect, useCallback } from 'react';
import { questionInterface, respostaInterface } from '../../../controllers/interfaces';
import { showAlert } from '../../../App';

import scissors from '../../../assets/scissors.png';
import LatexRenderer from '../../LatexRenderer';
interface Props {
    question: questionInterface;
    answers: respostaInterface[];
    isAnswersSelected: (value: number | null) => void
    qNumber: number; //Numero da questão no simulado
}

const QstDetailSimulado = ({question, answers, isAnswersSelected, qNumber}: Props) => {

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

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
                if(isNaN(Number(alternative.id)))
                {
                    setSelectedAnswer(null);
                }else{
                    setSelectedAnswer(Number(alternative.id));
                }
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

    const handleScissorsClick = useCallback((event: any) => {
        const target = event.currentTarget as HTMLElement;
        const parent = target.parentElement as HTMLElement;
        const div = parent.querySelector('div') as HTMLElement;
        div.classList.toggle('cut');
    }, [addClassToAlternative]);

    return (
        <>
            {question === undefined ? <h1>Erro ao carregar questão</h1> : 
    <div className={'box question'}>
        <p id='question-number-container'>{qNumber}</p>
        <h4>
            <LatexRenderer text={question.question_text}></LatexRenderer>
        </h4>
        {question.has_image && <img src={import.meta.env.VITE_ADDRESS + "/" + question.id + '.png'} alt="Imagem da questão" />}
        <div className="additional_info">
            {question.additional_info !== '' && <h3>Texto de apoio:</h3>}
            <p>{question.additional_info}</p>
        </div>
        
        <div className={"alternatives"} ref={questionRef}>
            {alternativasRef.current = []} 
            {answers.map((alternative, index) => (
                <div className='item'>
                    <div key={index} onClick={(e)=> {
                        handleClick(e);
                    }} className={String(index)} id={String(alternative.id)}>
                        <span> 
                            <p> {alternative.question_letter} </p>
                        </span>
                        <p> {alternative.answer} </p>
                        
                    </div>
                    <img src={scissors} onClick={(e) => {
                        handleScissorsClick(e);
                    }}> 
                    </img>
                </div>
            ))}
        </div>
        <a>Marcar questão</a>

        <div className="options">               
        </div>
    </div>
}
        </>
        
        );
}

export default QstDetailSimulado