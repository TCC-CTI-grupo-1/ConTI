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
                    <Button variant='outline' onClick={handleDescartar}>Descartar</Button>
                    <Button onClick={handleSaveChanges}>Salvar</Button>
                </div>
            </div>
        </>
    );
}

export default PopupBottom;