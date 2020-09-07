/*
 * @Description: 
 * @Author: 郭军伟
 * @Date: 2020-09-07 11:18:00
 * @LastEditors: 郭军伟
 * @LastEditTime: 2020-09-07 11:20:17
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;
}
