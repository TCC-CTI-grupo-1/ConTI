import React from 'react';
import { Button, useBreakpointValue, ChakraProvider, extendTheme } from '@chakra-ui/react';

interface Props {
    children: string;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    onClick: () => void;
    loading?: boolean;
    colorScheme?: 'blue' | 'red' | 'gray'
    width?: '100%' | 'auto' | 'fit-content'
    rightIcon?: any

}

const LocalButton = ({ children, onClick, variant = 'solid', loading = false, 
    colorScheme = 'blue', width = '100%', rightIcon }: Props) => {
    
    const size = useBreakpointValue({ base: 'xs', sm: 'xs', md: 'sm', lg: 'md' });

    return (
        <Button
            variant={variant}
            colorScheme={colorScheme}
            width={width}
            onClick={onClick}
            isLoading={loading}
            size={size}
            rightIcon={rightIcon}
        >
            {children}
        </Button>
    );
}

export default LocalButton;
