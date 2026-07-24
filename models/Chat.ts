import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';
import { User } from '@/lib/models';

export class Chat extends Model {
    declare id: number;
    declare senderId: number;
    declare receiverId: number;
    declare lastMessageId: number;
    declare sender: User;
    declare receiver: User;
}

Chat.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        senderId: { type: DataTypes.INTEGER, allowNull: false },
        receiverId: { type: DataTypes.INTEGER, allowNull: false },
        bookingId: { type: DataTypes.INTEGER, allowNull: false },
        lastMessageId: { type: DataTypes.INTEGER },
    },
    {
        sequelize,
        tableName: 'chats',
        timestamps: true,
    }
);