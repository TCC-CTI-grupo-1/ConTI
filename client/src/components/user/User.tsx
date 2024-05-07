import { useState } from "react"
import Background from "./Background";
import Login from "./Login";
import Signup from "./Signup";

const User = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
    <div className="center full-screen-size">
        <Background signin={!isLogin}/>
        {isLogin && <Login changeLoginPage={() => setIsLogin(false)}/>}
        {!isLogin && <Signup changeLoginPage={() => setIsLogin(true)}/>}
    </div>
    );
}

export default User;