import useDictionary from '@/hooks/useDictionary';
import ContainerTextStory from '../ui/ContainerTextStory'
import SkeletonLines from '../ui/SkeletonLine';
import BodyStory from '../ui/BodyStory';
import ContainerVocabulary from '../ui/ContainerVocabulary';
import { exampleVocabulary } from '@/lib/constants';
import Dictionary from '@/components/shared/Dictionary'

type Props = {
  bodyStory: string[];
  isLoading: boolean;
  vocabulary: string;
}

export default function StoryFromApi({ bodyStory, isLoading, vocabulary }: Props) {

  const [dictionary, { setDictionary, addWord }] = useDictionary();

  let objectVocabulary = exampleVocabulary

  if (!isLoading) {
    try {
      objectVocabulary = JSON.parse(vocabulary)
    } catch (e) {
      objectVocabulary = exampleVocabulary
    }
  }

  return (
    <>
      <ContainerTextStory>
        {bodyStory[0]?.length === 0 &&
          <div className='flex flex-col'>
            <div className="self-center h-6 w-1/2 rounded-md animate-pulse bg-gray-800 mb-4"></div>
            <SkeletonLines lines={4} className="mt-0 mb-2" />
            <div className='w-full my-1.5'></div>
            <SkeletonLines lines={7} className="mt-0 mb-2" />
            <div className='w-full my-1.5'></div>
            <SkeletonLines lines={7} className="mt-0 mb-2" />
          </div>
        }
        {
          bodyStory && (bodyStory?.length > 0) &&
          <h2 className='bg-clip-text text-transparent bg-gradient-to-tr from-fuchsia-600 via-fuchsia-100 to-purple-400 text-2xl text-center uppercase font-bold md:mb-1'>
            {bodyStory[0]}
          </h2>
        }
        {
          bodyStory[1] &&
          <BodyStory
            text={bodyStory[1]}
            dictionary={dictionary}
            addWord={addWord}
          />
        }
      </ContainerTextStory>
      <section className="col-span-12 md:col-span-5 row-span-6 h-[19.5rem] border border-gray-800 rounded-lg p-4 overflow-y-auto scrollbar-dark bg-gray-950">
        {isLoading ? <SkeletonLines lines={10} /> : <ContainerVocabulary objectVocabulary={objectVocabulary} />}
      </section>
      <section className="col-span-12 md:col-span-5 row-span-6 h-[19.5rem] border border-gray-800 rounded-lg p-4 overflow-y-auto scrollbar-dark bg-gray-950">
        <Dictionary dictionary={dictionary} setDictionary={setDictionary} />
      </section>
    </>
  )
}
