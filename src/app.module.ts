import { Module } from '@nestjs/common';
import PostsModule from './posts/posts.module';
import { StaffModule } from './staff/staff.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PostsModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Also, every application needs a root module. It is a starting point for Nest when building the application.
