import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ButtonsModule } from './buttons/buttons.module';
import { AppService } from './app.service';
import { Category } from './database/model/Category.entity';
import { Item } from './database/model/item.entity';
import { Label } from './database/model/Label.entity';
dotenv.config();

@Module({
   imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '3000', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }),

  TypeOrmModule.forFeature([Category, Item, Label]),
  ButtonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
