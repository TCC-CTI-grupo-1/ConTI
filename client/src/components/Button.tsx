interface Props{
    text: string;
    type?: 1 | 2;
    onClick: () => void;
}

const Button = ({text, onClick, type = 1}: Props) => {
    return (
        <button onClick={onClick} className={type == 2 ? 'secondary' : ''}>
             <h3> {text} </h3>
        </button>
    )
}

export default Button;