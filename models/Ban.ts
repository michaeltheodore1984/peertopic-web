import { sequelize } from "@/lib/db";
import { DataTypes, Model, Optional } from "sequelize";

export class Ban extends Model {
    public id!: string;
    public userId!: string;
    public reason!: string | null;
}

Ban.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "Bans",
        sequelize,
        timestamps: true,
    }
);
