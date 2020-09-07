/*
 * @Description: 日志记录中间件生产函数
 * @Author: 郭军伟
 * @Date: 2020-09-07 09:28:03
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-07 09:34:42
 */
import { Context } from 'koa';

export function logger() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const time = process.hrtime();
    await next();
    const ms = process.hrtime(time);
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
  };
}
