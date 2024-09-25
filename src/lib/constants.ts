import { type Vocabulary, Title, ErrorParameters } from '@/lib/types'
export const THEME_PER_PAGE = 8;
export const GENRE_PER_PAGE = 8;
export const CHARACTER_PER_PAGE = 12;
export const LIMIT_CHARACTERS = 5;
export const SPECIAL_FEATURES_PER_PAGE = 6;
export const LIMIT_SPECIAL_FEATURES = 3;
export const ROL_TYPE = ["Main", "Secondary", "Villain"]

export const ERROS_CODES: Record<string, ErrorParameters> = {
    insufficient_quota: {
        msg: 'The API key you entered has already expired.',
        status: 402
    },
    model_not_found: {
        msg: 'You do not have access to a GPT-4',
        status: 404
    },
    invalid_api_key: {
        msg: 'The API key you entered is incorrect.',
        status: 406
    },
    default: {
        msg: 'An error occurred with OpenAI. Try again.',
        status: 400
    }
}

export const TITLE_PAGES: Record<number, Title> = {
    1: { title: 'genre', description: '' },
    2: { title: 'theme', description: '' },
    3: { title: 'characters', description: '' },
    4: { title: 'story', description: '' },
}

export const exampleVocabulary: Vocabulary = {
    complex_words: ["mesmerizing", "enchanting", "illuminate"],
    synonyms: {
        mesmerizing: ["captivating", "hypnotic", "spellbinding"],
        enchanting: ["charming", "bewitching", "magical"],
        illuminate: ["reveal", "clarify", "enlighten"]
    }
}