import { Module } from '@nestjs/common';
import { ButtonsService } from './buttons.service';
import { ButtonsController } from './buttons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/model/Category.entity';
import { Item } from 'src/database/model/item.entity';
import { Label } from 'src/database/model/Label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Item, Label])],
  controllers: [ButtonsController],
  providers: [ButtonsService],
})
export class ButtonsModule {}
