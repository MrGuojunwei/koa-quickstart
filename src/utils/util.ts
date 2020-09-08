/*
 * @Description: 
 * @Author: 郭军伟
 * @Date: 2020-09-08 18:48:50
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-08 18:48:57
 */
export function genId(length = 32): string {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
