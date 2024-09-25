'use client'

import React from "react";
import useStoryStore from "@/store/useStoryStore";
import { type TitleItem } from '@/lib/types'
type InputRadioButtonProps = {
    item: string;
    emoji: string;
    keyItem: TitleItem | string;
};
const InputRadioButton = ({ item, emoji, keyItem }: InputRadioButtonProps) => {

    const { data, handleChangeInput } = useStoryStore()

    const isSelected: boolean = data[keyItem] === item

    const animationClass: string = (!isSelected || (data[keyItem].length > 0)) ? 'animate-fade-scale' : '';
    return (
        <label className='relative h-full'>
            <input
                type="radio"
                id={`option-${item}`}
                name={keyItem}
                value={item}
                checked={isSelected}
                onChange={handleChangeInput}
                className="absolute peer opacity-0 size-0"
            />
            <div className="group size-full min-h-36 py-2.5 md:py-2 px-1 rounded-md  border border-gray-800 cursor-pointer text-slate-500 transition-all duration-200 bg-black/30 peer-checked:shadow-[_0px_0px_5px_0px_theme('colors.fuchsia.400')] peer-checked:border-rose-200 peer-checked:text-slate-100 peer-checked:bg-fuchsia-500/10">
                <div className={`absolute top-2 right-2 rounded-full size-2 ring-1 ring-offset-2 ring-offset-[#080B18] ${isSelected ? "ring-fuchsia-100 bg-fuchsia-100 " : "ring-gray-800 bg-[#080B18]"}`} />
                <div className={`flex flex-col gap-1 items-center justify-center size-full ${animationClass}`}>
                    <span className="flex items-center justify-center size-10 md:size-12 rounded-full border border-gray-800 text-xl md:text-2xl ">
                        {emoji}
                    </span>
                    <h5 className="text-xs md:text-sm px-1.5 md:px-3 text-center font-light leading-3">
                        {item}
                    </h5>
                </div>
            </div>
        </label >

    )
}

export default InputRadioButton