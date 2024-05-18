import logo from '../../../assets/logo.png';

interface Props{
    type: 'login' | 'signup'
}


const Logo = ({type}: Props) => {
    return (
        <div id="logo" className='center'>
        <div className="logo">
            <img src={logo} alt="Logo" />
            <h2>CONTI</h2>
        </div>
        
        <div className="texto">
            { type=='signup' ? <p>Crie sua conta hoje e comece seus estudos!</p> 
            : 
            <p>Faça login com suas credenciais.</p>}
        </div>
    </div>
    );
};

export default Logo;