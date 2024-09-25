import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { twMerge } from 'tailwind-merge'

type Props = {
    title?: string;
    icon?: React.JSX.Element;
    className?: string;
}
export default function SecondaryButton({ title, icon, className }: Props) {
    const { toast } = useToast()
    const isThereTitle = title ? "block" : "hidden"
    return (
        <button
            onClick={() => {
                toast({
                    title: "Functionality not implemented",
                    description: "It will be implemented very soon",
                })
            }}
            className={twMerge('inline-flex items-center justify-center gap-1 px-2 md:px-3 h-[38px] transition-all duration-300 border select-none border-gray-700 text-slate-400 rounded-md font-medium text-sm disabled:opacity-25 disabled:cursor-not-allowed hover:bg-fuchsia-300/5 hover:text-fuchsia-400 disabled:pointer-events-none', className)}>
            {icon} <span className={`hidden md:${isThereTitle}`}>{title}</span>
        </button>
    )
}
