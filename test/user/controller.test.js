import * as UserController from '../../src/user/controller';
import { mockRequest, mockResponse, mockNext } from '../helper';
import { mapOrNull, findByQuery, create, update, remove } from '../../src/user/service';

jest.mock('../../src/user/service');

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

describe('GET /users', () => {
    test('should return Users by query ?groupId=3', async () => {
        //Given
        findByQuery.mockReturnValue(Promise.resolve([{ id: 3, login: 'test@test.ru', age: 23 }]));
        request.setQuery({ groupId: 3 });
        //When
        await UserController.findByQuery(request, response, next);
        //Then
        expect(findByQuery).toBeCalledWith({ groupId: 3 });
        expect(response.json).toBeCalledWith([{ id: 3, login: 'test@test.ru', age: 23 }]);
    });

    test('should return next with error', async () => {
        //Given
        findByQuery.mockImplementation(() => {
            throw new Error();
        });
        //When
        await UserController.findByQuery(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('GET /users/{id}', () => {
    test('should return User object without sensitive data', async () => {
        //Given
        mapOrNull.mockReturnValue({ id: 3, login: 'test@test.ru', age: 23 });
        request.setModel({ id: 3, login: 'test@test.ru', age: 23, password: 'test' });
        //When
        await UserController.findById(request, response, next);
        //Then
        expect(response.json).toBeCalledWith({ id: 3, login: 'test@test.ru', age: 23 });
    });

    test('should return next with error', async () => {
        //Given
        request.setModel({});
        mapOrNull.mockImplementation(() => {
            throw new Error();
        });
        //When
        await UserController.findById(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('POST /users', () => {
    test('should return 201 and the location of the created object', async () => {
        //Given
        create.mockReturnValue(Promise.resolve(3));
        request.setBody({ login: 'test@test.ru', age: 23, password: 'test' });
        //When
        await UserController.create(request, response, () => {});
        //Then
        expect(create).toBeCalledWith({ login: 'test@test.ru', age: 23, password: 'test' });
        expect(response.location).toBeCalledWith('/users/3');
        expect(response.sendStatus).toBeCalledWith(201);
    });

    test('should return next with error', async () => {
        //Given
        create.mockImplementation(() => {
            throw new Error();
        });
        //When
        await UserController.create(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('UPDATE /users/{id}', () => {
    test('should return 204', async () => {
        //Given
        request.setModel({ id: 3, login: 'test@test.ru', age: 23, password: 'test' });
        request.setBody({ login: 'new@test.ru', age: 45, password: 'encrypted-test' });
        //When
        await UserController.update(request, response, () => {});
        //Then
        expect(update).toBeCalledWith(
            { id: 3, login: 'test@test.ru', age: 23, password: 'test' },
            { login: 'new@test.ru', age: 45, password: 'encrypted-test' }
        );
        expect(response.sendStatus).toBeCalledWith(204);
    });

    test('should return next with error', async () => {
        //Given
        request.setModel({});
        update.mockImplementation(() => {
            throw new Error();
        });
        //When
        await UserController.update(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});

describe('DELETE /users/{id}', () => {
    test('should return 204', async () => {
        //Given
        request.setModel({ id: 3, login: 'test@test.ru', age: 23, password: 'test' });
        //When
        await UserController.remove(request, response, () => {});
        //Then
        expect(remove).toBeCalledWith({ id: 3, login: 'test@test.ru', age: 23, password: 'test' });
        expect(response.sendStatus).toBeCalledWith(204);
    });

    test('should return next with error', async () => {
        //Given
        request.setModel({});
        remove.mockImplementation(() => {
            throw new Error();
        });
        //When
        await UserController.remove(request, response, next);
        //Then
        expect(next).toBeCalledWith(new Error());
    });
});
