import Button from "./Button";

interface Props{
    enabled: boolean;
    handleSalvar: () => void;
    handleDescartar: () => void;
}


const PopupBottom = ({enabled, handleSalvar, handleDescartar}: Props) => {
    return (
        <>
            <div className={"popup-bottom " + (enabled && 'enabled')}>
                <p>Você tem mudanças não salvas</p>
                <div>
                    <Button text='Descartar' variant='outline' onClick={handleDescartar}/>
                    <Button text='Salvar' onClick={handleSalvar}/>
                </div>
            </div>
        </>
    );
}

export default PopupBottom;