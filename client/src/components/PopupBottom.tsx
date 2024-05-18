import Button from "./Button";

interface Props{
    enabled: boolean;
}


const PopupBottom = ({enabled}: Props) => {
    return (
        <>
            <div className={"popup-bottom " + (enabled && 'enabled')}>
                <p>Você tem mudanças não salvas</p>
                <div>
                    <Button text='Descartar' variant='outline' onClick={() => {}}/>
                    <Button text='Salvar' onClick={() => {}}/>
                </div>
            </div>
        </>
    );
}

export default PopupBottom;