import { transform } from "framer-motion";
import HomeIcon from "../assets/HomeIcon";
import UserIcon from "../assets/UserIcon";
import DatabaseIcon from "../assets/DatabaseIcon";
import MenuIcon from "../assets/Menu";
import { useNavigate } from "react-router-dom";

interface Props{
    screen: 'home' | 'profile' | 'database'
}

const Navbar = ({screen}:Props) => {
    const navegate = useNavigate();
    return (
        <div id="nav">
            <div id='margin'>

            </div>
            <nav>
                <MenuIcon />
                <HomeIcon iconColor={screen == 'home' ? 'white' : 'black'}
                onIconClick={() => {navegate('/')}}/>
                <DatabaseIcon iconColor={screen == 'database' ? 'white' : 'black'}
                onIconClick={() => {navegate('/questions')}}/>
                <UserIcon iconColor={screen == 'profile' ? 'white' : 'black'}
                onIconClick={() => {navegate('/profile')}}/>
            </nav>

        </div>
        
    );
}

export default Navbar;