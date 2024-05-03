import { useState } from "react";

interface Props{
    name: string;
    label: string;
    valid?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    type?: 'text' | 'password';
}

const Input = ({name, label, onChange, valid, children, type="text"}: Props) => {

    const [inputType, setInputType] = useState(type);
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

    function showPassword(){
        if(inputType === 'password'){
            setInputType('text');
        }
        else{
            setInputType('password');
        }
    }

    return (
        <div id="input" className={(valid != null ? 
            (valid ? 'valid' : 'invalid') : 'basic') + ' ' + (isEmpty ? '' : 'hasContent')}>
            <div className="options">
                <input type={inputType} name={name} onChange={handleChange} />
                <div className="inputFocused">
                    <p>{label}</p>
                    {children &&
                    
                    <div className="children">
                        {children}
                    </div>}
                    {type === 'password' && <span className="material-symbols-outlined"
                    onClick={showPassword}>visibility</span>}
                </div>
            </div>
        </div>
        
    )
}

export default Input;