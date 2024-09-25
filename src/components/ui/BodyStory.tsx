import { ignoredWords } from '@/lib/data';
import React from 'react'
import { type Dictionary } from '@/lib/types';
type Props = {
    text: string;
    dictionary: Dictionary[];
    addWord: (word: string) => void;

}
export default function BodyStory({ text, dictionary, addWord }: Props) {
    return (
        text.split('\n\n').map((paragraph, i) => {
            return (
                <p key={i} className="text-slate-300 font-light text-justify mb-2 md:mb-3">
                    {paragraph.split(' ').map((word, j) => {
                        const replacedWord = word.replace(/[.,;:"¡!?¿'—]/g, '').toLowerCase();
                        if (ignoredWords.has(word.toLowerCase())) {
                            return word + ' ';
                        } else {
                            if (word.toLowerCase() !== replacedWord) {
                                return <span key={`word-${j}`}>
                                    <span onClick={() => addWord(replacedWord)} className={`${dictionary.map(e => e.word).includes(replacedWord) ? "text-sky-300" : "cursor-pointer hover:text-sky-300 hover:underline"}`}>
                                        {word.slice(0, -1)}
                                    </span>
                                    <span className="">{word.at(-1)}</span>{' '}
                                </span>
                            }
                            else {
                                return <span key={`word-${j}`}><span onClick={() => addWord(replacedWord)} className={` ${dictionary.map(e => e.word).includes(replacedWord) ? "text-sky-300" : "cursor-pointer hover:text-sky-300 hover:underline"}`}>{word}</span>{' '}</span>;
                            }
                        }
                    })}
                </p>
            );
        })
    )
}
