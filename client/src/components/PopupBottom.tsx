import Button from "./Button";
import { Profile } from "../../../server/src/types/express-session";
import { handleSaveChanges } from "../controllers/userController";
import { showAlert } from "../App";

interface Props{
    enabled: boolean;
    profile: Profile | undefined;
    handleDescartar: () => void;
}

const PopupBottom = ({enabled, handleDescartar, profile}: Props) => {
    if(!profile){
        showAlert('Erro ao salvar as alterações', 'error');
        return <></>;
    }
    return (
        <>
            <div className={"popup-bottom " + (enabled && 'enabled')}>
                <p>Você tem mudanças não salvas</p>
                <div>
                    <Button text='Descartar' variant='outline' onClick={handleDescartar}/>
                    <Button text='Salvar' onClick={() => handleSaveChanges(profile)}/> {}
                </div>
            </div>
        </>
    );
}

export default PopupBottom;