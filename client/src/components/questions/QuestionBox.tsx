// Date: 03/08/2021
import { questionInterface } from "../../controllers/interfaces";
import { SubjectCategory } from "../../controllers/interfaces";
import { useState } from "react";
import QuestionDetail from "./simulado/QuestionDetail";
interface Props {
  question: questionInterface;
}

const getCategoryElements = (subject: SubjectCategory): JSX.Element[] => {
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
};

const QuestionBox = ({  question }: Props) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
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
        <div className="category">{getCategoryElements(question.subject)}</div>
        <div className="year">
          <p>Ano: {question.year}</p>
        </div>
        <div className={"difficulty " + question.difficulty}><p>
          {question.difficulty === "easy"
            ? "Fácil"
            : question.difficulty === "medium"
            ? "Médio"
            : question.difficulty === "hard"
            ? "Difícil"
            : "Faz o L"}
          </p>
        </div>
      </div>
      {isOpen && <QuestionDetail question={question} type="small" isCorrecao/>  }
    </div>
  );
};

export default QuestionBox;
