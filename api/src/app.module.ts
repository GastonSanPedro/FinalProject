import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { PosteosModule } from './posts/post.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchena } from './config/joi.validation';
import { CommentsModule } from './comments/comments.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchena
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot(process.env.MONGODB),
    UsersModule, 
    PosteosModule, SeedModule, CommentsModule, MercadoPagoModule, FriendsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
