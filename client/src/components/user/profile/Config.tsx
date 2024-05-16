import { Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Button from "../../Button"
import Input from "../../Input";
import PopupBottom from "../../PopupBottom";

const Config = () => {
    const [loading, setLoading] = useState<boolean>(true);


    /*Aqui ficam todas as configurações, as quais o usuario pode alkterar*/

    const [name, setName] = useState<string>('Mateus');
    const [email, setEmail] = useState<string>('mateus@gmail.com');

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
                    <Input name="nome"color="black" 
                    label="Nome" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                    <Input name="nome" color="black" 
                    label="Email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                </div>

                <div>
                    <h1>Configurações da conta</h1>
                    <Button text='Log-out' color='red' width="auto" variant='outline' onClick={() => {}} />
                    <Button text='Deletar conta' color='red' width="auto" onClick={() => {}} />
                </div>
                <div>
                    <h1>Vamos ocupar espaço</h1>
                    <p>Precisava ver como o scroll se comporta</p>
                    <p>E para tal feito, necessito ocupar mais espaço</p>
                </div>
            </div>}
            <PopupBottom enabled={true}/>

        </>

    );
};

export default Config;
