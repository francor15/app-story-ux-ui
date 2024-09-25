import { OpenAIStream } from '@/utils'
import { stories } from './data'
import { OpenAIError } from '@/lib/errorHandling';
import { ERROS_CODES } from '@/lib/constants';

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
    try {
        const { model, apiKey, prompt } = (await req.json()) as any;
        const stream = await OpenAIStream(model, apiKey, prompt);
        return new Response(stream);
    } catch (error: any) {
        if (error instanceof OpenAIError) {
            const { msg, status } = ERROS_CODES[error.code !== null ? error.code : 'default']
            return Response.json({ error: msg }, { status: status });
        } else {
            return Response.json({ error: "An error occurred in the request." }, { status: 500 })
        }
    }
};

export async function GET() {
    await new Promise(resolve => setTimeout(resolve, 500));

    const id = (Math.floor((Math.random() * stories.length) + 1))
    const story = stories.find(story => story.id === id) as any;

    if (!story) return Response.json('Not Found', { status: 404 });

    return Response.json(story);
}