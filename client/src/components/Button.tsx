//import loadingIcon from '../assets/loading.gif';
import { Button } from '@chakra-ui/react';

interface Props{
    text: string;
    type?: 'solid' | 'outline' | 'ghost' | 'link';
    onClick: () => void;
    loading?: boolean;
    size?: 'lg' | 'md' | 'sm' | 'xs'
}

const LocalButton = ({text, onClick, type = 'solid', loading = false, size='lg'}: Props) => {
    return (
        <Button variant={type} colorScheme='blue' width={'100%'}
        onClick={onClick}
        isLoading={loading}
        size={size}>{text}</Button>
    )
}

/*<button onClick={onClick} className={(type == 2 ? 'secondary' : '')
            + ' ' + (loading ? 'loading' : '')
        }>
             {!loading && <h3> {text} </h3>}
             {loading && <img src={loadingIcon} alt="Loading" />}
        </button>*/


export default LocalButton;