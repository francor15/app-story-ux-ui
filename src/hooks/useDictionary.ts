import { useState, Dispatch, SetStateAction } from 'react'
import { type Dictionary } from '@/lib/types'

const useDictionary = (): [Dictionary[], { setDictionary: Dispatch<SetStateAction<Dictionary[]>>, addWord: (word: string) => void }] => {

    const [dictionary, setDictionary] = useState<Dictionary[]>([]);

    const addWord = (word: string) => {

        const wordExists = dictionary.some(item => item.word === word);
        if (!wordExists) {
            const newWord = {
                word: word,
                meaning: ''
            }
            setDictionary(prevDictionary => {
                const filteredDictionary = prevDictionary.filter(item => item.meaning.length > 0);
                return [...filteredDictionary, newWord];
            });
        }
    }

    return [dictionary, { setDictionary, addWord }]

}

export default useDictionary