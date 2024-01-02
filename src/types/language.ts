export type language = {
    name: string;
    sentenceCount: number;
    is_translated: boolean;
    native_name: string;
    text_direction: string;
}
export type accent = {
    name: string;
    token: string;
    clientId: string;
}

export type UserLanguage = {
    id: string;
    languageId: string;
    userId: string;
    accentId: string;
    language: language;
    Accent: accent;
}