import React from 'react';
import Corner from './Corner'
import { twMerge } from 'tailwind-merge'
type ContainerProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={twMerge('relative container grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5 px-2 py-4 md:px-4 md:py-5 border border-slate-900 bg-slate-900/30 max-w-4xl mx-auto ', className)}>
            <Corner className="absolute -top-[3px] -left-[3px]" />
            <Corner className="absolute -top-[3px] -right-[3px] rotate-90" />
            <Corner className="absolute -bottom-[3px] -right-[3px] rotate-180" />
            <Corner className="absolute -bottom-[3px] -left-[3px] -rotate-90" />
            {children}
        </div>
    )
}
