export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
} as const;

export const RESPONSE_MESSAGES = {
    SUCCESS: 'Success',
    CREATED: 'Created',
    NO_CONTENT: 'No Content',
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
} as const;

export const COMMON_API_RESPONSES = {
    SUCCESS: {
        STATUS: HTTP_STATUS.OK,
        MESSAGE: RESPONSE_MESSAGES.SUCCESS,
    },
    CREATED: {
        STATUS: HTTP_STATUS.CREATED,
        MESSAGE: RESPONSE_MESSAGES.CREATED,
    },
    NO_CONTENT: {
        STATUS: HTTP_STATUS.NO_CONTENT,
        MESSAGE: RESPONSE_MESSAGES.NO_CONTENT,
    },
    BAD_REQUEST: {
        STATUS: HTTP_STATUS.BAD_REQUEST,
        MESSAGE: RESPONSE_MESSAGES.BAD_REQUEST,
    },
    UNAUTHORIZED: {
        STATUS: HTTP_STATUS.UNAUTHORIZED,
        MESSAGE: RESPONSE_MESSAGES.UNAUTHORIZED,
    },
    FORBIDDEN: {
        STATUS: HTTP_STATUS.FORBIDDEN,
        MESSAGE: RESPONSE_MESSAGES.FORBIDDEN,
    },
    NOT_FOUND: {
        STATUS: HTTP_STATUS.NOT_FOUND,
        MESSAGE: RESPONSE_MESSAGES.NOT_FOUND,
    },
    INTERNAL_SERVER_ERROR: {
        STATUS: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGE: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
    },
} as const;