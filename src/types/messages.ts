export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: MessageStatus;
}

export const createMessageData = (
  content: string, 
  senderId: string, 
  receiverId: string
) => {
  return {
    content,
    sender_id: senderId,
    receiver_id: receiverId,
    status: 'sent',
  };
};