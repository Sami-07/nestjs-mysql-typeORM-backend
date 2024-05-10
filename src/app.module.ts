import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

const dbPassword = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME;

@Module({
  imports: [TypeOrmModule.forRoot({
    type : "mysql",
    host : "localhost", 
    port : 3306,
    username : "root",
    password : dbPassword,
    database : dbName,
    entities : [User], 
    synchronize : true, // This will automatically create tables in the database if they do not exist and also update the schema if it changes.
  }), UsersModule, PostsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
