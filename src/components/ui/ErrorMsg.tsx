import { IconError } from "../../../public/Icons"

const Error = ({ msg }: {msg: string}) => {
    return (
        <div className="animate-fade-scale w-full py-1 px-2 rounded-md mt-1.5  bg-[#341824]">
            <div className="inline-flex items-center gap-2 size-full">
                <IconError className="flex-none text-red-500 text-xl" />
                <p className="leading-[15px] text-slate-100 text-sm font-light">{msg}
                </p>
            </div>
        </div>
    )
}

export default Error