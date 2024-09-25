
import { useEffect } from 'react'
import { IconRandom } from '../../../public/Icons'
import { themes } from '@/lib/data'
import { THEME_PER_PAGE } from '@/lib/constants'
import useStoryStore from '@/store/useStoryStore'
import InputRadioButton from '../ui/InputRadioButton'
import Container from '../ui/Container'
import useRandomItems from '@/hooks/useRandomItems'

const ThemeList = () => {

    const { data, setPreviusData } = useStoryStore()
    const { items: listThemes, refreshItems } = useRandomItems({
        totalItems: themes,
        ITEMS_PER_PAGE: THEME_PER_PAGE,
        chosen: [data.theme],
        key: 'theme'
    })

    useEffect(() => (setPreviusData("theme", listThemes)), [listThemes])

    if (!listThemes) return <p className='text-slate-300 bg-gray-900 text-5xl py-40 m-8 font-extrabold text-center rounded-xl'>Sorry! List themes not found</p>;

    return (
        <>
            <header className='max-w-sm mt-2 flex flex-col gap-1 items-center text-center mx-auto'>
                <h3 className="text-slate-100 text-2xl font-semibold uppercase">Select theme</h3>
                <p className="text-slate-500 text-sm leading-4 mt-1 md:mt-0 px-8 mb-2">To continue, select a theme. If you want to see other themes, click the button below.</p>
                <button
                    onClick={() => refreshItems()}
                    className="group bg-slate-100 text-black w-1/2 rounded-md h-8 font-medium text-sm inline-flex items-center justify-center gap-0.5"
                >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap group-active:[transform:translate3d(0,1px,0)]">
                        <IconRandom className="text-lg rotate-180" />Others themes
                    </span>
                </button>
            </header>
            <Container>
                {
                    listThemes.map(({ id, theme, emoji }) => (
                        <InputRadioButton
                            key={id}
                            item={theme as string}
                            emoji={emoji}
                            keyItem="theme"
                        />
                    ))
                }
            </Container>
        </>
    )
}

export default ThemeList