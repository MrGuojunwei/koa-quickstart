/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-07 09:40:58
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-09 10:27:25
 */
import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';

import { User } from '../entity/user';
import { JWT_SECRET, SUCCESS } from '../constants';
import { UnauthorizedException } from '../exceptions';
import { createBody } from '../utils/util';

export default class AuthController {
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const user = await userRepository
      .createQueryBuilder()
      .where({ name: ctx.request.body.name })
      .addSelect('User.password')
      .getOne();

    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.status = 200;
      ctx.body = createBody(SUCCESS, { token: jwt.sign({ id: user.id }, JWT_SECRET) });
    } else {
      throw new UnauthorizedException('密码错误');
    }
  }

  public static async register(ctx: Context) {
    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);

    const userRepository = getManager().getRepository(User);
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = createBody(SUCCESS, user);
  }
}
