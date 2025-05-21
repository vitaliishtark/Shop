import { Controller, Get, Render} from '@nestjs/common';
import { ButtonsService } from './buttons.service';

@Controller('buttons')
export class ButtonsController {

  constructor(
    private readonly service: ButtonsService 
  ) {}

  @Get()
  @Render('index')
  getPage() {
    return {};
  }

  @Get('seasonal')
  @Render('index')
  async getSeasonalItems() {
    const items = await this.service.findSeasonal();
    return { items };
  }

  @Get('similar')
  @Render('index')
  async action2() {
    const items = await this.service.findSimilar();
    return { items };
  }

  @Get('random')
  @Render('index')
  async getRandomItems() {
    const items = await this.service.RandomLocalizedItems();
    return { items };
  }
}