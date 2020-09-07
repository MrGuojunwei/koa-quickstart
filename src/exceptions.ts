/*
 * @Description: 
 * @Author: 郭军伟
 * @Date: 2020-09-07 14:30:41
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-07 14:36:10
 */
export class BaseException extends Error {
  status: number;
  message: string;
}

export class NotFoundException extends BaseException {
  status: 404;
  constructor(msg?: string) {
    super();
    this.message = msg || '无此内容';
  }
}

export class UnauthorizedException extends BaseException {
  status = 401;
  constructor(msg?: string) {
    super();
    this.message = msg || '尚未登录';
  }
}

export class ForbiddenException extends BaseException {
  status = 403;
  constructor(msg?: string) {
    super();
    this.message = msg || '权限不足';
  }
}
