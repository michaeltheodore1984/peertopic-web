// models/Booking.ts
import { sequelize } from "@/lib/db";
import { Tutor } from "@/lib/models";
import { DataTypes, Model } from "sequelize";

export class Booking extends Model {
  declare id: number;
  declare studentId: number;
  declare tutorId: number;
  declare start: Date;
  declare end: Date;
  declare tutor: Tutor;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: "bookings" }
);
