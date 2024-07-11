export type IMessage = {
    payload: Buffer | null;
    format: string | null;
    persistent: Boolean;
    content_type: string | null;
    reply_to: string | null;
    correlationId: string | null;
};

export const Marshall = (msg: any, format: string): IMessage => {
    let message: IMessage = {
        payload: null,
        format: null,
        persistent: false,
        content_type: null,
        reply_to: null,
        correlationId: null
    };

    switch (format) {
        case 'json':
            message.payload = Buffer.from(JSON.stringify(msg));
            message.format = 'json';
            break;
        case 'string':
            message.payload = Buffer.from(msg.toString());
            message.format = 'string';
            break;
        case 'number':
            message.payload = Buffer.from(msg.toString());
            message.format = 'number';
            break;
        default:
            break;
    }
    return message;
};

export const UnMarshall = ({payload, format}: IMessage): any => {
    if (payload === null) {
        return null;
    } else {
        switch (format) {
            case 'json':
                return JSON.parse(payload.toString());
            case 'string':
                return payload.toString();
            case 'number':
                return Number(payload);
            default:
                return null;
        }
    }
};