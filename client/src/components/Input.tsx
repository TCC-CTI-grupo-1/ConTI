import { useState } from "react";

interface Props{
    name: string;
    label: string;
    valid?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({name, label, onChange, valid}: Props) => {

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
        <div id="input" className={valid != null ? 
            (valid ? 'valid' : 'invalid') : isEmpty ? '' : 'hasContent' }>
            <div>
                
                <input type="text" name={name} onChange={handleChange} />
                <p>{label}</p>
            </div>
            
        </div>
        
    )
}

export default Input;