import { Injectable ,InternalServerErrorException } from '@nestjs/common';
import { Item } from './database/model/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './database/model/Category.entity';
import { Repository } from 'typeorm';
import { Label } from './database/model/Label.entity';


@Injectable()
export class AppService {

  constructor() {}

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
    @InjectRepository(Item)
    private itemRepo: Repository<Item>
    @InjectRepository(Label)
    private labelRepo: Repository<Label>


  async seedDatabase() {
    try{

      const electronics = await this.categoryRepo.save({ name: 'Electronics' });
      const smartphones = await this.categoryRepo.save({ name: 'Smartphones', parent: electronics });
      const laptops = await this.categoryRepo.save({ name: 'Laptops', parent: electronics });

      const clothes = await this.categoryRepo.save({ name: 'Clothes' });
      const men = await this.categoryRepo.save({ name: 'Men', parent: clothes });
      const women = await this.categoryRepo.save({ name: 'Women', parent: clothes });

      const home = await this.categoryRepo.save({ name: 'Home & Kitchen' });
      const appliances = await this.categoryRepo.save({ name: 'Appliances', parent: home });
      const decor = await this.categoryRepo.save({ name: 'Decor', parent: home });

      const top100 = await this.labelRepo.save({ name: 'Top 100' });
      const seasonal = await this.labelRepo.save({ name: 'Seasonal' });
      const trending = await this.labelRepo.save({ name: 'Trending' });
      const top1000 = await this.labelRepo.save({ name: 'Top 1000' });

      const items = [
        {
          name: {
            en: 'iPhone 14',
            fr: 'iPhone 14',
            ar: 'آيفون 14',
            uk: 'Айфон 14',
          },
          description: 'Latest iPhone',
          images: ['https://example.com/iphone.jpg'],
          price: 999,
          category: smartphones,
          labels: [top100],
        },
        {
          name: {
            en: 'Samsung Galaxy S23',
            fr: 'Samsung Galaxy S23',
            ar: 'سامسونج جالاكسي S23',
            uk: 'Самсунг Галаксі S23',
          },
          description: 'Newest Samsung phone',
          images: ['https://example.com/galaxy.jpg'],
          price: 899,
          category: smartphones,
          labels: [top1000, trending],
        },
        {
          name: {
            en: 'MacBook Pro',
            fr: 'MacBook Pro',
            ar: 'ماك بوك برو',
            uk: 'Макбук Про',
          },
          description: 'Apple laptop',
          images: ['https://example.com/macbook.jpg'],
          price: 1999,
          category: laptops,
          labels: [top100],
        },
        {
          name: {
            en: 'Men T-Shirt',
            fr: 'T-shirt homme',
            ar: 'قميص رجالي',
            uk: 'Чоловіча футболка',
          },
          description: 'Cotton t-shirt',
          images: ['https://example.com/shirt.jpg'],
          price: 19,
          category: men,
          labels: [seasonal],
        },
        {
          name: {
            en: 'Women Jacket',
            fr: 'Veste femme',
            ar: 'سترة نسائية',
            uk: 'Жіноча куртка',
          },
          description: 'Warm and trendy',
          images: ['https://example.com/jacket.jpg'],
          price: 79.99,
          category: women,
          labels: [seasonal, trending],
        },
        {
          name: {
            en: 'Microwave Oven',
            fr: 'Four à micro-ondes',
            ar: 'ميكروويف',
            uk: 'Мікрохвильова піч',
          },
          description: '800W microwave',
          images: ['https://example.com/microwave.jpg'],
          price: 120,
          category: appliances,
          labels: [top1000],
        },
        {
          name: {
            en: 'Wall Art',
            fr: 'Art mural',
            ar: 'فن الجدار',
            uk: 'Стіна мистецтва',
          },
          description: 'Modern decor',
          images: ['https://example.com/art.jpg'],
          price: 45,
          category: decor,
          labels: [],
        },
        {
          name: {
            en: 'Air Conditioner',
            fr: 'Climatiseur',
            ar: 'مكيف الهواء',
            uk: 'Кондиціонер',
          },
          description: 'Split AC with inverter',
          images: ['https://example.com/ac.jpg'],
          price: 499,
          category: appliances,
          labels: [top100, seasonal],
        },
        {
          name: {
            en: 'Gaming Laptop',
            fr: 'Ordinateur portable de jeu',
            ar: 'حاسوب محمول للألعاب',
            uk: 'Ігровий ноутбук',
          },
          description: 'High-end gaming laptop',
          images: ['https://example.com/gaming.jpg'],
          price: 1499,
          category: laptops,
          labels: [trending],
        },
        {
          name: {
            en: 'Coffee Maker',
            fr: 'Cafetière',
            ar: 'ماكينة قهوة',
            uk: 'Кавоварка',
          },
          description: 'Espresso coffee machine',
          images: ['https://example.com/coffee.jpg'],
          price: 89,
          category: appliances,
          labels: [],
        },
      ];

      for (const item of items) {
        await this.itemRepo.save(item);
      }

      console.log('Database seeded');
    }
    catch{
     throw new InternalServerErrorException();
    }  
}

}

