import { SessionData } from "express-session"

interface Profile {
    id: number;
    name: string;
    email: string;
}

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean;
        profile:Profile;
    }
}