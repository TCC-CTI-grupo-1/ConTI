import { useRef } from 'react';
import { questionInterface, respostaInterface } from '../../../controllers/interfaces';
import LocalButton from '../../Button';
import { showAlert } from '../../../App';

interface Props {
    question: questionInterface;
    answers: respostaInterface[];
    selectedAnswer: number;
}

const QstDetailRespostas = ({question, answers, selectedAnswer}: Props) => {

    const questionRef = useRef<HTMLDivElement>(null);
    const alternativasRef = useRef(new Array());

    return (
        <>
            {question === undefined ? <h1>Erro ao carregar questão</h1> : 
            <div className={'box question'}>
                
                <p>*</p>
                <h4>
                {question.question_text}
                </h4>
                {question.has_image && <img src={import.meta.env.VITE_ADDRESS + "/" + question.id + '.png'} alt="Imagem da questão" />}
                
                <div className="additional_info">
                    {question.additional_info !== '' && <h3>Texto de apoio:</h3>}
                    <p>{question.additional_info}</p>
                </div>

                <div className={"alternatives showCorrect"} ref={questionRef}>
                    {answers.map((alternative, index) => (
                        <div className='item'>
                            <div key={index} ref={(element) => alternativasRef.current.push(element)} className={(alternative.id === selectedAnswer ? 'active' : '')
                                + ' ' + (alternative.is_correct ? 'correct' : '')
                            }>
                                <span>
                                    <p> {alternative.question_letter} </p>
                                </span>
                                <p> {alternative.answer} </p>
                            </div>
                        </div>
                    ))}
                    {selectedAnswer === -1 && <p>Questão não respondida.</p>}
    
                </div>
                <div className="options">
                        <LocalButton colorScheme="blue" variant='outline'
                        onClick={() => {showAlert("Em construção", "warning")}}>Ver resolução comentada</LocalButton>
                    
                </div>
            </div>
            }
        </>
        
        );
}

export default QstDetailRespostas