import { OpenAIError } from '@/lib/errorHandling';
import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (prompt: any) => {
    const example = {
        complex_words: ["mesmerizing", "enchanting", "illuminate"],
        synonyms: {
            mesmerizing: ["captivating", "hypnotic", "spellbinding"],
            enchanting: ["charming", "bewitching", "magical"],
            illuminate: ["reveal", "clarify", "enlighten"]
        }
    }
    const system = {
        role: 'system',
        content: `You are an expert in creating creative stories.`
    };
    const user = {
        role: 'user',
        content: `
        Generate a story taking into account all the characteristics of the following object:

        ${JSON.stringify(prompt)}

        Start by placing the title of the story, then add the & character (Ampersand character) and continue with the rest of the story. 
        After finishing the story, you put the & character again, and then you mention 3 complex words taken from the previously written story, 
        also 3 synonyms for each word, put these last data in JSON format. After the character "&" there should be no line break(in order to serve 
        as a separator), everything should be followed, without any spaces.
        Following the following example(It is mandatory to put "&" as a separator):

        StoryTitle&Paragraph of the story...another paragraph of the story...&${JSON.stringify(example)}

        `,
    }
    return { system, user }
}
export const OpenAIStream = async (model: string, apiKey: string, prompt: any) => {

    const { system, user } = createPrompt(prompt)

    const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey || ""}`,
        },
        method: 'POST',
        body: JSON.stringify({
            model,
            messages: [system, user],
            temperature: 0,
            stream: true,
        }),
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    if (res.status !== 200) {
        const result = await res.body?.getReader().read();
        const { error } = JSON.parse(decoder.decode(result?.value))

        throw new OpenAIError(error.message, error.type, error.param, error.code);
    }

    const stream = new ReadableStream({
        async start(controller) {
            const onParse = (event: ParsedEvent | ReconnectInterval) => {
                if (event.type === 'event') {
                    const data = event.data;

                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }

                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta.content;
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                    } catch (e) {
                        controller.error(e);
                    }
                }
            };

            const parser = createParser(onParse);

            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });
    return stream;
};