import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

export class Lesson extends Model {
    declare id: number;
    declare topic: string;
    declare duration: number;
    declare status: string;
}

Lesson.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        topic: { type: DataTypes.STRING, allowNull: false },
        duration: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        tableName: 'lessons',
        timestamps: true,
    }
);
