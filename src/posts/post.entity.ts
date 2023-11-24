import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Post {
  //By choosing  PrimaryGeneratedColumn from TypeORM, we create an integer primary column that has a value generated automatically.
  @PrimaryGeneratedColumn()
  public id: number;

  //The  @Column() decorator marks a property as a column.
  //The first approach is not to pass the column type explicitly. When we do it, TypeORM figures out the column using our TypeScript types.
  //The second approach would be to pass the type of column explicitly, for example, by using  @Column('text'). The available column types differ between databases like MySQL and Postgres.
  @Column()
  public title: string;

  @Column()
  public content: string;
}

export default Post;

//The most crucial concept to grasp when using TypeORM is the entity. It is a class that maps to a database table. To create it, we use the  @Entity() decorator.
