import { configService } from 'src/database/config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

const params = configService.getTypeOrmConfig();

export const AppDataSource = new DataSource(params);