
import { Model, DataTypes, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin } from 'sequelize';
import { sequelize } from '@/lib/db';
import { Topic, TutorTimeOff, User } from '@/lib/models';

export class Tutor extends Model {
  declare id: number;
  declare hourlyRate: number;
  declare active: boolean;
  declare userId: number;
  declare user: User;
  declare topics: Topic[];
  declare bio: string;
  declare timeOff: TutorTimeOff[];
  declare getTopics: BelongsToManyGetAssociationsMixin<Topic>;
  declare setTopics: BelongsToManySetAssociationsMixin<Topic, number>;
}

Tutor.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hourlyRate: { type: DataTypes.INTEGER, defaultValue: 0 },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    bio: { type: DataTypes.TEXT },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  { sequelize, tableName: 'tutors', timestamps: true }
);
