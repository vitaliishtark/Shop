import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    JoinTable,
  } from 'typeorm';
  import { Label } from 'src/database/model/Label.entity';
  import { Category } from 'src/database/model/Category.entity';
  
  @Entity()
  export class Item {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'jsonb' })
    name: Record<string, string>; // локалізовані назви
  
    @Column()
    description: string;
  
    @Column('text', { array: true })
    images: string[];
  
    @Column('decimal')
    price: number;
  
    @ManyToOne(() => Category, (category) => category.items)
    category: Category;
  
    @ManyToMany(() => Label, (label) => label.items, { cascade: true })
    @JoinTable()
    labels: Label[];
  }
  