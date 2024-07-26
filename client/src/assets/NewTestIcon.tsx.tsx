


import { useState } from "react";

interface Props{
    iconColor?: 'white' | 'black',
    onIconClick: () => void
}

const NewTestIcon = ({iconColor='black', onIconClick}:Props) => {

    const [color, setColor] = useState(iconColor);

    function handleChangeColor(){
        if(color == 'white'){
            setColor('black');
        }else{
            setColor('white');
        }
    }

    return(


        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={onIconClick}>
        {color == 'white' && <rect width="40" height="40" rx="5" fill="#0066FF"/>}
        <path fillRule="evenodd" clipRule="evenodd" d="M11 11.3333C11 10.0447 12.0074 9 13.25 9H23.5681C24.1648 9 24.737 9.24583 25.159 9.68342L28.341 12.9832C28.763 13.4208 29 14.0143 29 14.6332V27.6667C29 28.9554 27.9927 30 26.75 30H13.25C12.0074 30 11 28.9554 11 27.6667V11.3333Z" 
        stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M23 10V12.5C23 13.8807 24.1193 15 25.5 15H28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 17V23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 20H23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
        
    )
}

export default NewTestIcon;
