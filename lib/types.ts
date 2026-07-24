export interface MessageType {
    id: number;
    chatId: number;
    senderId: number;
    firstNameOther: string; // the other participant's name
    content: string;
    timestamp: number; // milliseconds since epoch
  }
  