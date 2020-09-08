/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-07 09:21:26
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-08 19:16:36
 */
import koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import jwt from 'koa-jwt';
import koa_session from 'koa-session';

import { logger } from './logger';
import { unprotectedRouter, protectedRouter } from './routes';
import { JWT_SECRET } from './constants';
import sessionConfig from './config/session';

createConnection()
  .then(() => {
    const app = new koa();

    const session_signed_key = ['appletSystem'];
    const session = koa_session(sessionConfig, app);
    app.keys = session_signed_key;
    app.use(session);

    app.use(logger());
    app.use(cors());
    app.use(bodyParser());
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
      }
    });

    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    app.listen(3000);
  })
  .catch((err: string) => {
    console.log('TypeORM connection error:', err);
  });
