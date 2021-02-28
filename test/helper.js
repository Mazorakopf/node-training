export const mockRequest = () => {
    return {
        setModel: function (data) {
            this.params = { model: data };
        },
        setBody: function (data) {
            this.body = data;
        },
        setQuery: function (data) {
            this.query = data;
        }
    };
};

export const mockResponse = () => {
    return {
        json: jest.fn().mockReturnThis(),
        sendStatus: jest.fn().mockReturnThis(),
        location: jest.fn().mockReturnThis()
    };
};

export const mockNext = () => {
    return jest.fn();
};
