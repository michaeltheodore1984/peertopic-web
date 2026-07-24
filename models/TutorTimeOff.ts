import { sequelize } from "@/lib/db";
import { Model, DataTypes } from "sequelize";

export class TutorTimeOff extends Model {
  declare id: number;
  declare tutorId: number;
  declare date: Date;
}

TutorTimeOff.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY, // only the date, no time
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tutor_time_off",
  }
);
