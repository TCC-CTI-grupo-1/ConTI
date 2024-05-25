interface SubjectCategory {
    name: string;
    sub?: SubjectCategory; // Tornando `sub` opcional
  }
  
  interface Props {
    id: number;
    subject: SubjectCategory;
    difficulty: 'easy' | 'medium' | 'hard' | 'take-the-l';
    year: number;
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
  
  const Question = ({ id, subject, difficulty, year }: Props) => {
    return (
      <div className="question-box">
        <div className="q-id">
          <p>Q{id}</p>
        </div>
        <div className="category">
          {getCategoryElements(subject)}
        </div>
        <div className="year">
          <p>Ano: {year}</p>
        </div>
        <div className={"difficulty " + difficulty}>
          {
            difficulty === 'easy' ? 'Fácil' :
            difficulty === 'medium' ? 'Médio' :
            difficulty === 'hard' ? 'Difícil' :
            'Faz o L'
          }
        </div>
      </div>
    );
  };
  
  export default Question;
  