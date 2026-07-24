import { sequelize } from '@/lib/db';
import { User } from '@/models/User';
import { Tutor } from '@/models/Tutor';
import { Topic } from '@/models/Topic';
import { Category } from '@/models/Category';
import { Chat } from '@/models/Chat';
import { Message } from '@/models/Message';
import { Lesson } from '@/models/Lesson';
import { ProfileImage } from '@/models/ProfileImage';
import { Booking } from '@/models/Booking';
import { TutorTimeOff } from '@/models/TutorTimeOff';
import Review from '@/models/Review';
import { UserReport } from '@/models/Report';

// User ↔ Tutor
User.hasOne(Tutor, { as: 'tutorProfile', foreignKey: 'userId' });
Tutor.belongsTo(User, { as: 'user', foreignKey: 'userId' });

// Tutor ↔ Topic
Tutor.belongsToMany(Topic, { through: 'TutorTopics', as: 'topics' });
Topic.belongsToMany(Tutor, { through: 'TutorTopics', as: 'tutors' });

// Tutor ↔ Category
Category.hasMany(Topic, { foreignKey: 'categoryId', as: 'topics' });
Topic.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Chat ↔ User relationships (1-to-1 chat structure)
Chat.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
User.hasMany(Chat, { as: 'sentChats', foreignKey: 'senderId' });

Chat.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });
User.hasMany(Chat, { as: 'receivedChats', foreignKey: 'receiverId' });

// Message associations
Message.belongsTo(Chat, { as: 'chat', foreignKey: 'chatId' });
Chat.hasMany(Message, { as: 'messages', foreignKey: 'chatId' });

Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'messages', foreignKey: 'senderId' });

Tutor.hasMany(Lesson, { foreignKey: 'tutorId' });
Lesson.belongsTo(Tutor, { foreignKey: 'tutorId' });

User.hasMany(Lesson, { foreignKey: 'studentId' });
Lesson.belongsTo(User, { as: 'student', foreignKey: 'studentId' });

// Profile image
User.hasOne(ProfileImage, { as: 'profileImage', foreignKey: 'userId' });
ProfileImage.belongsTo(User, { as: 'user', foreignKey: 'userId' });

// Bookings
// User model
User.hasMany(Booking, { foreignKey: 'tutorId', as: 'tutorBookings' });
User.hasMany(Booking, { foreignKey: 'studentId', as: 'studentBookings' });

// Booking model
Booking.belongsTo(User, { foreignKey: 'tutorId', as: 'tutor' });
Booking.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

// Tutor model
Tutor.hasMany(TutorTimeOff, { foreignKey: "tutorId", as: "timeOff" });
TutorTimeOff.belongsTo(Tutor, { foreignKey: "tutorId", as: "tutorTimeOff" });

// Reviews
Review.belongsTo(User, { as: "student", foreignKey: "studentId" });
Review.belongsTo(User, { as: "tutor", foreignKey: "tutorId" });

User.hasMany(Review, { as: "givenReviews", foreignKey: "studentId" });
User.hasMany(Review, { as: "receivedReviews", foreignKey: "tutorId" });

Review.belongsTo(Booking, { foreignKey: "bookingId" });
Booking.hasOne(Review, { foreignKey: "bookingId" });

UserReport.belongsTo(User, { foreignKey: "reporterId", as: "reporter" });
UserReport.belongsTo(User, { foreignKey: "reportedUserId", as: "reportedUser" });

export { sequelize, User, Tutor, Topic, Category, Chat, Message, Lesson, ProfileImage, Booking, TutorTimeOff, Review, UserReport };
