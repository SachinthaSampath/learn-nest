import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true,
        // url: configService.get(`POSTGRES_URL`),
      }),
    }),
  ],
})

export class DatabaseModule {}

/**
 * An essential thing above is that we use the ConfigModule and ConfigService.
 * The  useFactory method can access the environment variables thanks to providing the  imports and  inject arrays.
 * TypeORM is a popular Object-Relational Mapping (ORM) library for TypeScript and JavaScript. It simplifies database operations by allowing developers to interact with databases using TypeScript classes and decorators. Install TypeORM and the PostgreSQL driver as project dependencies:
 * npm install @nestjs/typeorm typeorm pg
 */
