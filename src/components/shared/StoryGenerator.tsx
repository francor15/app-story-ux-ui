import { useState } from 'react'
import useStoryStore from '@/store/useStoryStore'
import MenuGenerator from './MenuGenerator';
import NavbarStory from './NavbarStory';
import StoryFromApi from './StoryFromApi';
import RandomStory from './RandomStory';
import { type OpenAIModel, Vocabulary } from '@/lib/types'

export default function StoryGenerator() {

    const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
    const [apiKey, setApiKey] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [displayMenu, setDisplayMenu] = useState<boolean>(true);
    const [isRandomStory, setIsRandomStory] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [messages, setMessages] = useState<string>('');
    const [vocabulary, setVocabulary] = useState<string>('');
    const [randomStory, setRandomStory] = useState<Record<string, string | string[]>>({});

    const { data } = useStoryStore()

    const prompt: Record<string, string | string[]> = {
        genre: data.genre,
        theme: data.theme,
        characters: data.characters as any,
    }

    const callOpenAIAPI = async () => {

        setIsLoading(true);
        const controller = new AbortController();
        const body: Record<string, any> = {
            model,
            apiKey,
            prompt,
        }
        try {
            setMessages('');
            const response = await fetch('/api/story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
                body: JSON.stringify(body),
            });
            if (response.ok && response.body) {

                setDisplayMenu(false);

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                const loopRunner = true;

                while (loopRunner) {
                    const { value, done } = await reader.read();
                    if (done) {
                        break;
                    }
                    const decodedChunk = decoder.decode(value, { stream: true });
                    setMessages((prevMesagge) => {
                        const newMessage = prevMesagge + decodedChunk;
                        const getVocabulary = newMessage?.split('&')[2];
                        if (getVocabulary) {
                            setVocabulary(getVocabulary)
                        }
                        return newMessage;
                    });
                }
            } else {
                const data = await response.json();
                setError(data.error || "An error occurred with OpenAI. Try again.");
                setTimeout(() => (setError('')), 5000);
            }

        } catch (err) {
            setError("An error occurred with OpenAI. Try again.");
            setTimeout(() => (setError('')), 5000);
        } finally {
            setIsLoading(false);
        }
    }

    const handleRandomStory = async () => {
        setIsLoading(true);
        setDisplayMenu(false);
        setIsRandomStory(true);

        try {
            const res = await fetch('/api/story');
            if (!res) {
                setError("An error occurred with OpenAI. Try again.");
                setTimeout(() => (setError('')), 5000);
            }
            const data: Record<string, string | string[]> = await res.json();
            setRandomStory(data)
        } catch (error) {
            setError("An error occurred with OpenAI. Try again.");
            setTimeout(() => (setError('')), 5000);
        } finally {
            setIsLoading(false);
        }
    }

    const arrayStory = messages.split('&');

    return (
        <>
            {displayMenu ?
                <MenuGenerator
                    setApiKey={setApiKey}
                    setModel={setModel}
                    callOpenAIAPI={callOpenAIAPI}
                    handleRandomStory={handleRandomStory}
                    error={error}
                    apiKey={apiKey}
                    isLoading={isLoading}
                />
                :
                <section className="border rounded-xl border-gray-800 mt-3 md:mt-12 md:mx-3.5 bg-gray-500/10">
                    <NavbarStory />
                    <section className="p-2.5 md:p-4 w-full h-full grid grid-cols-12 gap-4">
                        {isRandomStory ?
                            <RandomStory
                                isLoading={isLoading}
                                randomStory={randomStory}
                            />
                            :
                            <StoryFromApi
                                bodyStory={arrayStory}
                                isLoading={isLoading}
                                vocabulary={vocabulary as string}
                            />
                        }
                    </section>
                </section>
            }


        </>

    )
}
