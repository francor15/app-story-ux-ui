import React from 'react'
import { LIMIT_CHARACTERS } from '@/lib/constants'
import useStoryStore from '@/store/useStoryStore'
import { type TitleItem } from '@/lib/types'
type InputcheckboxProps = {
    item: string;
    emoji: string;
    // keyItem: TitleItem | string;
};


export default function InputCheckbox({ item, emoji }: InputcheckboxProps) {

    const { data, addCharacter, removeCharacter } = useStoryStore()

    const isCharacterSelected = Object.values(data.characters).map(character => character.type).includes(item)
    const isLimitReached = Object.values(data.characters).length !== LIMIT_CHARACTERS

    const animationClass: string = (!isCharacterSelected || (data.characters.length > 0)) ? 'animate-fade-scale' : '';

    const selectedCharacter = () => (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const character = target.value;

        const newCharacter = {
            type: character
        }
        if (Object.values(data.characters).length < LIMIT_CHARACTERS) {
            if (isCharacterSelected) {
                return removeCharacter(character)
            }
            return addCharacter(newCharacter);

        } else if (isCharacterSelected) {
            return removeCharacter(character)
        }
    };

    return (
        <label className='relative h-full'>
            <input
                type="checkbox"
                id={`option-${item}`}
                name="character"
                value={item}
                checked={isCharacterSelected}
                onChange={selectedCharacter()}
                className="absolute peer opacity-0 size-0"
            />
            <div
                className={`group size-full min-h-36 py-2.5 md:py-2 px-1 rounded-md  border border-gray-800 text-slate-500 transition-all duration-200 bg-black/30 peer-checked:shadow-[_0px_0px_5px_0px_theme('colors.fuchsia.400')] peer-checked:border-rose-200 peer-checked:text-slate-100 peer-checked:bg-fuchsia-500/10 peer-checked:after:content-['✓'] peer-checked:after:absolute peer-checked:after:top-[2.4px] peer-checked:after:right-[7px] peer-checked:after:text-[12px] peer-checked:after:text-black peer-checked:after:font-black peer-checked:after:rotate-[10deg]
                ${(isLimitReached || isCharacterSelected) ? "cursor-pointer hover:text-slate-100 hover:border-rose-200  hover:shadow-[_0px_0px_5px_0px_theme('colors.fuchsia.400')]" : "cursor-not-allowed text-slate-700 "} `}
            >
                <div className={`absolute top-2 right-2 rounded-[1px] size-2 ring-1 ring-offset-2  ${isCharacterSelected ? "ring-fuchsia-100 bg-fuchsia-100 ring-offset-fuchsia-100 " : "ring-offset-[#080B18] ring-gray-800 bg-[#080B18]"}`} />

                <div className={`flex flex-col gap-2.5 items-center justify-center size-full ${animationClass} ${(isLimitReached || isCharacterSelected) ? "" : "grayscale-[83%] text-slate-500"}`}>
                    <span className={`flex items-center justify-center size-10 md:size-12 rounded-full border text-xl md:text-2xl ${isCharacterSelected ? 'border-rose-200 bg-fuchsia-500/10' : 'border-gray-800'}`}>
                        {emoji}
                    </span>
                    <h5 className="text-sm px-1.5 md:px-3 text-center font-light leading-5">
                        {item}
                    </h5>
                </div>
            </div>
        </label >
    )
}
