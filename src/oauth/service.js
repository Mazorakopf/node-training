import jwt from 'jsonwebtoken';
import config from 'config';
import * as UserDao from '../user/dao';
import { ForbiddenErrorResponse, UnauthorizedErrorResponse } from '../exception';

export const tokenList = {};

export const authenticate = async (login, password) => {
    const users = await UserDao.findByQuery({
        condition: { login },
        other: {}
    });

    if (!Array.isArray(users) && !users.length) {
        throw new UnauthorizedErrorResponse();
    }

    const user = users[0];
    if (!user || user.password !== password) {
        throw new UnauthorizedErrorResponse();
    }

    return generateTokens(user);
};

export const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new UnauthorizedErrorResponse();
    }

    return jwt.verify(refreshToken, config.get('security.refreshTokenSecret'), async (err, decoded) => {
        if (err || tokenList[decoded.id].refreshToken !== refreshToken) {
            throw new ForbiddenErrorResponse();
        }

        const user = await UserDao.findById(decoded.id);

        return generateTokens(user);
    });
};

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id, username: user.login }, config.get('security.accessTokenSecret'), {
        expiresIn: config.get('security.accessTokenTTL')
    });
    const refreshToken = jwt.sign({ id: user.id, username: user.login }, config.get('security.refreshTokenSecret'), {
        expiresIn: config.get('security.refreshTokenTTL')
    });
    tokenList[user.id] = { accessToken, refreshToken };
    return {
        access_token: accessToken,
        expires_in: config.get('security.accessTokenTTL'),
        token_type: 'Bearer',
        refresh_token: refreshToken
    };
};
