import { SessionData } from "express-session"

export interface Profile {
    id: number;
    name: string;
    email: string;
    creation_date: Date;
}

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean;
        profile:Profile;
    }
}