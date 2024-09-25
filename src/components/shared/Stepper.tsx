'use client'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import useStoryStore from '@/store/useStoryStore'
import { TITLE_PAGES } from '@/lib/constants'
import { IconCheck2 } from '../../../public/Icons'

export default function Stepper() {

    const data = useStoryStore(state => state.data)
    const page = useStoryStore(state => state.page)
    const totalPages = useStoryStore(state => state.totalPages)

    return (
        <>
            {
                Object.entries(TITLE_PAGES).map(([key, value]) => {
                    const dataLength = data[value.title].length
                    const currentKey = Number(key)
                    const isPending = (page < currentKey)
                    const isCompleted = (page >= currentKey) && (dataLength > 0)
                    const isInProgress = (page === currentKey) && (dataLength === 0)
                    const isLast = (currentKey === totalPages - 1)
                    const titleStep = value.title.at(0)?.toUpperCase() + value?.title.slice(1)

                    return (
                        <div className='flex items-center' key={key}>
                            <div className={clsx("relative mx-2 size-6 rounded-full flex items-center justify-center font-bold ring-1 ring-offset-2 ring-offset-[#0B0D19]",
                                {
                                    "bg-slate-100 ring-white/90 text-[#0B0D19]": isInProgress,
                                    "bg-fuchsia-400 ring-fuchsia-400/90 text-slate-100": isCompleted,
                                    "bg-slate-500 text-[#0B0D19] ring-slate-500": isPending
                                }
                            )}>
                                {(dataLength > 0) ? <IconCheck2 className='text-xl animate-scale' /> : key}
                                <span className={`absolute -bottom-6 w-20 inline-flex items-center justify-center text-slate-500 text-[11px] md:text-xs font-light uppercase ${page === currentKey && "text-white/90 font-normal"}`}
                                >
                                    {titleStep}
                                </span>
                            </div>
                            {!isLast &&
                                <div className="h-px w-7 md:w-20 bg-slate-500">
                                    <motion.div
                                        className={`h-full ${isCompleted && 'bg-fuchsia-400'}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: isCompleted ? "100%" : 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>
                            }
                        </div >
                    )
                })
            }
        </>
    )
}
