import express = require('express');
import http401 from '../errors/401';
import _ from 'lodash';

import NodegenRequest from '../../interfaces/NodegenRequest';

/**
 * Required for if an unauthorised response should be thrown from a domain or controller
 * Read: ../errors/401.ts
 * @returns {Function}
 */
export default () => {
    return (err: any, req: NodegenRequest, res: express.Response, next: express.NextFunction) => {
        if (err instanceof http401) {
            if (_.isObject(err.message)) {
                res.status(403).json(err.message);
            } else {
                res.status(401).send();
            }
        } else {
            next(err);
        }
    };
};
