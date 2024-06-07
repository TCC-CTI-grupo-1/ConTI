import { Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Button from "../../Button"
import Input from "../../Input";
import PopupBottom from "../../PopupBottom";
import { getUser } from "../../../controllers/userController";
import { Profile } from "../../../../../server/src/types/express-session";
import { handleDeleteAccount, handleLogout, handleSaveChanges } from "../../../controllers/userController";

const Config = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [updates, setUpdates] = useState<string[]>([]);
    const [user, setUser] = useState<Profile | null>(null);
    /*Informações provenientes do BancoDeDados*/

    async function handleGetUser(){
        let user = await getUser();
        setUser(user);
    }
    useEffect(() => {
        handleGetUser();
    }, []);

    useEffect(() => {
        console.log(user);
        if (user != null) {
            setLoading(false);
        }
    }, [user]);

    
    /*Aqui ficam todas as configurações, as quais o usuario pode alkterar*/
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [creationDate, setCreationDate] = useState<Date>(new Date());

    function setDefaultInfo(){
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setCreationDate(new Date(user.creation_date));
        }
        setUpdates([]);
    }

    useEffect(() => {
        setDefaultInfo();
    }, [user]);
    
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
        if (e.target.value != user?.name) {
            !updates.includes('name') && setUpdates([...updates, 'name']);
            console.log(updates);
        }
        else{
            setUpdates(updates.filter((item) => item != 'name'));
        }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
        if (e.target.value != user?.email) {
            !updates.includes('email') && setUpdates([...updates, 'email']);
        }
        else{
            setUpdates(updates.filter((item) => item != 'email'));
        }
    }


    //Função puramente para testes
    /*Na real essa demora vei ser para puxar ainfo do banco
    async function loadConfig():Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 10));
        return true;
    }


    useEffect(() => {
        loadConfig().then(() => setLoading(false));
    }, []);*/


    return (
        <>
            {loading && <div id="config">
                <Skeleton>
                    <div>
                        <h2>Vamos ocupar espaço</h2>
                        <p>Precisava ver como o scroll se comporta</p>
                        <p>E para tal feito, necessito ocupar mais espaço</p>
                    </div>
                </Skeleton>
                <Skeleton>
                    <div>
                        <h2>Vamos ocupar espaço</h2>
                        <p>Precisava ver como o scroll se comporta</p>
                        <p>E para tal feito, necessito ocupar mais espaço</p>
                    </div>
                </Skeleton>
                <Skeleton>
                    <div>
                        <h2>Vamos ocupar espaço</h2>
                        <p>Precisava ver como o scroll se comporta</p>
                        <p>E para tal feito, necessito ocupar mais espaço</p>
                    </div>
                </Skeleton>
                <Skeleton>
                    <div>
                        <h2>Vamos ocupar espaço</h2>
                        <p>Precisava ver como o scroll se comporta</p>
                        <p>E para tal feito, necessito ocupar mais espaço</p>
                    </div>
                </Skeleton>
                
            </div>}

            {!loading && <div id="config">
                <div>
                    <h2>Informações da conta</h2>
                    <Input name="nome"color={updates.includes('name') ? 'blue' : 'black'}
                    label="Nome" value={name} onChange={(e) => {
                        handleNameChange(e);
                    }}
                    valid={updates.includes('name') ? true : undefined}/>

                    <Input name="nome" color={updates.includes('email') ? 'blue' : 'black'}
                    label="Email" value={email} onChange={(e) => {
                        handleEmailChange(e);
                    }}
                    valid={updates.includes('email') ? true : undefined}
                    />
                    <p>Data de criação da conta: {creationDate.toLocaleDateString()}</p>
                </div>
                
                <div>
                    <h2>Configurações da conta</h2>
                    <Button text='Log-out' color='red' width="auto" variant='outline' onClick={handleLogout} />
                    <Button text='Deletar conta' color='red' width="auto" onClick={handleDeleteAccount} />
                </div>

                

                <div>
                    <h2>Vamos ocupar espaço</h2>
                    <p>Precisava ver como o scroll se comporta</p>
                    <p>E para tal feito, necessito ocupar mais espaço</p>
                </div>
            </div>}
            <PopupBottom 
            enabled={updates.length > 0}
            handleSalvar={handleSaveChanges}
            handleDescartar={setDefaultInfo}
            />

        </>

    );
};

export default Config;
