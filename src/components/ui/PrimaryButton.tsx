import React from 'react'
import { useToast } from "@/components/ui/use-toast"

type Props = {
    icon: React.JSX.Element;
    title: string;
}
export default function PrimaryButton({ icon, title }: Props) {
    const { toast } = useToast()

    return (
        <button
            onClick={() => {
                toast({
                    title: "Functionality not implemented",
                    description: "It will be implemented very soon",
                })
            }}
            className={`group h-9 md:px-4 text-slate-100 text-sm select-none rounded-md bg-gradient-to-b from-fuchsia-600 via-fuchsia-500 to-fuchsia-400 hover:bg-gradient-to-b hover:from-fuchsia-700 hover:via-fuchsia-600 hover:to-fuchsia-500 shadow-[-1px_-1px_5px_1px_theme('colors.fuchsia.400')_inset,0_0_0_1px_theme('colors.fuchsia.500')_inset,0_.5px_0_1.5px_theme('colors.fuchsia.400')_inset] disabled:opacity-[0.33]  disabled:shadow-none disabled:cursor-not-allowed`}>
            <span className="inline-flex gap-1 h-full items-center justify-center leading-none whitespace-nowrap group-active:[transform:translate3d(0,1px,0)] font-semibold group-disabled:[transform:translate3d(0,0,0)] px-3 md:px-4">
                {icon}<span className="order-1 hidden md:block"> {title}</span>
            </span>
        </button>
    )
}
