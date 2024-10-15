import Navbar from "../../Navbar";
import { useState } from "react";
import { useRef } from "react";
import Status from "./Status";
import Config from "./Config";
import Background from "../Background";
const Profile = () => {

    const [tela, setTela] = useState<number>(0);
    const options = useRef<HTMLDivElement>(null); // Add type annotation to options ref

    let elements:HTMLAnchorElement[] = [];

    //Talvez mover isso para um componente próprio


    function handleChangeTela(tela: number) {
        setTela(tela);
        elements = Array.from(options.current?.children as HTMLCollectionOf<HTMLAnchorElement>);
        elements?.forEach((element, index) => {
            element.classList.remove('active');
                if (index === tela) {
                    element.classList.add('active');
                }
        });
    }

    return (
        //Não sei se botar a classe full-screen-size é uma boa ideia
        <div id="profile" className="flex-container full-screen-size">
            <Background variant="white" />
            <Navbar screen="profile"/>
            <div className="container">
                <div className="header">
                    <h1>Perfil</h1>
                    <div className="options" ref={options}>
                        <a className="active"
                        onClick={() => {
                            handleChangeTela(0);
                            //e.currentTarget.classList.add('active');

                        }}>Status do usuário</a>
                        <a onClick={() => {
                            handleChangeTela(1);
                            //e.currentTarget.classList.add('active');
                        }}
                        
                        >Configurações da conta</a>
                        {/*<div className='selected-line'></div>*/}
                    </div>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    {tela == 0 && <Status />}
                    {tela == 1 && <Config />}
                </div>
            </div>
        </div>
    );
}

export default Profile;