//import loadingIcon from '../assets/loading.gif';
import { Button } from '@chakra-ui/react';

interface Props{
    text: string;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    onClick: () => void;
    loading?: boolean;
    size?: 'lg' | 'md' | 'sm' | 'xs'
    color?: 'blue' | 'red'
    width?: '100%' | 'auto' | 'fit-content'
}

const LocalButton = ({text, onClick, variant = 'solid', loading = false, 
size='lg', color = 'blue', width='100%'}: Props) => {
    return (
        <Button variant={variant} colorScheme={color} width={width}
        onClick={onClick}
        isLoading={loading}
        size={size}>{text}
        </Button>
    )
}

/*<button onClick={onClick} className={(type == 2 ? 'secondary' : '')
            + ' ' + (loading ? 'loading' : '')
        }>
             {!loading && <h3> {text} </h3>}
             {loading && <img src={loadingIcon} alt="Loading" />}
        </button>*/


export default LocalButton;