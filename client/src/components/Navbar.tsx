import { transform } from "framer-motion";
import HomeIcon from "../assets/HomeIcon";

const Navbar = () => {
    return (
        <div id="nav">
            <div id='margin'>

            </div>
            <nav>
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