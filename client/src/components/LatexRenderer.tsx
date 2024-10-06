import React, { ReactNode } from 'react';
import Latex from 'react-latex-next';

interface Props {
    text: string | ReactNode | JSX.Element ;
}




const LatexRenderer: React.FC<Props> = ({ text }) => {
    let value:string;
    if(typeof text !== 'string') {
        if(React.isValidElement(text)){
            value = text.props.children;
        }
        else {
            throw new Error('Erro: Tipo inválido');
        }
    }
    else {
        value = text;
    }
    
    const parts = value.split(/(<tex>.*?<\/tex>)/g);

    return (
        <div>
            {parts.map((part, index) => {
                if (part.startsWith('<tex>') && part.endsWith('</tex>')) {
                    const latexContent = part.slice(5, -6);
                    return <Latex key={index}>${latexContent}$</Latex>;
                }
                return <span key={index}>{part}</span>;
            })}
        </div>
    );
};

export default LatexRenderer;