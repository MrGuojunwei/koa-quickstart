/*
 * @Description: 
 * @Author: 郭军伟
 * @Date: 2020-09-08 18:59:35
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-08 19:01:28
 */
const sessionConfig = {
  key: 'appletsystem:sess',
  maxAge: 1000 * 60 * 60 * 30,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false,
};

export default sessionConfig;
