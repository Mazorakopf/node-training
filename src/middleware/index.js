import _ from 'lodash';
import { NotSupportedQueryParamsError, NotSupportedQueryValueError } from '../exception';

const otherQueryParam = ['limit', 'orderBy', 'sort'];

export const buildQuery = (paramAttrMap, allowedParamValue) => {
    return (req, res, next) => {
        const query = { condition: {}, other: {} };
        const failed = [];

        for (const [param, value] of Object.entries(req.query)) {
            if (allowedParamValue !== undefined
                    && allowedParamValue[param] !== undefined
                    && !allowedParamValue[param].includes(value)) {
                return next(new NotSupportedQueryValueError(param, value, allowedParamValue[param]));
            }

            if (otherQueryParam.includes(param)) {
                query.other[param] = value;
                continue;
            }

            const attribute = paramAttrMap[param];
            if (_.isNil(attribute)) {
                failed.push(param);
            } else {
                query.condition[attribute] = value;
            }
        }

        if (!_.isEmpty(failed)) {
            return next(new NotSupportedQueryParamsError(failed));
        }

        req.query = query;
        return next();
    };
};

export const findModel = (service) => {
    return async (req, res, next) => {
        try {
            const model = await service.findById(req.params.id);
            if (model === null) {
                return res.sendStatus(404);
            }
            req.params.model = model;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};
