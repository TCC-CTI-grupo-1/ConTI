
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    ChakraProvider,
  } from '@chakra-ui/react'

interface Props{
    message: string;
    description?: string;
    type?: 'error' | 'success' | 'warning' | 'info'
}
const AlertBox = ( {message, type = 'error', description}:Props ) => {

    return (
        <ChakraProvider>
            <Alert status={type}>
                <AlertIcon />
                <AlertTitle>{message}</AlertTitle>
                {description && <AlertDescription>{description}</AlertDescription>}
            </Alert>
        </ChakraProvider>
    );
};


export default AlertBox;