/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-07 09:47:18
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-08 19:16:17
 */
import Router from '@koa/router';

import AuthController from './controllers/auth';
import UserController from './controllers/user';
import Capture from './controllers/capture';

const unprotectedRouter = new Router();

unprotectedRouter.get('/capture', Capture.getCapture);
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);


const protectedRouter = new Router();

protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/users/:id', UserController.deleteUser);

export { unprotectedRouter, protectedRouter };
