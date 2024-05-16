import { transform } from "framer-motion";
import HomeIcon from "../assets/HomeIcon";
import MenuIcon from "../assets/Menu";

const Navbar = () => {
    return (
        <div id="nav">
            <div id='margin'>

            </div>
            <nav>
                <MenuIcon />
                <HomeIcon iconColor='white' />
                <HomeIcon iconColor='black' />
                <HomeIcon iconColor='black' />
                <HomeIcon iconColor='white' />
                <HomeIcon iconColor='black' />
            </nav>

        </div>
        
    );
}

export default Navbar;