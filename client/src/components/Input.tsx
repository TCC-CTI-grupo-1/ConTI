import { useState } from "react";

interface Props{
    name: string;
    label: string;
    valid?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    type?: 'text' | 'password';
    value?: string;
    color?: 'black' | 'blue';
}

const Input = ({name, label, onChange, valid, children, type="text", value, color='blue'}: Props) => {

    const [inputType, setInputType] = useState(type);
    const [isEmpty, setIsEmpty] = useState(value == undefined);

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
            (valid ? 'valid' : 'invalid') : 'basic') + ' ' + (isEmpty ? '' : 'hasContent')
            + ' ' + (color =='black' ? 'variant-black' : '')}>
            <div className="options">
                <input type={inputType} name={name} onChange={handleChange} value={value} />
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