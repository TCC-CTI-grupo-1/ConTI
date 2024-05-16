import { login } from './controllers/login';
import { signup } from './controllers/signup';

export async function routes(app: any) {
    app.post('/signup', console.log("teste"));
    app.post('/login', login);
}