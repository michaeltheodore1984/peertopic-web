import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';
import { ProfileImage } from './ProfileImage';
import { Tutor } from '@/lib/models';

export class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare profileImage: ProfileImage;
  declare tutorProfile: Tutor;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, },
  },
  { sequelize, tableName: 'users', timestamps: true }
);
