import { UserLanguage } from "./language";

export type User ={
    user_id: string;
    username: string;
    expires_in: number;
    firstname: string;
    lastname: string;
    email: string;
    current_lang: string;
    avatar_url: string;
    role: string;
    age: number;
    gender: string;
    languages: UserLanguage[];
}

export type UserProfileUpdate = {
    username?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
}