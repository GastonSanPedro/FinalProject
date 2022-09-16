import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { PosteosModule } from './posteos/posteos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-FinalProject'),
    UsersModule, 
    PosteosModule, SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
