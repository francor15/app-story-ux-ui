import { clsx } from "clsx"

const SkeletonLines = ({ lines, className }: { lines: number, className?: string }) => {
    return Array(lines).fill(0).map((_, index) => (
        <div key={index} className={clsx("h-4 rounded-md animate-pulse bg-gray-800 my-2", className)}></div>
    ))
}

export default SkeletonLines