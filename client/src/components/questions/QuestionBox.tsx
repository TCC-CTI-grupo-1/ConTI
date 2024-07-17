// Date: 03/08/2021
import { questionInterface } from "../../controllers/interfaces";
import { SubjectCategory } from "../../controllers/interfaces";

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
  return (
    <div className="question-box"
    onClick={() => {
      //abre uma nova guia com a questão
      window.open(`/questions/${question.id}`, '_blank');
    }}>
      <div className="q-id">
        <p>Q{question.id}</p>
      </div>
      <div className="category">{getCategoryElements(question.subject)}</div>
      <div className="year">
        <p>Ano: {question.year}</p>
      </div>
      <div className={"difficulty " + question.difficulty}>
        {question.difficulty === "easy"
          ? "Fácil"
          : question.difficulty === "medium"
          ? "Médio"
          : question.difficulty === "hard"
          ? "Difícil"
          : "Faz o L"}
      </div>
    </div>
  );
};

export default QuestionBox;
