import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ nullable: false, unique: true, length: 45 })
  public name: string;
  @Column({ nullable: false, unique: true, length: 45 })
  public username: string;
  @Column({ nullable: false, unique: true, length: 100 })
  public email: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  public hash: string;
}
