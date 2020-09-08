/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-08 18:24:45
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-08 19:14:02
 */
import { Context } from 'koa';
import svgCaptcha from 'svg-captcha';
import { Session } from 'koa-session';

import { genId } from '../utils/util';
import { UnauthorizedException } from '../exceptions';

const validity = 5 * 60 * 1000;

class Capture {
  public static async getCapture(ctx: Context) {
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
      ctx.body = {
        capture: img,
        randomKey,
      };
      setTimeout(() => {
        delete (ctx.session as Session)[randomKey];
      }, validity);
      ctx.status = 200;
    } else {
      throw new UnauthorizedException('服务端错误');
    }
  }
}

export default Capture;
