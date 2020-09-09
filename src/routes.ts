/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-07 09:47:18
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-09 10:50:39
 */
import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import AuthController from './controllers/auth';
import UserController from './controllers/user';
import Capture from './controllers/capture';

const unprotectedRouter = new Router<DefaultState, Context>();

unprotectedRouter.get('/capture', Capture.getCapture);
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);
unprotectedRouter.get('/session', Capture.getSession);

const protectedRouter = new Router<DefaultState, Context>();

protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/users/:id', UserController.deleteUser);

export { unprotectedRouter, protectedRouter };
