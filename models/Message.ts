import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

export class Message extends Model {
    declare id: number;
    declare chatId: number;
    declare senderId: number;
    declare content: string;
    // declare status: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Message.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        chatId: { type: DataTypes.INTEGER, allowNull: false },
        senderId: { type: DataTypes.INTEGER, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        // status: { type: DataTypes.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'messages',
        timestamps: true,
    }
);
