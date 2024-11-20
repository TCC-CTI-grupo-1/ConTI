import { simuladoInterface } from '../../controllers/interfaces'

interface Props{
    simulados: simuladoInterface[];
    openOverlay: (number: number) => void;
}

const SimuladosList = ({simulados, openOverlay}: Props) => {
  return (
    <>
    {
        simulados.length === 0 ? <p>Nenhum simulado feito nesse dia</p> :
        simulados.map((simulado, index) => {
            return (
                <div key={index} className="provaCard"
                onClick={(e) => {
                    let number = (index + 1) * 10 + 1;
                    
                    //onclick here adds class 'active' on div.materias
                    e.currentTarget.classList.toggle('active');
                    
                    openOverlay(number);
                }}>
                    <h3>[ {simulado.title} ] - {simulado.total_correct_answers}/{simulado.total_answers}</h3>
                    <div className="progress">
                        <div style={{width: `${(simulado.total_correct_answers/simulado.total_answers)*100}%`}}></div>
                    </div>
                    <p>Tempo consumido: {simulado.time_spent}min</p>
                    <div className="materias">
                        {
                            (simulado.subjects) &&
                            Object.keys(simulado.subjects).map((subject, index) => {
                                return (
                                    <div key={index}>
                                        <p>{subject}</p>
                                        <h4>{simulado.subjects![subject].total_correct_answers}/{simulado.subjects![subject].total_answers}</h4>
                                        <div className="progress">
                                            <div style={{width: `${(simulado.subjects![subject].total_correct_answers/simulado.subjects![subject].total_answers)*100}%`}}></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    }
    </>
  )
}

export default SimuladosList