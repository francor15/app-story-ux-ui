export class OpenAIError extends Error {
    type: string;
    param: string | null;
    code: string | null;

    constructor(message: string, type: string, param: string | null, code: string | null) {
        super(message);
        this.type = type;
        this.param = param;
        this.code = code;
    }
}
