'use client'

import useStoryStore from '@/store/useStoryStore'
import { IconArrow } from '../../../public/Icons'

export default function NavButtons() {

    //If dont use data, the store will not be updated.
    const data = useStoryStore(state => state.data)

    const page = useStoryStore(state => state.page)
    const setPage = useStoryStore(state => state.setPage)
    const disabledBtnNext = useStoryStore(state => state.disabledBtnNext)();
    const isFirstPage = useStoryStore(state => state.isFirstPage)();

    const previusPage = (page: number) => () => (setPage(page - 1))
    const nextPage = (page: number) => () => (setPage(page + 1))

    return (
        <nav className="w-full mt-4 flex items-center">
            <div className="size-1.5 rounded-full bg-slate-500" />
            <div className="h-px bg-slate-500 w-5 md:w-9" />
            <button
                onClick={previusPage(page)}
                className={`mx-1 transition-all duration-300 border select-none border-gray-600 text-slate-400 w-24 md:w-36 rounded-md h-9 font-medium text-sm inline-flex items-center px-3 md:px-4 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-fuchsia-300/10 hover:text-fuchsia-400 disabled:pointer-events-none ${isFirstPage && 'hidden'}`}>
                <IconArrow /><span className="flex-1 mr-2 md:mr-3.5">Previous</span>
            </button>

            <div className="h-px bg-slate-500 flex-1" />
            <button
                onClick={nextPage(page)}
                disabled={disabledBtnNext}
                className="mx-1 border select-none border-fuchsia-400 bg-fuchsia-500 text-slate-100 w-24 md:w-36 rounded-md h-9 font-medium text-sm inline-flex items-center justify-center px-3 md:px-4 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-fuchsia-600 disabled:pointer-events-none">
                <span className="flex-1 ml-2 md:ml-3.5">Next</span>
                <IconArrow className="rotate-180 " />
            </button>
            <div className="h-px bg-slate-500 w-5 md:w-9" />
            <div className="size-1.5 rounded-full bg-slate-500" />
        </nav>
    )
}
