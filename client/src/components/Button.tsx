import loadingIcon from '../assets/loading.gif';


interface Props{
    text: string;
    type?: 1 | 2;
    onClick: () => void;
    loading?: boolean;
}

const Button = ({text, onClick, type = 1, loading = false}: Props) => {
    return (
        <button onClick={onClick} className={(type == 2 ? 'secondary' : '')
            + ' ' + (loading ? 'loading' : '')
        }>
             {!loading && <h3> {text} </h3>}
             {loading && <img src={loadingIcon} alt="Loading" />}
        </button>
    )
}

export default Button;