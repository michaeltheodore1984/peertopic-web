import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

export class ProfileImage extends Model {
    declare id: number;
    declare userId: number;
    declare url: string;
    declare fileKey: string;
    declare filename?: string;
    declare size?: number;
    declare type?: string;
    declare provider: "uploadthing" | "s3" | "spaces";
}

ProfileImage.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    url: { type: DataTypes.STRING, allowNull: false },
    fileKey: { type: DataTypes.STRING, allowNull: false },
    filename: { type: DataTypes.STRING },
    size: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    provider: { type: DataTypes.ENUM('uploadthing', 's3', 'spaces'), defaultValue: 'uploadthing' },
}, {
    indexes: [
        {
            unique: true,
            fields: ['userId', 'url'] // composite unique index
        }
    ],
    sequelize, tableName: 'ProfileImages', timestamps: true
});
