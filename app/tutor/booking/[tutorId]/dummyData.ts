// dummyBookingData.ts
export const tutorBookingData = {
  tutorId: 'tutor1',
  name: 'Alice Johnson',
  profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
  bio: 'Alice has 5 years of experience teaching Math and Physics. She loves helping students understand complex concepts easily.',

  // Existing bookings (so we can block these on the calendar)
  bookedSlots: [
    '2025-11-18T11:00', // someone already booked this
    '2025-11-26T15:00',
  ],

  studentSlots: [
    '2025-11-19T17:00',
  ],

  daysOff: [
    '2025-11-26',
    '2025-11-28'
  ],

  // NEW — every day has these time slots unless it's a day off
  defaultDailyHours: [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ],
};
