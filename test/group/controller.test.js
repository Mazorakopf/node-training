import * as GroupController from '../../src/group/controller';
import { mockRequest, mockResponse, mockNext } from '../helper';
import { mapOrNull, findByQuery, create, update, remove } from '../../src/group/service';

jest.mock('../../src/group/service');

let request;
let response;
let next;

beforeEach(() => {
    request = mockRequest();
    response = mockResponse();
    next = mockNext();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('GET /groups', () => {
    test('should return Groups by query ? userId=4', async () => {
        //Given
        findByQuery.mockReturnValue(Promise.resolve([{ id: 4, name: 'test' }]));
        request.setQuery({ userId: 4 });
        //When
        await GroupController.findByQuery(request, response, () => {});
        //Then
        expect(findByQuery).toBeCalledWith({ userId: 4 });
        expect(response.json).toBeCalledWith([{ id: 4, name: 'test' }]);
    });

    test('should return next with error', async () => {
        //Given
        findByQuery.mockImplementation(() => {
            throw new Error();
        });
        //When
        await GroupController.findByQuery(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('GET /groups/{id}', () => {
    test('should return Group object without sensitive data', async () => {
        //Given
        mapOrNull.mockReturnValue({ id: 4, name: 'test' });
        request.setModel({ id: 4, name: 'test', permissions: [1, 2] });
        //When
        await GroupController.findById(request, response, () => {});
        //Then
        expect(response.json).toBeCalledWith({ id: 4, name: 'test' });
    });

    test('should return next with error', async () => {
        //Given
        request.setModel({});
        mapOrNull.mockImplementation(() => {
            throw new Error();
        });
        //When
        await GroupController.findById(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('POST /groups', () => {
    test('should return 201 and the location of the created object', async () => {
        //Given
        create.mockReturnValue(Promise.resolve(4));
        request.setBody({ name: 'test' });
        //When
        await GroupController.create(request, response, () => {});
        //Then
        expect(create).toBeCalledWith({ name: 'test' });
        expect(response.location).toBeCalledWith('/groups/4');
        expect(response.sendStatus).toBeCalledWith(201);
    });

    test('should return next with error', async () => {
        //Given
        create.mockImplementation(() => {
            throw new Error();
        });
        //When
        await GroupController.create(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('UPDATE /groups/{id}', () => {
    test('should return 204', async () => {
        //Given
        request.setModel({ id: 4, name: 'test' });
        request.setBody({ name: 'TEST' });
        //When
        await GroupController.update(request, response, () => {});
        //Then
        expect(update).toBeCalledWith({ id: 4, name: 'test' }, { name: 'TEST' });
        expect(response.sendStatus).toBeCalledWith(204);
    });

    test('should return next with error', async () => {
        //Given
        request.setModel({});
        update.mockImplementation(() => {
            throw new Error();
        });
        //When
        await GroupController.update(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('DELETE /groups/{id}', () => {
    test('should return 204', async () => {
        //Given
        request.setModel({ id: 4, name: 'test' });
        //When
        await GroupController.remove(request, response, () => {});
        //Then
        expect(remove).toBeCalledWith({ id: 4, name: 'test' });
        expect(response.sendStatus).toBeCalledWith(204);
    });

    test('should return next with error', async () => {
        //Given
        request.setModel({});
        remove.mockImplementation(() => {
            throw new Error();
        });
        //When
        await GroupController.remove(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});
