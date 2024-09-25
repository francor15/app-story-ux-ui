
import React from 'react';
import { IconSparkles } from '../../../public/Icons'
import { type Dictionary } from '@/lib/types'
type DictionaryProps = {
    dictionary: Dictionary[],
    setDictionary: React.Dispatch<React.SetStateAction<Dictionary[]>>

}

export default function Dictionary({ dictionary, setDictionary }: DictionaryProps) {

    const addMeaning = (word: string) => {
        setDictionary(prevDictionary => {
            return prevDictionary.map(item => {
                if (item.word === word) {
                    return { ...item, meaning: 'add meaning' };
                } else {
                    return item;
                }
            });
        });
    }
    console.log(dictionary)

    return (
        <section className='space-y-4'>
            <h3 className='h-12 w-full inline-flex items-center justify-center border-b border-gray-800 text-slate-100 font-bold text-xl mb-1.5'>DICTIONARY</h3>

            {dictionary.length === 0 && (
                <div className="w-full h-52 text-center p-2 border border-dashed rounded-lg border-gray-800/70 flex items-center ">
                    <p className='text-slate-500 '>Select a word from the text to find out its meaning</p>
                </div>
            )}
            {[...dictionary].reverse().map(({ word, meaning }: Dictionary, i) => (
                <div key={i} className='grid grid-cols-6 md:gap-1 p-2 rounded-lg bg-gray-800/70 '>
                    <h4 className="col-span-2 text-rose-400 text-lg font-medium">{`${word.at(0)?.toUpperCase() + word.slice(1)}`}</h4>
                    <div className="col-span-4 flex justify-end ">
                        {meaning.length === 0 &&
                            <button onClick={() => addMeaning(word)} className="inline-flex items-center gap-1 h-6 rounded-md bg-white text-black px-4 mr-2 text-xs font-semibold ">
                                Read meaning
                                <IconSparkles />
                            </button>
                        }
                    </div>
                    <div className="col-span-6 ">
                        <div className="grid grid-cols-12 gap-1">
                            {meaning.length === 0 ?
                                <>
                                    <div className="mt-1 px-2 col-span-12 flex items-center">
                                        <div className="h-2.5 bg-slate-700 rounded-xl w-full" />
                                    </div>
                                    <div className="mt-1 px-2 col-span-12 flex items-center">
                                        <div className="h-2.5 bg-slate-700 rounded-xl w-full" />
                                    </div>
                                </>
                                :
                                <p className='col-span-12 text-slate-400 leading-5 text-sm pl-3.5 '> {word.at(0)?.toUpperCase() + word.slice(1)} is lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officiis eum numquam...</p>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}