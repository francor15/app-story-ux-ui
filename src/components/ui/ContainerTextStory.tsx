import React from 'react'
import SecondaryButton from './SecondaryButton'
import { IconFontSizeRes, IconFontSizeAdd, IconSound } from '../../../public/Icons'

export default function ContainerTextStory({ children }: {children: React.ReactNode}) {
    return (
        <article className='col-span-12 md:col-span-7 row-span-12 border border-gray-800 rounded-lg h-[40rem] bg-gray-950'>
            <header className="h-12 border-b border-gray-800 rounded-t-lg inline-flex items-center justify-end w-full gap-3 px-2 md:px-4">
                <div className="inline-flex gap-1.5 items-center">
                    <SecondaryButton icon={<IconFontSizeRes />} className='size-9 px-0 md:px-0' />
                    <SecondaryButton icon={<IconFontSizeAdd />} className='size-9 px-0 md:px-0' />
                    <SecondaryButton icon={<IconSound />} className='size-9 px-0 md:px-0' />
                </div>
            </header>
            <section className="p-3 md:p-4 h-[36.4rem] overflow-y-auto scrollbar-dark rounded-b-lg">
                <div className='flex gap-x-2 items-start justify-start mb-2 md:mx-1'>
                    <span className="flex w-3 h-3 bg-gradient-to-bl from-fuchsia-600 to-rose-300 rounded-full"></span>
                    <span className="flex w-3 h-3 bg-gradient-to-bl from-purple-500 to-fuchsia-200 rounded-full"></span>
                    <span className="flex w-3 h-3 bg-gradient-to-bl from-cyan-400 to-slate-200 rounded-full"></span>
                </div>
                {children}
            </section>
        </article>
    )
}
