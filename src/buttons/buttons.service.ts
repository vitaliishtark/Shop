import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Item } from '../database/model/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../database/model/Category.entity';
import { Repository } from 'typeorm';
import { Label } from '../database/model/Label.entity';

@Injectable()
export class ButtonsService {

  constructor(
      @InjectRepository(Category)
      private categoryRepo: Repository<Category>,
      @InjectRepository(Item)
      private itemRepo: Repository<Item>,
      @InjectRepository(Label)
      private labelRepo: Repository<Label>,
  
    ) {}


  async findSeasonal(): Promise<{ name: string, price: number, dir:string }[]> {
    try{

      let items =  await this.itemRepo
        .createQueryBuilder('item')
        .leftJoinAndSelect('item.labels', 'label')
        .leftJoinAndSelect('item.category', 'category')
        .where('label.name = :labelName', {labelName: 'Seasonal'})
        .andWhere('item.price < :price', {price: 100})
        .getMany();

      const result = items.map(item => ({
        name: item.name.en,
        price: item.price,
        dir: 'ltr'
      }));
      return result;

    }catch{
       throw new InternalServerErrorException();
    }
       
  }

  async findSimilar(): Promise<{ name: string, price: number, dir:string }[]> {
    try{

      const item = await this.itemRepo.findOne({
        where: { id: 1 },
        relations: ['labels', 'category'],
      });
      if (!item) throw new NotFoundException('Item not found');

      const labelIds = item.labels.map(label => label.id);
      let categoryId = item.category.id;

      const itemsInCategory = await this.itemRepo.count({
        where: {
          category: { id: categoryId },
        },
      });

      if (itemsInCategory < 10 && item.category.parent) {
        categoryId = item.category.parent.id;
      }

      const items = await this.itemRepo
      .createQueryBuilder('item')
      .leftJoin('item.labels', 'label')
      .leftJoin('item.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('label.id IN (:...labelIds)', { labelIds })
      .orderBy('ABS(item.price - :price)', 'ASC') 
      .setParameter('price', item.price)
      .limit(5)
      .getRawMany();

      const result = items.map(item => ({
        name: item.item_name.en,
        price: item.item_price,
        dir: 'ltr'
      }));
      
      return result;

    }catch{
      throw new InternalServerErrorException();
    }
  }

  async RandomLocalizedItems(): Promise<{ name: string, price: number, dir:string }[]>{
    try{

      const items = await this.itemRepo
      .createQueryBuilder('item')
      .orderBy('RANDOM()')
      .limit(5)
      .getRawMany();


      const localizedItems = items.map((item) => {
    
        return {
          name: item.item_name.ar || item.item_name.en,
          price: item.item_price,
          dir: 'rtl'
        };
      });

      return localizedItems;

    }catch{
      throw new InternalServerErrorException();
    }

  }
}

