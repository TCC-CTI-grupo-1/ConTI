
import HomeIcon from "../assets/HomeIcon";
import UserIcon from "../assets/UserIcon";
import DatabaseIcon from "../assets/DatabaseIcon";
import MenuIcon from "../assets/MenuIcon";
import HistoryIcon from "../assets/HistoryIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props{
    screen: 'home' | 'profile' | 'database' | 'history';
}

const Navbar = ({screen}:Props) => {
    const navegate = useNavigate();

    const [active, setActive] = useState(false);

    function checkActiveScreen(localScreen: string): 'white' | 'black' {
        if(screen == localScreen)
        {
            return('white');
        }
        else{
            return('black');
        }
    }

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
                    <p className={checkActiveScreen('home')}>Home</p>
                </div>
                
                <div className="icon">
                    <DatabaseIcon iconColor={checkActiveScreen('database')}
                    onIconClick={() => {navegate('/questions')}}/>
                    <p className={checkActiveScreen('database')}>Banco de questões</p>
                </div>
                
                <div className="icon">
                    <UserIcon iconColor={checkActiveScreen('profile')}
                    onIconClick={() => {navegate('/profile')}}/>
                    <p className={checkActiveScreen('profile')}>Perfil</p>
                </div>
                
                <div className="icon">
                        <HistoryIcon iconColor={checkActiveScreen('history')}
                        onIconClick={() => {navegate('/history')}}/>
                        <p className={checkActiveScreen('history')}>Histórico</p>
                </div>
                

            </nav>

        </div>
        
    );
}

export default Navbar;