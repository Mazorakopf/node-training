export class NotSupportedQueryParamsError extends Error {
    constructor(param) {
        super(`These query parameters are not supported: ${param}`);
    }
}

export class NotSupportedQueryValueError extends Error {
    constructor(param, value, supportedValues) {
        super(`These query value '${value}' are not supported by '${param}' parameters. Supported values: ${supportedValues}`);
    }
}

export class UnauthorizedErrorResponse extends Error {
    constructor(message = 'Request is unauthorized. Invalid credentials.') {
        super(message);
    }
}

export class ForbiddenErrorResponse extends Error {
    constructor(message = 'Request is forbidden. Not authorized to access the requested resource.') {
        super(message);
    }
}
