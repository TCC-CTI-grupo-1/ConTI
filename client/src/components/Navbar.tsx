
import HomeIcon from "../assets/HomeIcon";
import UserIcon from "../assets/UserIcon";
import DatabaseIcon from "../assets/DatabaseIcon";
import MenuIcon from "../assets/MenuIcon";
import HistoryIcon from "../assets/HistoryIcon";
import NewTestIcon from "../assets/NewTestIcon.tsx";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


interface Props{
    screen: 'home' | 'profile' | 'database' | 'history' | 'newtest' | 'adm' | 'aboutUs';
}

const Navbar = ({screen}:Props) => {
    const navegate = useNavigate();

    const [active, setActive] = useState(false);

    const [isUserLogged, setIsUserLogged] = useState(false);

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

    useEffect(() => {
        if(sessionStorage.getItem('isLoggedIn'))
        {
            setIsUserLogged(true);
        }
    }, []);

    return (
        <div id="nav">
            <div id='margin'>

            </div>
            <nav className={active ? 'active' : ''}>
                <div className="icon">
                    <MenuIcon
                    onClick={() => {
                        setActive(!active);
                        }} />
                </div>
                
                <div className="icon">
                    <HomeIcon iconColor={checkActiveScreen('home')}
                    onIconClick={() => {navegate('/')}}/>
                    <p  className={checkActiveScreen('home')}>Home</p>
                </div>

                <div className="icon">
                    <HomeIcon iconColor={checkActiveScreen('aboutUs')}
                    onIconClick={() => {navegate('/aboutUs')}}/>
                    <p  className={checkActiveScreen('aboutUs')}>Sobre Nós</p>
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
                    <UserIcon iconColor={checkActiveScreen('profile')}
                    onIconClick={() => {navegate('/profile')}}/>
                    <p className={checkActiveScreen('profile')}>Perfil</p>
                </div>}
                
                {isLoggedIn &&<div className="icon">
                        <HistoryIcon iconColor={checkActiveScreen('history')}
                        onIconClick={() => {navegate('/history')}}/>
                        <p className={checkActiveScreen('history')}>Histórico</p>
                </div>}

                {!isLoggedIn &&<div className="icon">
                        <UserIcon iconColor={checkActiveScreen('profile')}
                        onIconClick={() => {navegate('/login')}}/>
                        <p className={checkActiveScreen('profile')}>Login</p>
                </div>}

                <div className="icon">
                        <UserIcon iconColor={checkActiveScreen('adm')}
                        onIconClick={() => {navegate('/adm')}}/>
                        <p className={checkActiveScreen('adm')}>Histórico</p>
                </div>


            </nav>

        </div>
        
    );
}

export default Navbar;