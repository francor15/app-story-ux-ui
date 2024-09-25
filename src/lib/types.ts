export type ButtonMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export type Title = {
    title: string;
    description: string;
}

export type Genre = {
    id: number;
    genre: string;
    emoji: string;
    [key: string]: string | number;
};

export type Theme = {
    id: number;
    theme: string;
    emoji: string;
    [key: string]: string | number;

};

export type Character = {
    id: number;
    character: string;
    emoji: string;
    [key: string]: string | number;

};

export type CharacterProperties = {
    type: string;
    specialFeatures?: string[];
    name?: string;
    rol?: string;
    [key: string]: string[] | string | undefined;
}
export type FormDataCharacter = {
    name: string;
    rol: string;
    specialFeatures: string[];
}

export type SpecialFeature = {
    id: number;
    feature: string;
    emoji: string;
    [key: string]: string | number;
};

export type CommonKeys<T> = keyof T;

export type TitleItem = 'genre' | 'theme' | 'characters' | 'story' | 'title';

export type Item = Theme | Genre | Character | SpecialFeature

export type Dictionary = {
    word: string;
    meaning: string;
}

export type Vocabulary = {
    complex_words: string[];
    synonyms: Record<string, string[]>;
}

export type ErrorParameters = {
    msg: string;
    status: number;
}