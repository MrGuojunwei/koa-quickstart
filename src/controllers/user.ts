/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-07 09:42:45
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-09 10:33:34
 */
import { Context } from 'koa';
import { getManager } from 'typeorm';

import { User } from '../entity/user';
import { NotFoundException, ForbiddenException } from '../exceptions';
import { createBody } from '../utils/util';
import { SUCCESS } from '../constants';

export default class UserController {
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();
    ctx.status = 200;
    ctx.body = users;
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = createBody(SUCCESS, user);
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUser(ctx: Context) {
    const userId = +ctx.params.id;
    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.update(userId, ctx.request.body);
    const updateUser = await userRepository.findOne(userId);

    if (updateUser) {
      ctx.status = 200;
      ctx.body = createBody(SUCCESS, updateUser);
    } else {
      throw new NotFoundException();
    }
  }

  public static async deleteUser(ctx: Context) {
    const userId = +ctx.params.id;
    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.delete(userId);

    ctx.status = 204;
    ctx.body = createBody(SUCCESS);
  }
}
