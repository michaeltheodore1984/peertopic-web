import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

export class Category extends Model {
  declare id: number;
  declare name: string;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'categories' }
);
