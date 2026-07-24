// models/Review.ts
import { sequelize } from "@/lib/db";
import { DataTypes, Model } from "sequelize";

class Review extends Model { }

Review.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },

        // Optional text review
        reviewText: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        // Foreign Keys

        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        tutorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'reviews',
    }
);

export default Review;
