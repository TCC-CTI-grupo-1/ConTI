
import Background from '../user/Background'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'


const AllTests = () => {

    const navegate = useNavigate();

    function goBack(){
        navegate('/questions')
    };

    return (
    <div id="database" className="flex-container full-screen-size">
            <Background variant='white'/>
            <Navbar screen="database"/>
            <div className="container">
                <div className="header">
                    <h1><a
                    onClick={goBack}>Banco de questões</a> | Todas as provas</h1>
                    <p>Veja todas as provas cadastradas em nosso sistema, ou <a
                    onClick={goBack}>clique aqui</a> para voltar aos filtros.</p>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    <div className="box">
                        <p>KKK não tem nenhuma hfywgrefuoyhweoghqvtoiweryd</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllTests;