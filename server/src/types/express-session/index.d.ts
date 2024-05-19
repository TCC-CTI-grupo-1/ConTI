import { SessionData } from "express-session"

interface User{
    id: number;
}

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean;
        user:User;
    }
}