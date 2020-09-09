/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-08 18:24:45
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-09 11:32:00
 */
import { Context } from 'koa';
import svgCaptcha from 'svg-captcha';
import { Session } from 'koa-session';

import { genId, createBody } from '../utils/util';
import { UnauthorizedException } from '../exceptions';
import { SUCCESS } from '../constants';

const validity = 5 * 60 * 1000;

class Capture {
  public static async getCapture(ctx: Context): Promise<void> {
    const cap = svgCaptcha.create({
      size: 4, // 验证吗长度
      width: 160,
      height: 60,
      fontSize: 50,
      ignoreChars: '0oO1ilI', // 验证码字符中排除字符
      noise: 2, // 干扰线条的数量
      color: true, // 验证吗的字符是否有颜色， 默认没有
      background: '#eee', // 验证吗图片背景颜色
    });
    let img = cap.data; // 验证码图片
    const text = cap.text.toLowerCase(); // 验证码字符
    const randomKey = genId();
    if (ctx.session) {
      ctx.session[randomKey] = text;
      ctx.status = 200;
      ctx.body = createBody(SUCCESS, {
        capture: img,
        randomKey,
      });
      setTimeout(() => {
        delete (ctx.session as Session)[randomKey];
      }, validity);
    } else {
      throw new UnauthorizedException('服务端错误');
    }
  }

  public static async getSession(ctx: Context): Promise<void> {
    if (ctx.session) {
      ctx.status = 200;
      ctx.body = createBody(SUCCESS, ctx.session);
    }
  }
}

export default Capture;
