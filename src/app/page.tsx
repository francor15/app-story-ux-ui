import Link from 'next/link';
import Stepper from "@/components/shared/Stepper";
import { IconSparkles, IconArrow2, IconStar, IconArrow3 } from "../../public/Icons";
import MultiStepStory from "@/components/shared/MultiStep";
import NavButtons from "@/components/shared/NavButtons";

export default function Home() {

  return (
    <main className="relative flex flex-col md:items-center justify-center mt-6 mb-10 mx-2 md:mx-8 xl:mx-auto overflow-hidden">
      <Link
        href="#"
        className="group rounded-full h-7 m-auto items-center bg-gradient-to-tl from-[#64D5FF] via-[#FEB09A] to-[#FE5391] p-px"
      >
        <div className="p-px text-slate-200 bg-[#030712] group-hover:bg-slate-900 transition-colors duration-100  size-full rounded-full px-4 md:px-6 inline-flex gap-1 items-center justify-center">
          <p className="font-light text-sm group-hover:text-slate-50">
            See more projects <span className='sr-only'>I've created</span>
          </p>
          <IconArrow2 className="group-hover:translate-x-3 transition-all duration-200" />
        </div>
      </Link>
      <header className="relative mb-2">
        <h1 className="text-6xl text-wrap text-center tracking-tight py-3 text-slate-50 -z-10">
          Create Your own Personalized
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#64D5FF] via-[#FEB09A] to-rose-400 from-50% via-70% to-100%">
            Story with Artificial Intelligence
          </span>
          <IconSparkles className="absolute top-16 right-2 md:-right-14 text-3xl md:text-5xl md:rotate-180 text-[#64D5FF] animate-pulse" />
        </h1>
      </header>
      <p className="text-slate-400 max-w-2xl m-auto text-center mb-5 font-light">Start creating a <span className='font-semibold text-slate-300'>story</span> with artificial intelligence by choosing a <span className='font-semibold text-slate-100'>genre</span>, a <span className='font-semibold text-slate-100'>theme</span> and up to 5 different <span className='font-semibold text-slate-100'>characters</span> which you can <span className='font-semibold text-slate-100'>personalize</span>, such as adding their <span className='font-semibold text-slate-100'>name, role and special abilities</span>.</p>
      <Link
        href="#"
        className="relative group mb-10 mx-4 md:mx-0" 
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64D5FF] via-[#FEB09A] to-rose-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt " />
        <div className="relative inline-flex items-center justify-center w-full px-6 py-3 gap-3 bg-gray-200 rounded-lg">
          <IconStar className='stroke-yellow-700 text-yellow-500 text-xl' />
          <p className="text-slate-950 font-medium">Go to repository</p>
          <IconArrow3 className='text-xl rotate-180 text-slate-800' />
        </div>
      </Link>

      <section className='relative w-full max-w-6xl rounded-lg mt-2 border border-slate-500 backdrop-blur-3xl p-4 bg-gray-950'>
        <div className="inline-flex w-full justify-center items-center mb-8">
          <div className="size-1.5 rounded-full bg-slate-500" />
          <div className="h-px bg-slate-500 flex-1" />
          <div className="h-px bg-slate-500 w-6" />
          <Stepper />
          <div className="h-px bg-slate-500 w-6" />
          <div className="h-px bg-slate-500 flex-1" />
          <div className="size-1.5 rounded-full bg-slate-500" />
        </div>
        <MultiStepStory />
        <NavButtons />
      </section>
    </main>
  );
}
