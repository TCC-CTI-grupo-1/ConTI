import { SessionData } from "express-session"

export interface Profile extends SessionData {
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