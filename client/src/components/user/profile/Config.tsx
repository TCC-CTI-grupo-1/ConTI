import { Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Button from "../../Button"
import Input from "../../Input";
import PopupBottom from "../../PopupBottom";

const Config = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [updates, setUpdates] = useState<string[]>([]);
    /*Informações provenientes do BancoDeDados*/

    const nome_BD = 'Mateus';
    const email_BD = 'mateus@gmail.com';

    /*Aqui ficam todas as configurações, as quais o usuario pode alkterar*/

    const [name, setName] = useState<string>(nome_BD);
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
        if (e.target.value != nome_BD) {
            !updates.includes('name') && setUpdates([...updates, 'name']);
            console.log(updates);
        }
        else{
            setUpdates(updates.filter((item) => item != 'name'));
        }
    }

    const [email, setEmail] = useState<string>(email_BD);
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
        if (e.target.value != email_BD) {
            !updates.includes('email') && setUpdates([...updates, 'email']);
        }
        else{
            setUpdates(updates.filter((item) => item != 'email'));
        }
    }

    
    async function ghostFetch(){
        const response = await fetch('http://localhost:3001/teste', {
            method: 'GET',
        })
        const responseData = await response.json();
        console.log(responseData);
    }


    //Função puramente para testes
    //Na real essa demora vei ser para puxar ainfo do banco
    async function loadConfig():Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }


    useEffect(() => {
        loadConfig().then(() => setLoading(false));
    }, []);


    return (
        <>
            {loading && <div id="config">
                <Skeleton height='100px' />
                <Skeleton height='100px' />
                <Skeleton height='100px' />
                
            </div>}

            {!loading && <div id="config">
                <div>
                    <h1>Informações da conta</h1>
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
                    <p>Data de criação da conta: 18/05/2024</p>
                </div>
                
                <div>
                    <h1>Configurações da conta</h1>
                    <Button text='Log-out' color='red' width="auto" variant='outline' onClick={ghostFetch} />
                    <Button text='Deletar conta' color='red' width="auto" onClick={() => {}} />
                </div>

                

                <div>
                    <h1>Vamos ocupar espaço</h1>
                    <p>Precisava ver como o scroll se comporta</p>
                    <p>E para tal feito, necessito ocupar mais espaço</p>
                </div>
            </div>}
            <PopupBottom enabled={updates.length > 0}/>

        </>

    );
};

export default Config;
