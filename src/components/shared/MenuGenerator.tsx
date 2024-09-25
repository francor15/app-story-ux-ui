import Container from '../ui/Container'
import Error from '../ui/ErrorMsg'
import { type OpenAIModel } from '@/lib/types'
import { IconSparkles, IconRandom, IconLoading } from '../../../public/Icons'

type MenuGeneratorProps = {
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    setModel: React.Dispatch<React.SetStateAction<OpenAIModel>>;
    callOpenAIAPI: () => Promise<void>;
    handleRandomStory: () => Promise<void>;
    error: string;
    apiKey: string;
    isLoading: boolean;
}

export default function MenuGenerator({
    setApiKey,
    setModel,
    callOpenAIAPI,
    handleRandomStory,
    error,
    apiKey,
    isLoading
}: MenuGeneratorProps) {

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const model = e.target.id as OpenAIModel;
        setModel(model);
    }

    return (
        <Container className='md:grid-cols-1 max-w-md'>
            <div className='max-w-md mt-4 mb-6 flex flex-col gap-1 items-center text-center col-span-12'>
                <h3 className="text-slate-100 text-2xl font-semibold uppercase leading-6 mb-2">Everything ready to generate your story</h3>
                <p className="text-slate-500 text-sm leading-4 px-8 my-1.5">To generate your story you have to enter your openai API key and select you GPT model.</p>
                <nav className="flex items-center justify-center gap-1 rounded-lg p-0.5 w-1/2 text-sm border border-slate-500 text-slate-100">
                    <div className='flex-1'>
                        <input type="radio" name="option" id='gpt-4o-mini' className="peer hidden" defaultChecked onChange={handlerChange} />
                        <label htmlFor="gpt-4o-mini" className="py-1 block cursor-pointer select-none rounded-md border border-transparent peer-checked:bg-gray-900 peer-checked:text-slate-100 peer-checked:border-gray-700 transition-all duration-300">GPT-4-mini</label>
                    </div>
                    <div className='flex-1'>
                        <input type="radio" name="option" id='gpt-4-turbo' className="peer hidden" onChange={handlerChange} />
                        <label htmlFor="gpt-4-turbo" className="py-1 block cursor-pointer select-none rounded-md border border-transparent peer-checked:bg-gray-900 peer-checked:text-slate-100 peer-checked:border-gray-700 transition-all duration-300">GPT-4-turbo</label>
                    </div>
                </nav>
                {error && <Error msg={error} />}
                <section className="text-slate-100 w-full">
                    <div className="mb-4">
                        <div className="inline-flex w-full flex-col items-start gap-1 mb-4">
                            <label className="font-medium text-sm text-slate-200 ml-0.5" htmlFor="apiKey">API Key </label>
                            <div className="relative w-full">
                                <input
                                    className={`w-full text-slate-200 bg-gray-900 rounded-lg border border-slate-700  text-sm placeholder-slate-500 outline-none transition-all duration-300 ease-out focus:ring-1 focus:ring-fuchsia-300 focus:border-rose-200 focus:bg-transparent focus:text-slate-300 focus:outline-none h-[38px] px-4`}
                                    type="password"
                                    name='apiKey'
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter your api key"
                                />
                            </div>
                            <p className="text-xs leading-none text-slate-500 ml-0.5">
                                You can find your Secret API key on the  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-all duration-200 opacity-70 hover:opacity-100 text-fuchsia-400">API key page</a>.
                            </p>
                        </div>
                        <button
                            disabled={!!!apiKey || isLoading}
                            className="group w-64 h-10 rounded-lg border border-purple-300 bg-gradient-to-br from-rose-400 from-10% via-fuchsia-500 via-55% to-purple-400 to-95% disabled:opacity-30 hover:from-rose-500 hover:via-fuchsia-600 hover:to-purple-500 disabled:pointer-events-none"
                            onClick={() => callOpenAIAPI()}
                        >
                            <span className="inline-flex gap-1 items-center justify-center size-full font-bold">
                                {isLoading ?
                                    <>
                                        <IconLoading className="animate-spin text-lg" />Generate...
                                    </>
                                    :
                                    <>
                                        <IconSparkles className="text-xl animate-pulse group-disabled:animate-none" />
                                        Generate Story
                                    </>
                                }
                            </span>
                        </button>
                    </div>
                    <div className="inline-flex items-center w-full">
                        <div className="flex-1 mr-1 h-px bg-slate-500"></div>
                        <span className="text-slate-300 mx-2 text-sm">Or</span>
                        <div className="flex-1 mr-1 h-px bg-slate-500 "></div>
                    </div>
                    <p className="text-slate-500 text-sm leading-4 px-8 my-2.5">If you don't have an API key, you can generate a simulation of a random story.</p>
                    <button
                        onClick={() => handleRandomStory()}
                        className="group bg-slate-100 text-black w-1/2 rounded-md h-8 font-medium text-sm inline-flex items-center justify-center gap-0.5"
                    >
                        <span className="inline-flex items-center gap-2 whitespace-nowrap group-active:[transform:translate3d(0,1px,0)]">
                            <IconRandom className="text-lg rotate-180" />Random Story
                        </span>
                    </button>
                </section>
            </div>

        </Container>
    )
}
