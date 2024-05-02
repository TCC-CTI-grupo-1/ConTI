import React, { useState } from "react";

interface Props{
    name: string;
    label: string;
    valid?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const Input = ({name, label, onChange, valid, children}: Props) => {


    const [isEmpty, setIsEmpty] = useState(true);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.value === ''){
            setIsEmpty(true);
        }
        else{
            setIsEmpty(false);
        }

        //alert(isEmpty);
        onChange(e);
    }

    return (
        <div id="input" className={(valid != null ? 
            (valid ? 'valid' : 'invalid') : 'basic') + ' ' + (isEmpty ? '' : 'hasContent')}>
            <div className="options">
                <input type="text" name={name} onChange={handleChange} />
                <div className="inputFocused">
                    <p>{label}</p>
                    {children &&
                    
                    <div className="children">
                        {children}
                    </div>}
                </div>
                
            </div>
        </div>
        
    )
}

export default Input;