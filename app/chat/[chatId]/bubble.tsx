'use client';

// import { acceptLessonAction } from '@/app/chat/[tutorId]/actions';

export default function MessageBubble({ message, studentId }: any) {
  if (message.type === 'proposal') {
    return (
      <div style={{ background: '#eef', padding: '1rem', borderRadius: '8px' }}>
        <p>{message.text}</p>

        {studentId === message.studentId && (
          <form
            action={async () => {
             /*  await acceptLessonAction({
                tutorId: message.tutorId,
                studentId,
                date: message.proposal.date,
                time: message.proposal.time,
              }); */
            }}
          >
            <button type="submit">Accept</button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', background: '#ddd', borderRadius: '8px' }}>
      {message.text}
    </div>
  );
}
