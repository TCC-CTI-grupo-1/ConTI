import { Button, useBreakpointValue } from '@chakra-ui/react';

interface Props {
    children: any;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    onClick: () => void;
    loading?: boolean;
    colorScheme?: 'blue' | 'red' | 'gray'
    width?: '100%' | 'auto' | 'fit-content'
    rightIcon?: any
    size?: 'xs' | 'sm' | 'md' | 'lg'

}

const LocalButton = ({ children, onClick, variant = 'solid', loading = false, 
    colorScheme = 'blue', width = 'fit-content', rightIcon, size }: Props) => {
    
    let defultSize = useBreakpointValue({ base: 'xs', sm: 'xs', md: 'sm', lg: 'md' });
    if(size !== undefined){
        defultSize = size;
    }

    return (
        <Button
            variant={variant}
            colorScheme={colorScheme}
            width={width}
            onClick={onClick}
            isLoading={loading}
            size={defultSize}
            rightIcon={rightIcon}
            
        >
            {children}
        </Button>
    );
}

export default LocalButton;
