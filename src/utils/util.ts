/*
 * @Description:
 * @Author: 郭军伟
 * @Date: 2020-09-08 18:48:50
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-09 10:42:14
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function genId() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

export function createBody(returnCode: string, data: any = null, returnMsg: string = '') {
  return {
    returnCode,
    data,
    returnMsg,
  };
}
