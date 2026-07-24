import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

export class Topic extends Model {
  declare id: number;
  declare name: string;
}

Topic.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'topics' }
);
