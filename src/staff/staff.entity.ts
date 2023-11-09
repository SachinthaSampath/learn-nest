import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Staff {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, unique: true, length: 45 })
  public name: string;

  @Column({ nullable: false, unique: true, length: 10 })
  public contact: string;
}

export default Staff;

/**
 * Create entity using TypeORM decorators:
 *
 */
