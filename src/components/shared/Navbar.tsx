import { IconX, IconGithub } from "../../../public/Icons"

export default function Navbar() {
    return (
        <section className="h-10 bg-gradient-to-b backdrop-blur-2xl rounded-xl border border-gray-800 bg-gray-900/30 from-inherit max-w-xl mx-4 md:mx-auto mt-4 md:mt-8">
            <nav className="h-full flex items-center justify-between pl-1 pr-4 gap-2 md:gap-4 text-slate-400">
                <p className="inline-flex items-center gap-1 rounded-lg py-1 px-4 text-sm  font-light">
                    Created by:
                    <span className="text-slate-50 font-medium">Franco Rodriguez</span>
                </p>
                <div className="inline-flex items-center gap-4">
                    <a href="https://x.com" target="_blank" className="inline-flex items-center hover:text-slate-200 transition-all duration-200"><IconX /></a>
                    <a href="https://github.com/francor15" target="_blank" className="inline-flex items-center hover:text-slate-200 transition-all duration-200 text-lg"><IconGithub /></a>
                </div>
            </nav>
        </section>
    )
}