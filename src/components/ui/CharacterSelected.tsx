import React, { useState } from 'react'
import { characters, specialFeatures } from '@/lib/data'
import { getItem } from '@/lib/helperFunctions'
import { IconAdjust, IconClose, IconPoint } from '../../../public/Icons'
import useStoryStore from '@/store/useStoryStore'
import * as Dialog from '@radix-ui/react-dialog'
import CharacterCustomize from './CharacterCustomize'
import { type CharacterProperties } from '@/lib/types'

export default function CharacterSelected({ character, index }: { character: CharacterProperties, index: number }) {

    const { removeCharacter, data } = useStoryStore()
    const [open, setOpen] = useState(false);

    const titles: Record<string, string> = {
        type: 'Type',
        name: 'Name',
        rol: 'Rol',
        specialFeatures: 'Special Features'
    }

    const orderToDisplay = ['name', 'rol', 'specialFeatures'];

    const emoji = getItem(characters, 'character', character.type)?.emoji || null;

    return (
        <section className='relative border border-gray-900 bg-slate-900/80 rounded flex flex-col items-center justify-center size-full gap-1 p-2'>
            <div className={`flex items-center justify-between flex-wrap sm:flex-nowrap w-full mt-1 ${Object.keys(character).length > 1 && "border-b pb-2.5 border-gray-800"}`}>
                <div className="flex gap-2.5">
                    <span className="flex items-center justify-center size-9 rounded-full border text-lg border-rose-200 bg-fuchsia-500/10">
                        {emoji}
                    </span>
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-slate-300">
                            {character?.type}
                        </h3>
                        <h5 className="text-xs text-slate-500">
                            Personaje {data.characters.length - index}
                        </h5>
                    </div>
                </div>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger
                        className='inline-flex items-center justify-center gap-2 border border-gray-800 py-2 md:py-1.5 px-3 rounded-md transition-all duration-200 ease-in-out hover:text-fuchsia-400 text-slate-400  text-lg md:text-sm font-medium'
                    ><IconAdjust />  <span className="sr-only md:not-sr-only">Custom</span>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                        <Dialog.Content className="
                        fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-700 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg
                        
                        max-h-[85vh] w-[90vw] max-w-[450px] xl:-translate-x-1/2 rounded-md bg-gray-950  focus:outline-none ">
                            <div className="flex items-center justify-between ">
                                <Dialog.Title className="text-slate-200 m-0 text-lg font-semibold">
                                    Customize Character
                                </Dialog.Title>
                                <Dialog.Close className="text-xl text-slate-800 hover:text-slate-400">
                                    <IconClose />
                                </Dialog.Close>
                            </div>
                            {/* BODY MODAL */}
                            <div className="bg-gray-800 my-2.5 w-full h-px" />
                            <CharacterCustomize
                                character={character}
                                afterSave={() => setOpen(false)}
                            />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            <div className='w-full flex flex-col gap-1'>
                {orderToDisplay.map((key, i) =>
                    character[key] &&
                    <div key={i} className="flex items-start justify-start">
                        <div className='inline-flex items-center mr-2 w-full px-0.5'>
                            <div className="flex flex-wrap gap-y-0.5 select-none">
                                <span className='inline-flex items-center text-xs font-medium text-purple-400'>
                                    <IconPoint className='w-5 h-5' />{titles[key] + ":"}
                                </span>
                                {Array.isArray(character[key]) ?
                                    character.specialFeatures?.map((item, i) => (
                                        <span key={i} className='inline-flex items-center text-xs text-slate-200 bg-slate-600/30 rounded ml-1.5 mb-0.5 px-1.5 py-0.5'> {`${getItem(specialFeatures, 'feature', item)?.emoji} ${item}`}</span>
                                    )) || null
                                    :
                                    <span className='inline-flex items-center text-xs text-slate-400 ml-2'>{character[key]}</span>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={() => removeCharacter(character.type)}
                className="absolute -top-2 -left-2 rounded-full text-xs bg-red-700 text-slate-50 p-0.5"
            ><IconClose />
            </button>
        </section>
    )
}
