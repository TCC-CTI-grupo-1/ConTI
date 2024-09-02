import { SessionData } from "express-session"

export interface Profile {
    id: number;
    name: string;
    email: string;
    password: string;
    profile_picture: (string | null);
    creation_date: Date;
    total_correct_answers: number;
    total_answers: number;
    total_mock_tests: number;
}

declare module "express-session" {
    interface SessionData {
        isLoggedIn: boolean;
        profile:Profile;
    }
}