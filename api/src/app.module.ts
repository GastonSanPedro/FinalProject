import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { PosteosModule } from './posteos/posteos.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      })
    ,UsersModule, PosteosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
