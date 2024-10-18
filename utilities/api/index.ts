import { NextApiRequest } from "next";

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const supportedMethod = (accepts: MethodType[], method?: string) => {
    const isValid = accepts.includes(method as MethodType);
    return {
        status: isValid,
        message: isValid ? null : `Sorry, this api only support ${accepts.join(', ')} method`
    };
};

export const getBearerToken = (req: NextApiRequest) => {
    const bearerToken = req.headers.authorization?.split(' ')[1];
    if (!bearerToken || bearerToken === 'null') return null;
    return bearerToken;
};