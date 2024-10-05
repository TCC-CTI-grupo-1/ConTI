import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navegate = useNavigate();
    return (
        <div id="home" className="flex-container full-screen-size">
                <Navbar screen="notFound"/>
                <div className="container">
                    <div className="header">
                        <h1>Pagina não encontrada</h1>
                    </div>
                    <div className="inversed-border"></div>
                    <div className="content NotFound">
                        <h3>404 - Pagina não encontrada</h3>
                        <p>Parece que essa pagina não existe, <a
                        onClick={() => {navegate('/')}}
                        >clique aqui</a> para ir ao HOME.</p>
                                        
                    </div>
                </div>
            </div>
    )
}

export default NotFound