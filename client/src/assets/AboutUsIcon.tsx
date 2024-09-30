import { useState } from "react";

interface Props {
    iconColor?: 'white' | 'black',
    onIconClick: () => void
}

const AboutUsIcon = ({ iconColor = 'black', onIconClick }: Props) => {
    const [color, _] = useState(iconColor);

    return (
        <div onClick={onIconClick}>
            {color === 'white' ? (
                <img
                    src="https://www.clipartmax.com/png/small/172-1727992_about-us-us-icon-png-white.png"
                    alt="About Us Icon White"
                    style={{ filter: 'invert(100%)' }} // Inverte a cor para branco
                />
            ) : (
                <img
                    src="https://www.clipartmax.com/png/small/172-1727992_about-us-us-icon-png-white.png"
                    alt="About Us Icon Black"
                    style={{ filter: 'invert(0%)' }} // Deixa a cor original
                />
            )}
        </div>
    );
}

export default AboutUsIcon;
