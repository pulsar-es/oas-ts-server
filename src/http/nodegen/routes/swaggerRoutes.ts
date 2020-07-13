import express, { Router } from 'express';
import expressAuthMiddle from 'express-auth-middle';
import { ValidateSwitchType } from 'express-auth-middle/build/enums/ValidateSwitchType';
import config from '@/config';

export default () => {
    const router = Router({});

    // Middleware for basicauth and xauth
    const credentials = config.swaggerBasicAuth
        ? {
              basicAuthArray: config.swaggerBasicAuth,
          }
        : {
              // This block is a simple fall back for the older typescript server templates.
              // If you are here wondering.. your config object should contain:
              /**
               *  // Swagger file
               *  loadSwaggerUIRoute: ConfigHelper.withDefault('LOAD_SWAGGER_UI_ROUTE', false),
               *  swaggerBasicAuth: [{
               *    basicAuthUname: String(ConfigHelper.withDefault('SWAGGER_BASIC_AUTH_UNAME', 'user')),
               *    basicAuthPword: String(ConfigHelper.withDefault('SWAGGER_BASIC_AUTH_PWORD', 'password')),
               *  }],
               */
              basicAuthUname: 'user',
              basicAuthPword: 'pw',
          };

    router.use(
        expressAuthMiddle({
            methods: [ValidateSwitchType['basic-auth']],
            credentials,
            challenge: 'Protected area',
        })
    );

    router.use('/', express.static('public'));

    return router;
};
