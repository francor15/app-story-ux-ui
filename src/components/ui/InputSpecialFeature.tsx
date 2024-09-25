import { LIMIT_SPECIAL_FEATURES } from '@/lib/constants'
import React from 'react'
import { type FormDataCharacter } from '@/lib/types'

type InputSpecialFeatureProps = {
    feature: string;
    emoji: string;
    formData: FormDataCharacter;
    setFormData: React.Dispatch<React.SetStateAction<FormDataCharacter>>;
}

export default function InputSpecialFeature({ feature, emoji, setFormData, formData }: InputSpecialFeatureProps) {

    const isNotReachedLimit = formData.specialFeatures?.length < LIMIT_SPECIAL_FEATURES
    const isFeatureChecked = formData.specialFeatures?.includes(feature)
    const animationClass: string = (!isFeatureChecked || (formData.specialFeatures?.length > 0)) ? 'animate-fade-scale' : '';


    const handleCheckboxChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        const featureValue = target.value;

        if (isNotReachedLimit) {
            if (formData.specialFeatures.includes(featureValue)) {
                return setFormData({
                    ...formData,
                    specialFeatures: formData.specialFeatures.filter((item) => item !== featureValue)
                })
            }
            return setFormData({
                ...formData,
                specialFeatures: [...formData.specialFeatures, featureValue]
            })

        } else if (formData.specialFeatures.includes(featureValue)) {
            return setFormData({
                ...formData,
                specialFeatures: formData.specialFeatures.filter((item) => item !== featureValue)
            })
        }
    }

    return (
        <label
            className={`relative`}>
            <input
                type="checkbox"
                name='specialFeatures'
                id={`option-${feature}`}
                value={feature}
                checked={isFeatureChecked}
                onChange={handleCheckboxChange()}
                className="absolute opacity-10 w-0 h-0 peer"

            />
            <div
                className={`group flex py-1.5 px-1  flex-wrap flex-col text-sm md:flex-row h-full items-center justify-center transition-all duration-200 text-center bg-gray-900 border rounded  border-gray-900 peer-checked:shadow-[_0px_0px_1px_0px_theme('colors.fuchsia.400')] peer-checked:border-rose-200 peer-checked:text-slate-100 peer-checked:bg-fuchsia-500/10 
                ${(isFeatureChecked || isNotReachedLimit) ? "cursor-pointer text-slate-300  hover:text-slate-100 hover:border-rose-200  hover:shadow-[_0px_0px_5px_0px_theme('colors.fuchsia.400')]" : "cursor-not-allowed text-slate-500"}`}
            >
                <span className={`text-xs inline-flex items-center gap-0.5 sm:gap-1 ${animationClass} ${(isFeatureChecked || isNotReachedLimit) ? "group-active:[transform:translate3d(0,1px,0)]" : "grayscale-[83%] text-slate-500"}`}>
                    {emoji}<span className='tracking-tighter sm:tracking-normal'>{feature}</span>
                </span>
            </div>
        </label>
    )
}
