import React, { useEffect, useState } from 'react'
import { IconRandom } from '../../../public/Icons';
import { specialFeatures } from '@/lib/data';
import { ROL_TYPE, SPECIAL_FEATURES_PER_PAGE, LIMIT_SPECIAL_FEATURES } from '@/lib/constants';
import useRandomItems from '@/hooks/useRandomItems';
import useStoryStore from '@/store/useStoryStore';
import { type CharacterProperties, FormDataCharacter } from '@/lib/types'
import * as Dialog from '@radix-ui/react-dialog'
import InputSpecialFeature from './InputSpecialFeature';

type CharacterCustomizeProps = {
    character: CharacterProperties;
    afterSave: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CharacterCustomize({ character, afterSave }: CharacterCustomizeProps) {

    const { editCharacter, removeCharacterOption, data, setPreviusData } = useStoryStore()

    const findCharacter = data.characters.find(e => e.type === character.type)

    const KEY_PREVIUS_DATA = `feature_${character.type}`

    const [formData, setFormData] = useState<FormDataCharacter>({
        name: findCharacter?.name || "",
        rol: findCharacter?.rol || "",
        specialFeatures: findCharacter?.specialFeatures || []
    });
    const { items: listSpecialFeatures, refreshItems } = useRandomItems({
        totalItems: specialFeatures,
        ITEMS_PER_PAGE: SPECIAL_FEATURES_PER_PAGE,
        chosen: formData.specialFeatures,
        key: 'feature',
        keyPreviusData: KEY_PREVIUS_DATA
    })

    useEffect(() => (setPreviusData(KEY_PREVIUS_DATA, listSpecialFeatures)), [listSpecialFeatures])

    const isLimitReached = formData.specialFeatures.length === LIMIT_SPECIAL_FEATURES

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const { value, name } = target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function saveConfigurations() {
        if (formData.specialFeatures.length === 0) {
            removeCharacterOption(character.type, "specialFeatures")
        }
        if (formData.name === "") {
            removeCharacterOption(character.type, "name")
        }
        const nonEmptyData: Record<string, string | string[]> = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => {
                if (key === "specialFeatures" && Array.isArray(value)) {
                    return value.length > 0;
                }
                return value !== "";
            })
        );
        editCharacter(character.type, nonEmptyData)
        afterSave(prev => !prev);
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="inline-flex w-full max-w-sm flex-col items-start gap-1 z-20">
                <label className="font-medium text-sm text-slate-200 " htmlFor="name">Name <span className='text-slate-500 text-xs'>(Optional)</span></label>
                <div className="relative w-full">
                    <input
                        className={`w-full text-slate-200 bg-gray-900 rounded-lg border border-slate-700  text-sm placeholder-slate-500 outline-none transition-all duration-300 ease-out focus:ring-1 focus:ring-fuchsia-300 focus:border-rose-200 focus:bg-transparent focus:text-slate-300 focus:outline-none h-[38px] px-4`}
                        id="name"
                        name='name'
                        maxLength={12}
                        onChange={handleInputChange}
                        defaultValue={formData.name}
                        placeholder="e.g. Zoroak"
                    />
                </div>
                <p className="max-w-full text-xs leading-none text-slate-500 ">Enter a name for your character.</p>
            </div>
            {/* ROL */}
            <div className="inline-flex w-auto max-w-sm flex-col items-start gap-1 z-20">
                <label className="font-medium text-sm text-slate-200" >Rol <span className='text-slate-500 text-xs'>(Optional)</span></label>
                <div className='w-full leading-none whitespace-nowrap bg-gray-900 p-1 rounded-lg grid grid-cols-3'>
                    {
                        ROL_TYPE.map((rol, id) => (
                            <label
                                className={`relative `} key={id}>
                                <input
                                    type="radio"
                                    id={`option-${id}`}
                                    name="rol"
                                    value={rol}
                                    defaultChecked={formData.rol === rol}
                                    onChange={handleInputChange}
                                    className="absolute opacity-10 w-0 h-0 peer "
                                />
                                <div
                                    className={`group transition-all duration-200 py-1 text-xs flex items-center justify-center rounded-md cursor-pointer border border-transparent text-slate-500  peer-checked:shadow-[_0px_0px_2px_0px_theme('colors.fuchsia.400')] peer-checked:border-rose-200 peer-checked:text-slate-100 peer-checked:bg-[#190D28] hover:text-slate-100 hover:border-rose-200  hover:shadow-[_0px_0px_5px_0px_theme('colors.fuchsia.400')] hover:mx-0.5`}
                                >
                                    <h5 className="group-active:[transform:translate3d(0,1px,0)] pb-0.5">{rol}</h5>
                                </div>
                            </label>
                        ))
                    }

                </div>
                <p className="max-w-full text-xs leading-none text-slate-500 ">Selected a rol for your character.</p>
            </div>
            {/* HABILIDADES */}
            <div className="inline-flex text-slate-200 w-auto max-w-sm flex-col items-start gap-2 stroke-black transition-colors duration-300 ease-out focus-within:stroke-blue-700 z-20">
                <div className="w-full flex justify-between items-end mb-1">
                    <p className="font-medium text-sm">Special features <span className='text-slate-500 text-xs'>(Optional)</span></p>

                    <button
                        onClick={() => refreshItems()}
                        disabled={isLimitReached}
                        className="group select-none bg-slate-100 text-black rounded-md h-7 px-2 font-medium text-xs inline-flex items-center justify-center gap-0.5 disabled:pointer-events-none disabled:opacity-60"
                    >
                        <span className="inline-flex items-center gap-1 whitespace-nowrap group-active:[transform:translate3d(0,1px,0)]">
                            <IconRandom className="rotate-180 text-lg mt-0.5" />Others features
                        </span>
                    </button>
                </div>
                <div className='w-full leading-none whitespace-nowrap  grid grid-cols-2 gap-1.5'>
                    {
                        listSpecialFeatures.map(({ id, feature, emoji }) => (
                            <InputSpecialFeature
                                key={id}
                                feature={feature as string}
                                emoji={emoji}
                                formData={formData}
                                setFormData={setFormData}
                            />
                        ))
                    }
                </div>
                <p className='inline-flex items-center text-xs max-w-full text-slate-500 w-full pl-1'>
                    <span className='text-slate-300 font-bold'>{formData.specialFeatures.length}&nbsp;</span>of&nbsp;{LIMIT_SPECIAL_FEATURES + " "}
                    features selected.
                </p>
            </div>
            {/* BUTTONS */}
            <div className="flex items-center justify-end gap-3 mt-4">
                <Dialog.Close className="text-sm text-slate-400 font-medium px-2 py-1.5 hover:text-slate-300 transition-all duration-200">
                    Cancel
                </Dialog.Close>
                <button
                    onClick={saveConfigurations}
                    className="text-sm font-medium text-slate-100 border border-fuchsia-400 bg-fuchsia-500 hover:bg-fuchsia-600 px-5 py-1.5 rounded-md transition-all duration-200">Save Changes</button>
            </div>
        </div>
    )
}
