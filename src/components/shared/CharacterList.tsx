import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import useStoryStore from '@/store/useStoryStore'
import useRandomItems from '@/hooks/useRandomItems'
import Container from '../ui/Container'
import CharacterSelected from '../ui/CharacterSelected'
import InputCheckbox from '../ui/InputCheckbox'
import { characters } from '@/lib/data'
import { CHARACTER_PER_PAGE, LIMIT_CHARACTERS} from '@/lib/constants'
import { IconRandom } from '../../../public/Icons'

export default function CharacterList() {

    const { data, setPreviusData } = useStoryStore()

    const { items: listCharacters, refreshItems } = useRandomItems({
        totalItems: characters,
        ITEMS_PER_PAGE: CHARACTER_PER_PAGE,
        chosen: data.characters.map(character => character.type),
        key: 'character'
    })

    useEffect(() => (setPreviusData("character", listCharacters)), [listCharacters])
    
    const isSelected = data.characters.length > 0;
    const limitReached = data.characters.length === LIMIT_CHARACTERS

    return (
        <>
            <header className='max-w-sm mt-2 flex flex-col gap-1 items-center text-center mx-auto'>
                <h3 className="text-slate-100 text-2xl font-semibold uppercase">Select character</h3>
                <p className="text-slate-500 text-sm leading-4 mt-1 md:mt-0 px-8 mb-2">To continue, you can choose up to 3 characters. If you want to see other characters, click the button below.</p>
                <button
                    onClick={() => refreshItems()}
                    disabled={limitReached}
                    className="group select-none bg-slate-100 text-black w-1/2 rounded-md h-8 px-2 font-medium text-sm inline-flex items-center justify-center gap-0.5 disabled:pointer-events-none disabled:opacity-60"
                >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap group-active:[transform:translate3d(0,1px,0)]">
                        <IconRandom className="text-lg rotate-180" />Others characters
                    </span>
                </button>
            </header>
            <Container className={`${isSelected && "max-w-5xl"} md:grid-cols-12 gap-4`}>
                {isSelected &&
                    <div className="order-2 md:order-1 md:-ml-2 col-span-2 md:col-span-5 flex flex-col md:flex-row md:justify-between">
                        <div className='order-2 md:order-1 flex-1 flex-col mt-2.5 md:mt-0 md:px-1 h-[28.2rem] overflow-y-auto scrollbar-dark overflow-x-hidden'>
                            <div className="flex flex-col items-center mb-1.5">
                                <div className="inline-flex items-center w-full">
                                    <div className="flex-1 h-px w-full bg-slate-800"></div>
                                    <h4 className="font-medium text-slate-200 mx-2">
                                        Characters selected
                                    </h4>
                                    <div className="flex-1 h-px w-full bg-slate-800"></div>

                                </div>
                                <div className="inline-flex items-center text-slate-400 text-xs -mt-1 ">
                                    <span className="text-slate-200 font-bold text-base">
                                        {"0" + data.characters.length}
                                    </span>
                                    <span className="mt-1">&nbsp;/&nbsp;{"0" + LIMIT_CHARACTERS}</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-950/50 rounded border border-gray-800 p-2">
                                <div className='flex flex-col items-start gap-4 p-1'>
                                    <AnimatePresence>
                                        {[...data.characters].reverse().map((character, index) => (
                                            <motion.div
                                                className='w-full'
                                                key={character.type}
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <CharacterSelected
                                                    character={character}
                                                    index={index}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                        <div className="-mx-2 md:mx-0 md:absolute md:-mt-5 bg-slate-900 h-px md:h-full md:w-px md:left-[41.6%]"></div>
                    </div>
                }
                <div className={`order-1 md:order-2 ${isSelected ? "col-span-2 md:col-span-7" : "col-span-2 md:col-span-12"}`}>
                    <section className='grid grid-cols-3 md:grid-cols-4 gap-2.5'>
                        {
                            listCharacters.map(({ id, character, emoji }) => (
                                <InputCheckbox
                                    key={id}
                                    item={character as string}
                                    emoji={emoji}
                                />
                            ))
                        }
                    </section >
                </div>
            </Container>
        </>
    )

}
