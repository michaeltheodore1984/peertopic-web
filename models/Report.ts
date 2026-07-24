import { sequelize } from "@/lib/db";
import { DataTypes, Model } from "sequelize";

export class UserReport extends Model {
    public id!: string;
    public reporterId!: string;
    public reportedUserId!: string;
    public offense!: string;
    public details!: string | null;
}

UserReport.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        reporterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reportedUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        offense: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        tableName: "Reports",
        timestamps: true,
    }
);

