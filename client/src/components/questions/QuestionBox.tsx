// Date: 03/08/2021
import { questionInterface, respostaInterface } from "../../controllers/interfaces";
import { useState } from "react";
import QstDetail from "./simulado/QstDetail";
import { areaInterface } from "../../controllers/interfaces";

interface Props {
  question: questionInterface;
  area: areaInterface; 
  answers: respostaInterface[];
}

/*const getCategoryElements = (subject: SubjectCategory): JSX.Element[] => {
  const elements: JSX.Element[] = [];
  let current: SubjectCategory | undefined = subject;

  while (current) {
    elements.push(<a key={current.name}>{current.name}</a>);
    if (current.sub) {
      elements.push(<p key={`separator-${current.name}`}>|</p>);
    }
    current = current.sub;
  }

  return elements;
};*/

const QuestionBox = ({ question, answers, area }: Props) => {

  const getDifficultyLabel = (difficulty: string): string => {
    switch(difficulty) {
      case 'facil':
        return 'Fácil';
      case 'medio':
        return 'Médio';
      case 'dificil':
        return 'Difícil';
      default:
        return 'Unknown';
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={"question-bigbox " + (isOpen ? "open" : '')}>
        <div className="question-box"
        onClick={() => {
          //abre uma nova guia com a questão
          //window.open(`/questions/${question.id}`, '_blank');

          setIsOpen(!isOpen);
        }}>
          <div className="q-id">
            <p>Q{question.id}</p>
          </div>
          <div className="category"><p>{area.name}</p></div>
          <div className="year">
            <p>Ano: {question.question_year}</p>
          </div>
          <div className={"difficulty " + question.difficulty}><p>
            {getDifficultyLabel(question.difficulty)}
            </p>
          </div>
        </div>
        {isOpen && <QstDetail question={question} type="small" answers={answers}/>  }
      </div>
    </>
  );
};

export default QuestionBox;
