import React from 'react'
import { type Vocabulary } from '@/lib/types'
import Arrow from './Arrow'

export default function ContainerVocabulary({ objectVocabulary }: { objectVocabulary: Vocabulary }) {
    return (
        <>
            <h3 className='h-12 w-full inline-flex items-center justify-center border-b border-gray-800 text-slate-100 font-bold text-xl mb-1.5'>VOCABULARY</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 rounded m-2 md:m-4 overflow-auto scrollbar-dark border border-gray-800">
                {objectVocabulary?.complex_words?.map((word: string, index: number) => {
                    return (
                        <div key={index} className={`relative grid grid-cols-3 ${index !== objectVocabulary?.complex_words?.length - 1 ? "border-b" : "border-none"}  border-gray-800`}>
                            <h5 className="text-fuchsia-300 font-semibold text-sm flex items-center pl-2">{word?.charAt(0).toUpperCase() + word.slice(1)}</h5>
                            <div className="flex h-full w-full sr-only md:not-sr-only ">
                                <Arrow className='pt-2' />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                {
                                    objectVocabulary?.synonyms[word]?.map((synonym: string, index: number) => (
                                        <div key={index} className="flex items-center gap-0.5 text-slate-300 text-sm font-light pl-8 md:pl-0">
                                            <span className="flex size-1.5 bg-gradient-to-tl from-fuchsia-600 to-rose-200 rounded-full"></span>
                                            {synonym?.charAt(0).toUpperCase() + synonym.slice(1)}

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </>
    )
}
