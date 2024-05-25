
import Background from '../user/Background'
import Navbar from '../Navbar'
import Filters from './Filters'

const QuestionDatabase = () => {
  return (
    <div id="database" className="flex-container full-screen-size">
            <Background variant='white'/>
            <Navbar screen="database"/>
            <div className="container">
                <div className="header">
                    <h1>Banco de questões</h1>
                    <p>Todas as questões do nosso sistema em um só lugar, aplique os filtros desejados e aproveite as questões</p>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    <Filters />
                </div>
            </div>
        </div>
  )
}

export default QuestionDatabase