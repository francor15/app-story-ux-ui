import useDictionary from '@/hooks/useDictionary'
import ContainerTextStory from '../ui/ContainerTextStory'
import SkeletonLines from '../ui/SkeletonLine'
import BodyStory from '../ui/BodyStory'
import ContainerVocabulary from '../ui/ContainerVocabulary'
import { exampleVocabulary } from '@/lib/constants'
import Dictionary from '@/components/shared/Dictionary'


export default function RandomStory({ isLoading, randomStory }: { isLoading: boolean, randomStory: Record<string, string | string[]> }) {

  const [dictionary, { setDictionary, addWord }] = useDictionary();
  
  return (
    <>
      <ContainerTextStory>
        {isLoading ?
          <div className='flex flex-col'>
            <div className="self-center h-6 w-1/2 rounded-md animate-pulse bg-gray-800 mb-4" />
            <SkeletonLines lines={4} className="mt-0 mb-2" />
            <div className='w-full my-1.5' />
            <SkeletonLines lines={7} className="mt-0 mb-2" />
            <div className='w-full my-1.5' />
            <SkeletonLines lines={7} className="mt-0 mb-2" />
          </div>
          :
          <>
            <h2 className='bg-clip-text text-transparent bg-gradient-to-tr from-fuchsia-600 via-fuchsia-100 to-purple-400 text-2xl text-center uppercase font-bold md:mb-1 underline underline-offset-4'>
              {randomStory?.title}
            </h2>
            <BodyStory
              text={randomStory?.body as string}
              dictionary={dictionary}
              addWord={addWord}
            />
          </>
        }
      </ContainerTextStory>
      <section className="col-span-12 md:col-span-5 row-span-6 h-[19.5rem] border border-gray-800 rounded-lg overflow-y-auto scrollbar-dark bg-gray-950">
        {isLoading ? <SkeletonLines lines={10} /> : <ContainerVocabulary objectVocabulary={exampleVocabulary} />}
      </section>
      <section className="col-span-12 md:col-span-5 row-span-6 h-[19.5rem] border border-gray-800 rounded-lg p-4 overflow-y-auto scrollbar-dark bg-gray-950">
        <Dictionary dictionary={dictionary} setDictionary={setDictionary} />
      </section>
    </>
  )
}
