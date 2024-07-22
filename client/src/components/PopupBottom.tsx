import Button from "./Button";

interface Props{
    enabled: boolean;
    handleDescartar: () => void;
    handleSaveChanges: () => void;
}

const PopupBottom = ({enabled, handleDescartar, handleSaveChanges}: Props) => {

    

    return (
        <>
            <div className={"popup-bottom " + (enabled && 'enabled')}>
                <p>Você tem mudanças não salvas</p>
                <div>
                    <Button text='Descartar' variant='outline' onClick={handleDescartar}/>
                    <Button text='Salvar' onClick={handleSaveChanges}/> {}
                </div>
            </div>
        </>
    );
}

export default PopupBottom;