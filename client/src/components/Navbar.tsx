
import HomeIcon from "../assets/HomeIcon";
import UserIcon from "../assets/UserIcon";
import DatabaseIcon from "../assets/DatabaseIcon";
import MenuIcon from "../assets/MenuIcon";
import HistoryIcon from "../assets/HistoryIcon";
import NewTestIcon from "../assets/NewTestIcon.tsx";
import AdminIcon from "../assets/AdminIcon.tsx";

import { useNavigate } from "react-router-dom";
import { useState } from "react";


interface Props{
    screen: 'home' | 'profile' | 'database' | 'history' | 'newtest' | 'adm' | 'aboutUs';
}

const Navbar = ({screen}:Props) => {
    const navegate = useNavigate();

    const [active, setActive] = useState(false);

    //const [isUserLogged, setIsUserLogged] = useState(false);

    const isLoggedIn = localStorage.getItem('isLoggedIn') === "true" ? true : false;

    function checkActiveScreen(localScreen: string): 'white' | 'black' {
        if(screen == localScreen)
        {
            return('white');
        }
        else{
            return('black');
        }
    }

    /*useEffect(() => {
        if(sessionStorage.getItem('isLoggedIn'))
        {
            setIsUserLogged(true);
        }
    }, []);*/

    return (
        <div id="nav">
            <div id='margin'>

            </div>
            <nav className={active ? 'active' : ''}>
                <div>

                    <div className="icon">
                        <MenuIcon
                        onClick={() => {
                            setActive(!active);
                            }} />
                    </div>
                    
                                        
                    {!isLoggedIn &&<div className="icon">
                        <UserIcon iconColor={checkActiveScreen('profile')}
                        onIconClick={() => {navegate('/login')}}/>
                        <p className={checkActiveScreen('profile')}>Login</p>
                    </div>}

                    <div className="icon">
                        <HomeIcon iconColor={checkActiveScreen('home')}
                        onIconClick={() => {navegate('/')}}/>
                        <p  className={checkActiveScreen('home')}>Home</p>
                    </div>
                                            
                    {isLoggedIn &&<div className="icon">
                        <NewTestIcon iconColor={checkActiveScreen('newtest')}
                        onIconClick={() => {navegate('/newtest')}}/>
                        <p className={checkActiveScreen('newtest')}>Novo teste</p>
                    </div>}

                    <div className="icon">
                        <DatabaseIcon iconColor={checkActiveScreen('database')}
                        onIconClick={() => {navegate('/questions')}}/>
                        <p className={checkActiveScreen('database')}>Banco de questões</p>
                    </div>
                    
                    
                    
                    {isLoggedIn &&<div className="icon">
                            <HistoryIcon iconColor={checkActiveScreen('history')}
                            onIconClick={() => {navegate('/history')}}/>
                            <p className={checkActiveScreen('history')}>Histórico</p>
                    </div>}

                </div>
                
                <div className="options">
                    <h3 onClick={
                        () => {
                            navegate('/aboutus');
                        }
                    }>Sobre nós</h3>
                    <h3>Contato</h3>


                    {isLoggedIn &&<div className="icon">
                        <UserIcon iconColor={checkActiveScreen('profile')}
                        onIconClick={() => {navegate('/profile')}}/>
                        <p className={checkActiveScreen('profile')}>Perfil</p>
                    </div>}

                    <div className="icon">
                            <AdminIcon iconColor={checkActiveScreen('adm')}
                            onIconClick={() => {navegate('/adm')}}/>
                            <p className={checkActiveScreen('adm')}>Adinistrador</p>
                    </div>
                </div>
                

                

            </nav>

        </div>
        
    );
}

export default Navbar;