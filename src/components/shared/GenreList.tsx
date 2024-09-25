import { useEffect } from 'react'
import useStoryStore from '@/store/useStoryStore'
import useRandomItems from '@/hooks/useRandomItems'
import Container from '../ui/Container'
import InputRadioButton from '../ui/InputRadioButton'
import { genres } from '@/lib/data'
import { GENRE_PER_PAGE } from '@/lib/constants'
import { IconRandom } from '../../../public/Icons'

export default function GenreList() {

    const data = useStoryStore(state => state.data)
    const setPreviusData = useStoryStore(state => state.setPreviusData)

    const { items: listGenres, refreshItems } = useRandomItems({
        totalItems: genres,
        ITEMS_PER_PAGE: GENRE_PER_PAGE,
        chosen: [data.genre],
        key: 'genre'
    })
    if (!listGenres) return <p className='text-slate-300 bg-gray-900 text-5xl py-40 m-8 font-extrabold text-center rounded-xl'>Sorry! List genres not found</p>;

    useEffect(() => (setPreviusData("genre", listGenres)), [listGenres])

    return (
        <>
            <header className='max-w-sm mt-2 flex flex-col gap-1 items-center text-center mx-auto'>
                <h3 className="text-slate-100 text-2xl font-semibold uppercase">Select genre</h3>
                <p className="text-slate-500 text-sm leading-4 mt-1 md:mt-0 px-8 mb-2">To continue, select a genre. If you want to see other genres, click the button below.</p>
                <button
                    onClick={() => refreshItems()}
                    className="group bg-slate-100 text-black w-1/2 rounded-md h-8 font-medium text-sm inline-flex items-center justify-center gap-0.5"
                >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap group-active:[transform:translate3d(0,1px,0)]">
                        <IconRandom className="text-lg rotate-180" />Others genres
                    </span>
                </button>
            </header>
            <Container>
                {
                    listGenres.map(({ id, genre, emoji }) => (
                        <InputRadioButton
                            key={id}
                            item={genre as string}
                            emoji={emoji}
                            keyItem="genre"
                        />
                    ))
                }
            </Container>
        </>
    )
}
